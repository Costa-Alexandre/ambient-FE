import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { globalStyles } from '../../styles/global';

export default function ButtonRect(props) {

  const [like, setLike] = useState(false);

  const onPress = (prevCheck) => {
    setLike(!prevCheck);
    
    console.log('ButtonRect pressed. Liked=' + like);
  }
  

  return (
    <View>
      <TouchableOpacity 
        style={[styles.button, globalStyles[props.type], globalStyles[props.size]]}
        onPress={() => onPress(like)}
      >
        <Image source={require('../../assets/icons/liked-false-icon.png')} style={styles.image} />
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
  image: {
    width: 20,
    height: 20,
  }
});