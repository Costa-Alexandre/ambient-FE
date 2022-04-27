import { ApiScope } from 'react-native-spotify-remote';

export const serverBaseUrl = 'https://ambient-dev-a3pdwrdjqq-ey.a.run.app';
export const spotifyBaseUrl = 'https://api.spotify.com/v1';

export const spotifyConfig = {
  clientID: '70c2451af7fa448a80fac8356172e8e1',
  redirectURL: 'com.ambient:/auth',
  tokenRefreshURL: `${serverBaseUrl}/refresh`,
  tokenSwapURL: `${serverBaseUrl}/swap`,
  // authType: "CODE",
  showDialog: false,
  scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserFollowReadScope,
    ApiScope.UserReadEmailScope,
    ApiScope.StreamingScope,
    ApiScope.UserModifyPlaybackStateScope,
    ApiScope.UserReadPlaybackStateScope,
    ApiScope.UserReadPlaybackPosition,
  ],
};
