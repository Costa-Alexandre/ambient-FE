import { serverBaseUrl } from './config';

export const userIsSignedUp = async (username) => {
  console.log(`Checking if ${username} exists in our database`);
  try {
    const response = await fetch(`${serverBaseUrl}/api/users/${username}`);
    if (response.status !== 200) throw new Error('User not found');
    const userData = await response.json();
    console.log('User Found!');
    return userData !== null;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const signUpUser = async (spotifyData) => {
  console.log(`
  Signing up new user:
  ...............................................
  Username: ${spotifyData.id}
  Display Name: ${spotifyData.display_name}
  Email: ${spotifyData.email}
  Avatar: ${spotifyData.images[0].url}
  `);
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
  console.log(`Signing in: ${username}`);
  try {
    const response = await fetch(`${serverBaseUrl}/api/users/${username}`);
    if (response.status !== 200) throw new Error('User not found');
    const userData = await response.json();
    if (!userData.avatar) userData.avatar = null;
    console.log(
      `User signed in! ${userData.username} as ${userData.displayName}`,
    );
    return userData;
  } catch (error) {
    console.log(error);
    return false;
  }
};
