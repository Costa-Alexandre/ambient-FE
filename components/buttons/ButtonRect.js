import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import CustomIcon from '../icons/CustomIcons';

export default function ButtonRect(props) {

  const [like, setLike] = useState(false);

  const onPress = (prevCheck) => {
    setLike(!prevCheck);
    
    console.log('ButtonRect pressed. Liked=' + like);
  }
  

  return (
    <View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => onPress(like)}
      >
        <CustomIcon name={props.name} size={32} color='#fff' />
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
  image: {
    width: 20,
    height: 20,
  }
});