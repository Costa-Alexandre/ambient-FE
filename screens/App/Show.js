import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';

import {remote as SpotifyRemote} from 'react-native-spotify-remote';

export default function Show({ route: {params: showId} }) {

  const dummyOnPressHandler = () => {
    SpotifyRemote.playUri("spotify:track:4cY1UR4UCWzXqGm9lMvnQC")
  }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`${showId}`}</Text> 
        <CustomButton icon="play" callback={dummyOnPressHandler} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  text: {
    textAlign: 'center',
    color: 'white',
  }
});