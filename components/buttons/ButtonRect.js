import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function ButtonRect(props) {

  const [like, setLike] = useState(false);

  const onPress = (prevCheck) => {
    setLike(!prevCheck);
    
    console.log('ButtonRect pressed. Liked=' + like);
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
  wide: {
    width: 120,
    height: 44,
    borderRadius: 20,
  },
  small: {
    width: 60,
    height: 40,
    borderRadius: 18,
  },
  image: {
    width: 20,
    height: 20,
  }
});