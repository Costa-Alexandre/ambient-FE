import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { typo } from '../../styles/typo';
import { globalStyles } from '../../styles/global';

export default function ButtonNormal(props) {

  const onPress = () => {
    console.log('ButtonNormal onPress.');
  }

  return (
    <View>
      <TouchableOpacity 
        style={[styles.button, globalStyles[props.type], globalStyles[props.size]]}
        onPress={onPress}
      >
        <Text style={typo.button}>{ props.name }</Text>
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