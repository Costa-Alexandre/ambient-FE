import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';

import {remote as SpotifyRemote} from 'react-native-spotify-remote';

export default function Show() {

  const dummyOnPressHandler = () => {
    SpotifyRemote.playUri("spotify:track:4cY1UR4UCWzXqGm9lMvnQC")
  }

  const dummyPlayingSongUri = "https://f4.bcbits.com/img/a1024330960_10.jpg"


    return (
      <View style={styles.container}>
        <CustomButton icon="play" callback={dummyOnPressHandler} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  }
});