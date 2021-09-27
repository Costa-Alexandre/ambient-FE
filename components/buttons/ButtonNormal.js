import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ButtonNormal({title, type, handleClick, size}) {

  return (
    <View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => handleClick(title)}
      >
        <Text>{ title }</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#ffffff",
  },
});