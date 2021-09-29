import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { colorStyles } from '../../styles/colorStyles';
import { fontStyles } from '../../styles/fontStyles';
import CustomIcon from '../icons/CustomIcons';


export default function PlayingSong({  }) {

  const dummyUri = "https://f4.bcbits.com/img/a1024330960_10.jpg"
  return (
    <View style={styles.outerContainer}>
      <ImageBackground style={styles.image} source={{uri:dummyUri}} imageStyle={{opacity:0.1}}>
        {dummyUri && <Image style={styles.coverImage} source={{uri:dummyUri}} />}
        {dummyUri && <View style={styles.textContainer}>
          <Text style={[fontStyles.subtitleSecondary, styles.songText]} numberOfLines={1}>Meat Grinder</Text>
          <Text style={[fontStyles.subtitleSecondary, styles.artistText]} numberOfLines={1}>Madvillain, Madlib, MF DOOM</Text>
        </View>}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 8,
    height: 64,
    overflow: 'hidden',
    backgroundColor: colorStyles.button_solid
  },
  coverImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  songText: {
    color: colorStyles.text,
    marginBottom: 8,
  },
  artistText: {
    color: colorStyles.text_secondary,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    flexDirection: "row",
  },
});