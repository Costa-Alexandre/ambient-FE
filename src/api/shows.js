import { serverBaseUrl } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getShows = async () => {
  try {
    const tk = await AsyncStorage.getItem('internalToken');
    const token = await JSON.parse(tk);
    const response = await fetch(`${serverBaseUrl}/api/shows`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const liveShows = await response.json();
    return liveShows;
  } catch (error) {
    console.log(error);
  }
};

export const postShow = async (show) => {
  try {
    console.log('posting show: ', show);
    console.log('creator_id', show.creator_id, typeof show.creator_id);
    console.log('date_created', show.date_created, typeof show.date_created);
    console.log(
      'date_scheduled',
      show.date_scheduled,
      typeof show.date_scheduled,
    );
    console.log('description', typeof show.description);
    console.log('name', typeof show.name);
    const tk = await AsyncStorage.getItem('internalToken');
    const token = await JSON.parse(tk);
    const response = await fetch(`${serverBaseUrl}/api/shows`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(show),
    });
    console.log(response.status);
    if (response.status != 201) throw new Error('Show not created');
    const returnedShow = await response.json();
    console.log('Show created', returnedShow);
    return returnedShow;
  } catch (error) {
    console.log('There was an error creating the show: ', error);
  }
};
