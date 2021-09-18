import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { typo } from '../../styles/typo';
import { globalStyles } from '../../styles/global';

export default function ButtonNormal({title, type, handleClick, size}) {

  // const onPress = () => {
  //   console.log(props);
  // }

  return (
    <View>
      <TouchableOpacity 
        style={[styles.button, globalStyles[type], globalStyles[size]]}
        onPress={() => handleClick(title)}
      >
        <Text style={typo.button}>{ title }</Text>
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
});