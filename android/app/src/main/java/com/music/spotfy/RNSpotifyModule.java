package com.music.spotfy;

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.google.gson.Gson;
import com.spotify.android.appremote.api.ConnectionParams;
import com.spotify.android.appremote.api.Connector;
import com.spotify.android.appremote.api.SpotifyAppRemote;
import com.spotify.protocol.types.Track;
import com.spotify.sdk.android.authentication.AuthenticationClient;
import com.spotify.sdk.android.authentication.AuthenticationRequest;
import com.spotify.sdk.android.authentication.AuthenticationResponse;

public class RNSpotifyModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext Reactcontext;
    private static String REDIRECT_URI;
    private static String CLIENT_ID;
    private static boolean IsConnecter = false;
    private static String TOKEN;
    private SpotifyAppRemote mSpotifyAppRemote;
    private static final int REQUEST_CODE = 1337;
    private Promise mLoginPromise;
    private static String lastUri = "";

    RNSpotifyModule(final ReactApplicationContext context) {
        super(context);
        Reactcontext = context;
        Reactcontext.addActivityEventListener(mActivityEventListener);
    }

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(final Activity activity, final int requestCode, final int resultCode,
                final Intent data) {
            super.onActivityResult(activity, requestCode, resultCode, data);
            if (requestCode == REQUEST_CODE) {
                final AuthenticationResponse response = AuthenticationClient.getResponse(resultCode, data);

                switch (response.getType()) {
                    // Response was successful and contains auth token
                    case TOKEN:
                        // mLoginPromise.resolve(response.getType().TOKEN);
                        TOKEN = response.getAccessToken();
                        Connect(mLoginPromise);
                        break;

                    // Auth flow returned an error
                    case ERROR:
                        mLoginPromise.reject("error");
                        break;

                    // Most likely auth flow was cancelled
                    default:
                        // Handle other cases
                }
                mLoginPromise = null;
            }
        }
    };

    @ReactMethod
    public void GetToken(final Promise promise) {
        if (TOKEN != null) {
            promise.resolve(TOKEN);
        }
    }

    @ReactMethod
    public void Login(final String CLIENT_ID, final String REDIRECT_URI, final Promise promise) {
        this.CLIENT_ID = CLIENT_ID;
        this.REDIRECT_URI = REDIRECT_URI;
        final AuthenticationRequest.Builder builder = new AuthenticationRequest.Builder(CLIENT_ID,
                AuthenticationResponse.Type.TOKEN, REDIRECT_URI);

        builder.setScopes(new String[] { "streaming" });
        final AuthenticationRequest request = builder.build();
        final Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            promise.reject("Activity doesn't exist");
            return;
        }

        AuthenticationClient.openLoginActivity(Reactcontext.getCurrentActivity(), REQUEST_CODE, request);
        mLoginPromise = promise;
    }

    private void Connect(final Promise promise) {
        final ConnectionParams connectionParams = new ConnectionParams.Builder(CLIENT_ID).setRedirectUri(REDIRECT_URI)
                .showAuthView(true).build();

        SpotifyAppRemote.connect(Reactcontext, connectionParams, new Connector.ConnectionListener() {

            @Override
            public void onConnected(final SpotifyAppRemote spotifyAppRemote) {
                mSpotifyAppRemote = spotifyAppRemote;
                promise.resolve("Connected");

            }

            @Override
            public void onFailure(final Throwable throwable) {
                promise.reject(throwable.getMessage());
            }
        });
    }

    @ReactMethod
    public void Play(final String URI, final Promise promise) {
        if (mSpotifyAppRemote != null) {
            if (URI != lastUri) {
                lastUri = URI;
                mSpotifyAppRemote.getPlayerApi().play(URI);
                mSpotifyAppRemote.getPlayerApi().subscribeToPlayerState().setEventCallback(playerState -> {
                    final Track track = playerState.track;
                    if (track != null) {
                        WritableMap params = Arguments.createMap();
                        Gson gson = new Gson();
                        params.putString("Track", gson.toJson(playerState).toString());
                        sendEvent(Reactcontext, "States", params);
                    }
                });
            } else {
                Resulme();
            }
        } else {
            if (TOKEN == null) {
                promise.reject("ERRO_NOT_AUTH", "sem token");
            }
        }
    }


    @ReactMethod
    public void Pause() {
        mSpotifyAppRemote.getPlayerApi().pause();
    }

    @ReactMethod
    public void Next() {
        mSpotifyAppRemote.getPlayerApi().skipNext();
    }

    @ReactMethod
    public void Preview() {
        mSpotifyAppRemote.getPlayerApi().skipPrevious();
    }

    @ReactMethod
    public void Resulme() {
        mSpotifyAppRemote.getPlayerApi().resume();
    }

    @ReactMethod
    public void Disconnect() {
        SpotifyAppRemote.disconnect(mSpotifyAppRemote);
    }

    @NonNull
    @Override
    public String getName() {
        return "RNSpotifyRemoto";
    }

    private void sendEvent(final ReactContext reactContext, final String eventName,
            @Nullable final WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}
