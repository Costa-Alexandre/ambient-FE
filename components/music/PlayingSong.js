import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { colorStyles } from '../../styles/colorStyles';
import { fontStyles } from '../../styles/fontStyles';
import CustomIcon from '../icons/CustomIcons';


export default function PlayingSong({ uri }) {

  const dummyColor = "#404040"
  return (
    <View style={[styles.outerContainer, {backgroundColor: dummyColor}]}>
      <ImageBackground style={styles.image} source={{uri:uri}} imageStyle={{opacity:0.1}}>
        {uri && <Image style={styles.coverImage} source={{uri:uri}} />}
        {uri && <View style={styles.textContainer}>
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