import { serverBaseUrl } from './config';

export const userIsSignedUp = async (username) => {
  console.log(`is signed up: ${username}`);
  try {
    const response = await fetch(`${serverBaseUrl}/api/users/${username}`);
    if (response.status !== 200) throw new Error('User not found');
    console.log(response);
    const userData = await response.json();
    return userData !== null;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signUpUser = async (spotifyData) => {
  console.log(`sign up : ${spotifyData}}`);
  const signUpData = {
    displayName: spotifyData.display_name,
    username: spotifyData.id,
    email: spotifyData.email,
    avatar: spotifyData.images.length > 0 ? spotifyData.images[0].url : null,
  };

  try {
    const response = await fetch(`${serverBaseUrl}/api/users`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signUpData),
    });
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.log(error);
  }
};

export const signInUser = async (username) => {
  console.log(`sign in: ${username}`);
  try {
    const response = await fetch(`${serverBaseUrl}/api/users/${username}`);
    const userData = await response.json();
    if (!userData.avatar) userData.avatar = null;
    return userData;
  } catch (error) {
    console.log(error);
  }
};
