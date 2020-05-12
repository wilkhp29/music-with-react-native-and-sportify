import {NativeModules} from 'react-native';
type Spotfy = {
  Login: (CLIENT_ID: string, REDIRECT_URI: string) => Promise<string>;
  GetToken: () => Promise<any>;
  Play: (URI: string) => void;
  Pause: () => void;
  Next: () => void;
  Preview: () => void;
};

const Spotfy: Spotfy = NativeModules.RNSpotifyRemoto;

export const Login = Spotfy.Login;
export const GetToken = Spotfy.GetToken;
export const Play = Spotfy.Play;
export const Pause = Spotfy.Pause;
export const Next = Spotfy.Next;
export const Preview = Spotfy.Preview;

export default Spotfy;
