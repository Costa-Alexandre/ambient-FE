import { ApiScope } from "react-native-spotify-remote";

export const serverBaseUrl = "https://ambient-3wmumkj7ma-ey.a.run.app/";
export const spotifyBaseUrl = "https://api.spotify.com/v1"

export const spotifyConfig = {
	clientID: "e471ac902dc247bd89e4f85b38661ca7",
	redirectURL: "modradio://auth",
	tokenRefreshURL: `${serverBaseUrl}/refresh`,
	tokenSwapURL: `${serverBaseUrl}/swap`,
	// authType: "CODE",
	scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserFollowReadScope,
    ApiScope.UserReadEmailScope
  ]
}