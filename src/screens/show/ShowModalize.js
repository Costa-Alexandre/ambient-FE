import React, {useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { useModalize } from 'react-native-modalize/lib/utils/use-modalize';
import { ChatInput, ChatHeader, ChatComment } from "./components";

export default function ShowModalize() {

  const { ref, open, close } = useModalize();

  const isOpen = (state) => {
    state && open("top");
    !state && close("alwaysOpen");
    setChatOpen(state);
  };

  const [chatOpen, setChatOpen] = useState(false);

  return (
    <Modalize
        ref={ref}
        alwaysOpen={140}
        withHandle={false}
        HeaderComponent={() => (
          <ChatHeader isOpen={chatOpen} callback={isOpen} />
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