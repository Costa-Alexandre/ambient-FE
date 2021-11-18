import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

export default function ShowInfo({ imageUri}) {

  return(
    <View style={[styles.outerContainer, {backgroundColor: '#404040'}]} >
      <ImageBackground 
        source={{uri:imageUri}} 
        imageStyle={{opacity:0.1}} 
        resizeMode="cover"
        style={styles.image}
      >
        <Text>Hi</Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    flexDirection: "row",
  },
})