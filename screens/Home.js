import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ButtonNormal from '../components/buttons/ButtonNormal';
import ButtonSquare from '../components/buttons/ButtonSquare';
import UserBig from '../components/userProfiles/UserBig';
import { typo } from '../styles/typo';

export default function Home() {
  return (
    <View style={styles.root}>
      <Text style={[styles.text, typo.title]}>Components</Text>
      <View style={styles.container}>
        <View style={styles.column}>
          <ButtonNormal type='transparent' size='wideNormal' name='Navigation'/>
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

    <UserBig isLive={true} callback={()=>{}} uri='https://images.unsplash.com/photo-1631761327155-afb9bb69f91d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'/>
    <UserBig callback={() => {}} />
    
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
    color: '#fff',
    marginBottom: 20,
  },
});