import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function ButtonSquare(props) {

  const [like, setLike] = useState(false);

  const onPress = (prevCheck) => {
    setLike(!prevCheck);
    
    console.log('ButtonSquare pressed. Liked=' + like);
  }
  

  return (
    <View>
      <TouchableOpacity 
        style={[styles.button, styles[props.type], styles[props.size]]}
        onPress={() => onPress(like)}
      >
        <Image source={require('./icons/liked-false-icon.png')} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  accent: {
    backgroundColor: "#37BB64",
  },
  solid: {
    backgroundColor: "#404040",
  },
  transparent: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  warning: {
    backgroundColor: "#F32248",
  },
  big: {
    width: 50,
    height: 50,
    borderRadius: 23,
  },
  medium: {
    width: 44,
    height: 44,
    borderRadius: 20,
  },
  small: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  image: {
    width: 24,
    height: 24,
  }
});