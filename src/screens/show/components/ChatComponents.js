import React, { useRef, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { colorStyles, fontStyles } from "styles";
import { CustomIcon, UserPicture } from "ui";
import { MainContext } from "store/MainProvider";

export function ChatHeader({ isOpen, callback }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={[composeHeader, styles.chatHeaderText]}>Chat</Text>
      <TouchableOpacity
        style={[isOpen ? styles.arrowDown : styles.arrowUp, styles.arrowBtn]}
        onPress={() => {
          callback(!isOpen);
        }}
      >
        <CustomIcon name="arrow_left" size={20} color={colorStyles.text} />
      </TouchableOpacity>
    </View>
  );
}

export function ChatInput() {
  const { sendChatMessage } = useContext(MainContext)
  const [text, setText] = useState("");
  const textInputRef = useRef();

  const submitMessage = () => {
    if(text){
      sendChatMessage(text)
      setText("")
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={textInputRef}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={() => {
          submitMessage();
          }}
        value={text}
        style={composeInput}
        placeholder="Comment..."
        placeholderTextColor={colorStyles.textSecondary}
        inlineImageLeft="emoji16"
        inlineImagePadding={40}
      />
    </View>
  );
}

export function ChatComment({ imageUri, username, payload }) {
  return (
    <View style={styles.message}>
      <UserPicture size={20} uri={imageUri} name={username} />
      <Text style={composeUsername}>
        {username}: <Text style={styles.payload}>{payload}</Text>
      </Text>
    </View>
  );
}

export function ChatWelcome({ showName, username }) {
  return (
    <View style={styles.message}>
        <Text style={[styles.welcome, composeUsername]}>
        {`Welcome to ${showName}, ${username}!`}
        </Text>
    </View>
  );
}

export function ChatFooter( ) {
  return (
    <View style={styles.footer}>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 88,
    width: "100%",
    padding: 20,
    backgroundColor: "#000",
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "#1B1B1F",
    borderRadius: 46,
    color: colorStyles.text,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#000",
    color: "#fff",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: "#000",
    height: 60,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  chatHeaderText: {
    marginLeft: 20
  },
  arrowBtn: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowUp: {
    transform: [{ rotate: "90deg" }],
  },
  arrowDown: {
    transform: [{ rotate: "-90deg" }],
  },
  message: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-start",
    paddingLeft: 20,
    paddingTop: 16,
  },
  username: {
    color: colorStyles.textSecondary,
    marginLeft: 8,
  },
  payload: {
    color: colorStyles.text,
  },
  welcome: {
    flex: 1,
    textAlign: 'center',
    marginRight: 20
  },
  footer: {
    height: 180,
    flex: 1
  }
});

const composeInput = StyleSheet.compose(styles.input, fontStyles.body);
const composeHeader = StyleSheet.compose(styles.header, fontStyles.section);
const composeUsername = StyleSheet.compose(styles.username, fontStyles.body);
