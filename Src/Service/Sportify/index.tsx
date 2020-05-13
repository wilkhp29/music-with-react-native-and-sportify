import {NativeModules, NativeEventEmitter} from 'react-native';
import axios from 'axios';

type response = {
  total: number;
  limit: number;
  offset: number;
  next: string;
  previous: string;
  items: Array<categorie | playlist | track>;
};

export type playlist = {
  collaborative: boolean;
  description: string;
  href: string;
  id: string;
  name: string;
  tracks: trackLink;
  type: string;
  uri: string;
  images: Array<img>;
};

export type trackLink = {
  href: string;
  total: number;
};
export type track = {
  album: album;
  artists: Array<artist>;
  dis_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  href: string;
  id: string;
  is_local: boolean;
  is_playble: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track: true;
  tranck_number: number;
  type: string;
  uri: string;
};

type album = {
  album_type: string;
  artists: Array<artist>;
  href: string;
  id: string;
  images: Array<img>;
  name: string;
  release_date: string;
  release_date_precision: string;
  type: string;
  uri: string;
};

type artist = {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type categorie = {
  href: string;
  icons: Array<img>;
  id: string;
  name: string;
};

type img = {
  url: string;
};

export type state = {
  is_paused: boolean;
  playback_options: {shuffle: true; repeat: 0};
  playback_position: number;
  playback_restrictions: playbackRestriction;
  playback_speed: number;
  track: track;
  album: album;
  artist: artist;
  artists: Array<artist>;
  duration_ms: number;
  is_episode: boolean;
  is_podcast: boolean;
  name: string;
  uri: string;
};

type playbackRestriction = {
  can_repeat_context: boolean;
  can_repeat_track: boolean;
  can_seek: boolean;
  can_skip_next: boolean;
  can_skip_prev: boolean;
};

type Spotify = {
  Login: (CLIENT_ID: string, REDIRECT_URI: string) => Promise<string>;
  GetToken: () => Promise<any>;
  Play: (URI: string) => void;
  Resume: () => void;
  Pause: () => void;
  Next: () => void;
  Preview: () => void;
  GetCategorie: (next: string) => Promise<response>;
  GetPlayList: (next: string) => Promise<response>;
  Listernes: NativeEventEmitter;
};

const Spotify: Spotify = NativeModules.RNSpotifyRemoto;

export const Login = Spotify.Login;
export const GetToken = Spotify.GetToken;
export const Play = Spotify.Play;
export const Resume = Spotify.Resume;
export const Pause = Spotify.Pause;
export const Next = Spotify.Next;
export const Preview = Spotify.Preview;
export const GetCategorie = async (
  next: string | null = null,
): Promise<response> => {
  const token = await GetToken();
  const {
    data: {categories},
  } = await axios.get(
    next || 'https://api.spotify.com/v1/browse/categories?country=BR',
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );

  return categories;
};

export const GetPlayList = async (id: string): Promise<response> => {
  const token = await GetToken();
  const {
    data: {playlists},
  } = await axios.get(
    `https://api.spotify.com/v1/browse/categories/${id}/playlists?country=BR`,
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );

  return playlists;
};

export const GetTracks = async (id: string): Promise<response> => {
  const token = await GetToken();
  const {data} = await axios.get(
    `https://api.spotify.com/v1/playlists/${id}/tracks?market=BR`,
    {
      headers: {Authorization: `Bearer ${token}`},
    },
  );

  return data;
};
//
export const Listernes = new NativeEventEmitter(NativeModules.RNSpotifyRemoto);

Spotify.GetCategorie = GetCategorie;
Spotify.Listernes = Listernes;

export default Spotify;
