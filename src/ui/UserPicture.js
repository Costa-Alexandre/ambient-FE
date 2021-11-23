import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colorStyles } from 'styles/colorStyles';

export default function UserPicture({uri=null, callback=null, size=20}) {

  const onPress = () => {
    if (callback) {
      callback()
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.solid,
        {width: size, height: size, borderRadius: size*0.45},
        styles.container]}
      activeOpacity={callback!==null ? 0.8 : 1}
      onPress={onPress}
    >
      <Image source={{uri:uri}} style={styles.image}/>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  image: {
    flex:1
  },
  solid: {
    backgroundColor: colorStyles.solid
  }
})