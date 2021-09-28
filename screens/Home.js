import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CustomButton from '../components/buttons/CustomButton';

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
  {title: 'Chat', key: '8'},
  {title: 'Icons', key: '9'},
]


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList 
          data={menu}
          numColumns={2}
          renderItem={({item}) => (
            <View style={styles.item}>
              <CustomButton color='accent' size='normalMediumWide' title={item.title} handleClick={handleClick} />
            </View>
          )}
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
    flex: 1,
    
  },
  text: {
    color: '#fff',
    marginBottom: 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  }
});