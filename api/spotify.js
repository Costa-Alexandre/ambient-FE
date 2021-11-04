import { 
	auth as SpotifyAuth, 
	remote as SpotifyRemote
} from 'react-native-spotify-remote';


const spotifyBaseUrl = "https://api.spotify.com/v1"


const spotifyRequestOptions = (token, method="GET") => {
    return {
        method: method,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }
}


export const spotifyGetMe = async (token=null) => {
    try {
        if (!token) {
            const session = await SpotifyAuth.getSession()
            token = session.accessToken
        }
        
        const response = await fetch(`${spotifyBaseUrl}/me`, spotifyRequestOptions(token))
        const spotifyData = await response.json()
        return spotifyData
    } catch (error) {
        console.log(error)
    }
}