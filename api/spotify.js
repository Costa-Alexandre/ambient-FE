import { 
	auth as SpotifyAuth, 
	remote as SpotifyRemote
} from 'react-native-spotify-remote';

import axios from 'react-native-axios';


const optionsGET = (token, endpoint) => {
    return {
        method: 'GET',
        url: `https://api.spotify.com/v1/${endpoint}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }
}


export const spotifyGetMe = async () => {
    return SpotifyAuth.getSession()
    .then(session => session.accessToken)
    .then(token => axios( optionsGET(token, "me") ))
    .then(userData => userData.data)
    .catch(error => {throw error})
}