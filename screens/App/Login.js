import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import CustomButton from '../../components/buttons/CustomButton';

export default function Login({ navigation }) {

  const onPress = (screen) => (e) => {
    navigation.navigate(screen);
    console.log(screen);
  };

    return (
      <View style={styles.container}>
        <Text style={{color: 'white'}}>The Real App</Text>
        <CustomButton 
          title='Continue with Spotify'
          color='accent' 
          size='loginButton' 
          callback={onPress('Home')}
        />
        <CustomButton 
          title='Sign up without Spotify'
          color='buttonSolid' 
          size='loginButton' 
          // callback={onPress('')}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});