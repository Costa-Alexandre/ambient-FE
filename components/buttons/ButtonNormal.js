import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ButtonNormal(props) {

  const onPress = () => {
    console.log('ButtonNormal onPress.');
  }

  return (
    <View>
      <TouchableOpacity 
        style={[styles.button, styles[props.type], styles[props.size]]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{ props.name }</Text>
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
  Accent: {
    backgroundColor: "#37BB64",
  },
  Solid: {
    backgroundColor: "#404040",
  },
  Transparent: {
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  wide: {
    width: 120,
    height: 44,
    borderRadius: 22,
  },
  slim: {
    width: 90,
    height: 44,
    borderRadius: 22,
  },
  small: {
    width: 90,
    height: 40,
    borderRadius: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    color: '#fff',
  }
});