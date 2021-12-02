import {
  auth as SpotifyAuth,
  remote as SpotifyRemote,
} from "react-native-spotify-remote";

import { spotifyBaseUrl } from "./config";

const spotifyRequestOptions = (token, method = "GET") => {
  return {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
};

export const spotifyGetMe = async (token = null) => {
  try {
    if (!token) {
      const session = await SpotifyAuth.getSession();
      token = session.accessToken;
    }

    const response = await fetch(
      `${spotifyBaseUrl}/me`,
      spotifyRequestOptions(token)
    );
    const spotifyData = await response.json();
    return spotifyData;
  } catch (error) {
    console.log(error);
  }
};

export const spotifyGetTrack = async (trackId, token = null) => {
  try {
    if (!token) {
      const session = await SpotifyAuth.getSession();
      token = session.accessToken;
    }

    const response = await fetch(
      `${spotifyBaseUrl}/tracks/${trackId}`,
      spotifyRequestOptions(token)
    );
    const trackData = await response.json();
    return trackData;
  } catch (error) {
    console.log(error);
  }
};