import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import CustomButton from '../components/buttons/CustomButton';

export default function Home( { navigation } ) {

const onPress = (screen) => (e) => {
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
  {title: 'Shows', key: '10'},
]


  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList 
          data={menu}
          numColumns={2}
          renderItem={({item}) => (
            <View style={styles.item}>
              <CustomButton 
                title={item.title} 
                color='accent' 
                size='normalMediumWide' 
                callback={onPress(item.title)} />
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