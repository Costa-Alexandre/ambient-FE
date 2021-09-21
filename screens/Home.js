import React from 'react';
import { StyleSheet, View, Text, FlatList, Button } from 'react-native';
import ButtonNormal from '../components/buttons/ButtonNormal';
import ButtonSquare from '../components/buttons/ButtonSquare';
import UserBig from '../components/userProfiles/UserBig';
import UserPicture from '../components/userProfiles/UserPicture';
import UserStage from '../components/userProfiles/UserStage';
import { typo } from '../styles/typo';

export default function Home( { navigation } ) {

const handleClick = (screen) => {
  navigation.navigate(screen);
  console.log(screen);
};

const menu = [
  {title: 'Navigation', key: '1'},
  {title: 'Buttons', key: '2'},
  {title: 'Fonts', key: '3'},
  {title: 'Inputs', key: '4'},
  {title: 'User', key: '5'},
  {title: 'Shows', key: '6'},
  {title: 'Music', key: '7'},
  {title: 'Chat', key: '8'}
]


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList 
          data={menu}
          numColumns={2}
          renderItem={({item}) => (
            <View style={styles.item}>
              <ButtonNormal type='accent' size='wideNormal' title={item.title} handleClick={handleClick} />
            </View>
          )}
        />
      </View>
      <UserStage isMuted={true} uri="https://images.unsplash.com/photo-1632174742550-aed8bd3d7a71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"/>
      <UserStage isMuted={false} isTalking={true} username="Username"/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
    flex: 1,
    
  },
  content: {

  },
  text: {
    color: '#fff',
    marginBottom: 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  }
});