import axios from 'react-native-axios';


const baseUrl = "http://192.168.178.22:3000" // replace this ip adress with your local ip or the deployed servers address


export const signInUser = (userData) => {
    const key = "test3"
    const data = { token: key, firstName: key, lastName: key, username: key, email: key, avatar: key }

    axios.post(`${baseUrl}/api/user`, data)
    .then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))

}