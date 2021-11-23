import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { colorStyles } from '../../../styles/colorStyles'
import { fontStyles } from '../../../styles/fontStyles'
import CustomIcon from '../../../ui/CustomIcons';
import UserPicture from '../../../ui/UserPicture';

export function ChatHeader({ open, callback }) {

  const [ isOpen, setIsOpen ] = useState(open)
  
  return (
    <View style={styles.headerContainer}>
      <Text style={composeHeader}>Chat</Text>
        <TouchableOpacity 
          style={isOpen ? styles.arrowDown : styles.arrowUp} 
          onPress={() => {
            setIsOpen(!isOpen)
            callback(!isOpen);
          }}
        >
          <CustomIcon name='arrow_left' size={20} color={colorStyles.text} />
        </TouchableOpacity>
    </View>
  );
}


export function ChatInput() {
  const [text, onChangeText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => onChangeText(text)}
        value={text}
        style={composeInput}
        placeholder="Comment..."
        placeholderTextColor='#ffffff50'
        inlineImageLeft='emoji16'
        inlineImagePadding={40}
      />
    </View>
  );
}

export function ChatComment({ imageUri, username, payload}) {

  return (

      <View style={styles.message}>
        <UserPicture size={20} uri={imageUri} />
        <Text style={composeUsername}>
          {username}: {" "}
          <Text style={styles.payload}>{payload}</Text>
        </Text>
      </View>
  );
}



const styles = StyleSheet.create({
  container: {
    height: 88,
    width: '100%',
    padding: 20,
    backgroundColor: '#000',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#1B1B1F',
    borderRadius: 46,
    color: '#ffffff50',
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#000',
    color: '#fff',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    paddingHorizontal: 22,
    paddingVertical: 20
  },
  arrowUp: {
    transform: [{ rotate: '90deg' }],
  },
  arrowDown: {
    transform: [{ rotate: '-90deg' }],
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    paddingLeft: 20,
    paddingTop: 16,
  },
  username: {
    color: colorStyles.textSecondary,
    marginLeft: 8
  },
  payload: {
    color: colorStyles.text
  }
});

const composeInput = StyleSheet.compose(styles.input, fontStyles.body)
const composeHeader = StyleSheet.compose(styles.header, fontStyles.section)
const composeUsername = StyleSheet.compose(styles.username, fontStyles.body)
