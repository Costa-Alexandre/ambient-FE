const serverBaseUrl = "http://192.168.178.22:3000" // replace this ip adress with your local ip or the deployed servers address


export const userIsSignedUp = async (username) => {
    try {
        const response = await fetch(`${serverBaseUrl}/api/user/${username}`)
        const userData = await response.json()
        return userData !== null
    } catch (error) {
        console.log(error)
    }
}


export const signUpUser = async (spotifyData) => {
    const signUpData = { 
        displayName: spotifyData.display_name,
        username: spotifyData.id,
        email: spotifyData.email,
        avatar: ""
    }

    try {
        const response = await fetch(`${serverBaseUrl}/api/user`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpData)
        })
        const userData = await response.json()
        return userData
    } catch (error) {
        console.log(error)
    }
}


export const signInUser = async (username) => {
    try {
        const response = await fetch(`${serverBaseUrl}/api/user/${username}`)
        const userData = await response.json()
        return userData
    } catch (error) {
        console.log(error)
    }
}