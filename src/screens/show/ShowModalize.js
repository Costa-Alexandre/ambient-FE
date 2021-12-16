import React, {useContext, useState, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { useModalize } from 'react-native-modalize/lib/utils/use-modalize';
import { ChatInput, ChatHeader, ChatComment, FloatingButton } from "./components";
import { MainContext } from "store/MainProvider";

export default function ShowModalize() {

  const { isMuted, setIsMuted, chatMessages, user } = useContext(MainContext)

  const { ref, open, close } = useModalize();

  const chatRef = useRef()

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
        contentRef={chatRef}
        alwaysOpen={140}
        avoidKeyboardLikeIOS={true}
        keyboardAvoidingBehavior={'height'}
        keyboardAvoidingOffset={-80}
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
        onClose={() => chatRef.current?.scrollToEnd()}
        flatListProps={{
          data: chatMessages,
          onContentSizeChange: () => {chatRef.current?.scrollToEnd()},
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