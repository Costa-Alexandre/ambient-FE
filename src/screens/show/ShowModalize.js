import React, {useContext, useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { useModalize } from 'react-native-modalize/lib/utils/use-modalize';
import { ChatInput, ChatHeader, ChatComment, FloatingButton } from "./components";
import { MainContext } from "store/MainProvider";

export default function ShowModalize() {

  const { isMuted, setIsMuted, chatMessages, user } = useContext(MainContext)

  const { ref, open, close } = useModalize();

  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (chatOpen) {
      open("top")
    } else {
      close("alwaysOpen")
    }
  }, [chatOpen])
  
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
          <FloatingButton active={isMuted} callback={() => setIsMuted(!isMuted)} />
          <ChatHeader isOpen={chatOpen} callback={() => setChatOpen(current => !current)} />
          </>
        )}
        FooterComponent={() => <ChatInput />}
        modalHeight={400}
        withOverlay={false}
        modalStyle={styles.rootModalize}
        flatListProps={{
          data: chatMessages,
          renderItem: ({ item }) => (
            <ChatComment
              imageUri={item.user.avatar}
              username={item.user.displayName === user.displayName ? "You" : item.user.displayName}
              payload={item.message}
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
    {
      key: "3",
      imageUri: "https://randomuser.me/api/portraits/women/1.jpg",
      username: "Username",
      payload: "Comment text 3",
    },
  ];