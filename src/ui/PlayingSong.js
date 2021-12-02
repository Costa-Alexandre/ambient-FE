import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { colorStyles, fontStyles } from 'styles';



export default function PlayingSong({ imageUri=dummyBGImage, callback=null }) {

  const dummyColor = "#404040"
  return (
    <TouchableOpacity 
      style={[styles.outerContainer, {backgroundColor: dummyColor}]}
      onPress={callback}
    >
      <ImageBackground 
        style={styles.image} 
        source={{uri: imageUri}} 
        imageStyle={{opacity:0.1}}
      >
        {imageUri && <Image style={styles.coverImage} source={{uri: imageUri}} />}
        {imageUri && <View style={styles.textContainer}>
          <Text style={[fontStyles.subtitleSecondary, styles.songText]} numberOfLines={1}>Meat Grinder</Text>
          <Text style={[fontStyles.subtitleSecondary, styles.artistText]} numberOfLines={1}>Madvillain, Madlib, MF DOOM</Text>
        </View>}
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    borderRadius: 8,
    height: 64,
    overflow: 'hidden',
    backgroundColor: colorStyles.buttonSolid
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
    color: colorStyles.textSecondary,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    flexDirection: "row",
  },
});



const dummyBGImage = "https://f4.bcbits.com/img/a1024330960_10.jpg";