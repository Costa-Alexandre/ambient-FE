import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ButtonNormal from '../components/buttons/ButtonNormal';
import ButtonSquare from '../components/buttons/ButtonSquare';

export default function Home() {
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Components</Text>
      <View style={styles.container}>
        <View style={styles.column}>
          <ButtonNormal type='transparent' size='wideNormal' name='Navigation' />
          <ButtonNormal type='accent' size='wideNormal' name='Buttons'/>
          <ButtonNormal type='solid' size='wideNormal' name='Fonts'/>
          <ButtonNormal type='transparent' size='wideNormal' name='Inputs'/>
        </View>
        <View style={styles.column}>
          <ButtonNormal type='accent' size='wideNormal' name='User'/>
          <ButtonNormal type='solid' size='wideNormal' name='Shows'/>
          <ButtonNormal type='transparent' size='wideNormal' name='Music'/>
          <ButtonNormal type='accent' size='wideNormal' name='Chat'/>
        </View>
    </View>
    <ButtonSquare type='warning' size='bigSquare' />
    
  </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    
  },
  container: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});