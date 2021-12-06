import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { colorStyles } from 'styles';

export default function UserPicture({uri=null, name="-", callback=null, size=20}) {

  const onPress = () => {
    if (callback) {
      callback()
    }
  }

  return (
    <TouchableOpacity
      style={[
        {width: size, height: size, borderRadius: size*0.45},
        styles.container]}
      activeOpacity={callback!==null ? 0.8 : 1}
      onPress={onPress}
    >
      {uri ? 
        <Image source={{uri:uri}} style={styles.image}/>
        : <Text style={{fontSize: size*0.45, color: 'white', fontWeight: "700"}}>{name[0]}</Text>}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: colorStyles.buttonSolid,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex:1
  },
})