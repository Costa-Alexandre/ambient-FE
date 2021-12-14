import React, {useRef, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { useModalize } from 'react-native-modalize/lib/utils/use-modalize';
import { ChatInput, ChatHeader, ChatComment } from "./components";
import { CustomButton } from "ui";

export default function ShowModalize() {

  const { ref, open, close } = useModalize();

  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (chatOpen) {
      open("top")
    } else {
      close("alwaysOpen")
    }
  }, [chatOpen])

  const renderFloatingComponent = () => (
    <View style={styles.floating}>
      <CustomButton
        icon="mute"
        size="squareBig"
        color="warning"
        callback={() => {}}
      />
    </View>
  );
  
  return (
    <Modalize
        ref={ref}
        alwaysOpen={140}
        avoidKeyboardLikeIOS={true}
        keyboardAvoidingBehavior={'height'}
        keyboardAvoidingOffset={0}
        withHandle={false}
        HeaderComponent={() => (
          <>
          {renderFloatingComponent()}
          <ChatHeader isOpen={chatOpen} callback={() => setChatOpen(current => !current)} />
          </>
        )}
        FooterComponent={() => <ChatInput />}
        modalHeight={400}
        withOverlay={false}
        modalStyle={styles.rootModalize}
        flatListProps={{
          data: dummyMessages,
          renderItem: ({ item }) => (
            <ChatComment
              imageUri={item.imageUri}
              username={item.username}
              payload={item.payload}
            />
          ),
        }}
      >
      </Modalize>
  )
}


  const styles = StyleSheet.create({
    rootModalize: {
      backgroundColor: "#000",
      flex: 1,
    },
    floating: {
      elevation: 9999,
      position: "absolute",
      top: -70,
      right: 20,
    },
  });

  const dummyMessages = [
    {
      key: "1",
      imageUri: "https://randomuser.me/api/portraits/men/1.jpg",
      username: "Username",
      payload: "Comment text",
    },
    {
      key: "2",
      imageUri: "https://randomuser.me/api/portraits/women/1.jpg",
      username: "Username",
      payload: "Comment text",
    },
  ];