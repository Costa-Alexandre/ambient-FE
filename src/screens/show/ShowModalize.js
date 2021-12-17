import React, {useContext, useState, useEffect, useRef } from "react";
import { StyleSheet, Text } from "react-native";
import { Modalize } from "react-native-modalize";
import { useModalize } from 'react-native-modalize/lib/utils/use-modalize';
import { ChatInput, ChatHeader, ChatComment, FloatingButton, ChatWelcome, ChatFooter } from "./components";
import { MainContext } from "store/MainProvider";

export default function ShowModalize() {

  const { isMuted, setIsMuted, chatMessages, user, activeShow } = useContext(MainContext)

  const { ref, open, close } = useModalize();

  const chatRef = useRef();

  const [chatOpen, setChatOpen] = useState(false);
  const [chatOpened, setChatOpened ] = useState(false);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (chatOpen) {
      open("top");
      setChatOpened(true);
    } else {
      close("alwaysOpen");
      setChatOpened(false);
    }
  }, [chatOpen])
  
  return (
    <Modalize
        ref={ref}
        contentRef={chatRef}
        alwaysOpen={140}
        avoidKeyboardLikeIOS={true}
        keyboardAvoidingBehavior={'height'}
        keyboardAvoidingOffset={-75}
        withHandle={false}
        HeaderComponent={() => (
          <>
          <FloatingButton active={isMuted} callback={() => setIsMuted(!isMuted)} />
          <ChatHeader isOpen={chatOpened} callback={() => setChatOpen(current => !current)} />
          </>
        )}
        FooterComponent={() => <ChatInput onFocusCallback={() => setFocus(true)} onBlurCallback={() => setFocus(false)}/>}
        modalHeight={400}
        withOverlay={false}
        modalStyle={styles.rootModalize}
        onClosed={() => chatRef.current?.scrollToEnd()}
        onPositionChange={(prop) => prop == 'top' ? setChatOpened(true) : setChatOpened(false)}
        flatListProps={{
          data: chatMessages,
          onContentSizeChange: () => {chatRef.current?.scrollToEnd()},
          ListHeaderComponent: <ChatWelcome showName={activeShow.name} username={user.displayName} />,
          ListFooterComponent: (chatOpen == focus) ? <ChatFooter /> : <></>,
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