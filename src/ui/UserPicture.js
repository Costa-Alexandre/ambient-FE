import React, { useEffect, useState } from 'react';
import stc from 'string-to-color';
import { StyleSheet, TouchableOpacity, Image, Text, View, ImageBackground } from 'react-native';
import { colorStyles } from 'styles';

export default function UserPicture({uri=null, name="-", callback=null, size=20}) {

  const [color, setColor] = useState(colorStyles.buttonSolid)

  const onPress = () => {
    if (callback) {
      callback()
    }
  }

  useEffect(() => {
    setColor(stc(name))
  }, [])

  return (
    <TouchableOpacity
      style={[
        {width: size, height: size, borderRadius: size*0.45, backgroundColor: color},
        styles.container]}
      activeOpacity={callback!==null ? 0.8 : 1}
      onPress={onPress}
    >
      <ImageBackground source={{uri: uri}} resizeMode="cover" style={styles.image}>
        {!uri && <Text style={{fontSize: size*0.45, color: 'white', fontWeight: "700"}}>{name[0]}</Text>}
      </ImageBackground>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
})