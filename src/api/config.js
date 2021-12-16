import { ApiScope } from "react-native-spotify-remote";

export const serverBaseUrl = "https://ambient-code-3wmumkj7ma-ey.a.run.app";
export const spotifyBaseUrl = "https://api.spotify.com/v1"

export const spotifyConfig = {
	clientID: "e471ac902dc247bd89e4f85b38661ca7",
	redirectURL: "com.ambient:/auth",
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
	ApiScope.UserReadPlaybackPosition
  ]
}