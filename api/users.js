import axios from 'react-native-axios';


export const signInUser = (userData) => {
    const data = { token: "test", firstName: userData.display_name, lastName: userData.id, email: userData.email, avatar: "" }
    console.log(data)
    const header = {
        method: 'POST',
        url: 'http://127.0.0.1:3000/api/user',
        data: JSON.stringify(data),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }
    axios(header)
    .then(result => {
        console.log(result)
    })
    .catch(error => console.log(error))

    // fetch("http://127.0.0.1:3000/api/user",
    // {
    //     headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //     },
    //     method: "POST",
    //     body: JSON.stringify(data)
    // })
    // .then(function(res){ console.log(res) })
    // .catch(function(res){ console.log(res) })
}