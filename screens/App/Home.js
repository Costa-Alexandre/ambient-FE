import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Menu from '../../components/menu/Menu';
import LiveShow from '../../components/shows/LiveShow';
import Stories from '../../components/shows/Stories';

import { 
	remote as SpotifyRemote, 
} from 'react-native-spotify-remote';

export default function Home() {

    return (
      <ScrollView>
        <View style={styles.container}>
          <Menu callback={() => {SpotifyRemote.playUri("spotify:track:6IA8E2Q5ttcpbuahIejO74")}}/>
          <View style={styles.stories}>
            <Stories />
          </View>
          <View style={styles.liveShow}>
            <View style={styles.liveShowItem}>
              <LiveShow
              showTitle="SHOW NAME"
              showName="Show Name"
              showDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. fejspo eos jo o oeo "
              amountSpeakers="5"
              amountListeners="50"
              imageUri="https://f4.bcbits.com/img/a1024330960_10.jpg"
              />
            </View>
            <View style={styles.liveShowItem}>
              <LiveShow
              showTitle="SHOW NAME"
              showName="Show Name"
              showDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. fejspo eos jo o oeo "
              amountSpeakers="5"
              amountListeners="50"
              imageUri="https://f4.bcbits.com/img/a1024330960_10.jpg"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'flex-start',
  },
  stories: {
    marginVertical: 16,
  },
  liveShow: {
    margin: 16,
  },
  liveShowItem: {
    marginBottom: 16,
  },
});