import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { colorStyles } from '../../../styles/colorStyles';
import { fontStyles } from '../../../styles/fontStyles';
import ShowName from '../../../ui/ShowName';
import PlayingSong from '../../../ui/PlayingSong';
import MenuShow from './MenuShow';
import LiveUsers from './LiveUsers';

const dummyBGImage = { uri: 'https://f4.bcbits.com/img/a1024330960_10.jpg' }

export default function ShowInfo({
  showId = "",
  showTitle = "",
  showName = "",
  imageUri = null,
}) {


  return (

    <View style={[styles.outerContainer, { backgroundColor: '#404040' }]}>
      
      <ImageBackground
        source={dummyBGImage}
        imageStyle={{ opacity: 0.1 }}
        style={styles.image}
      >
        <View style={styles.container}>

          <MenuShow />

            <View style={styles.titleContainer}>
              <ShowName name={showTitle} />
              <Text style={[fontStyles.title, styles.showName]} numberOfLines={2}>{showName}</Text>
            </View>

            <View style={styles.songContainer}>
              <PlayingSong
                uri={imageUri}
              />
            </View>

            <View style={styles.usersContainer}>
              <LiveUsers />
            </View>
        
        </View>

      </ImageBackground>
    </View>


  );
}


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: 'column',
    marginHorizontal: 20,
  },
  songContainer: {
    marginBottom: 16,
    marginHorizontal: 20,
  },
  usersContainer: {
    flexDirection: 'column',
  },
  showName: {
    color: colorStyles.text,
    marginTop: 8,
    marginBottom: 16
  },
  image: {
    flex: 1,
  },
});