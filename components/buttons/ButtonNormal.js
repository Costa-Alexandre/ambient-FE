import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ButtonNormal(props) {
  
  const type = 'button' + props.type;

  const onPress = () => {
    console.log('ButtonNormal onPress.');
  }
  
  


  return (
    <View>
      <TouchableOpacity 
        style={styles[type]}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{ props.name }</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonAccent: {
    alignItems: "center",
    backgroundColor: "#37BB64",
    padding: 10,
    borderRadius: 22,
    margin: 10,
  },
  buttonSolid: {
    alignItems: "center",
    backgroundColor: "#404040",
    padding: 10,
    borderRadius: 22,
    margin: 10,
  },
  buttonTransparent: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 10,
    borderRadius: 22,
    margin: 10,
  },
  buttonText: {
    fontWeight: "bold",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    color: '#fff'
  }
});