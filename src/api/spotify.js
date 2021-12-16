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
    
    const { id, name, uri, artists, album: { images } } = await response.json();

    const track = {
      id, name, uri, artist: artists[0].name, artists: artists.map(a => a.name).join(', '), imageUri: {uri: images[0].url}
    }
    return track;
  } catch (error) {
    console.log(error);
  }
};

export const spotifyGetDeviceId = async () => {
  return SpotifyAuth.getSession()
  .then(session => session.accessToken)
  .then(token => fetch( `${spotifyBaseUrl}/me/player/devices`, spotifyRequestOptions(token) ))
  .then(data => data.json())
  .then(devices => devices.devices)
  .catch(error => {console.log(error)})
}

export const spotifyGetActiveDevice = async () => {
  return spotifyGetDeviceId()
  .then(devices => {
      let device = devices.filter(device => device.is_active)
      if (device.length === 1) {return device[0]}
      device = devices.filter(device => device.type === "Smartphone")
      if (device.length > 0) {return device[0]}
      return null
  .catch(error => {console.log(error)})
  })
}

export const spotifyPlayTrack = async (trackUri, position=0) => {
  try {
    const session = await SpotifyAuth.getSession();
    token = session.accessToken;

    let device = await spotifyGetActiveDevice()
    let device_id = device ? `?device_id=${device.id}` : ""
    console.log("d", device)

    await fetch(
      `${spotifyBaseUrl}/me/player/play` + device_id,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: [trackUri],
          position_ms: position
        })
      }
    );

  } catch (error) {
    console.log(error);
  }
};