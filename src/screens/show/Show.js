import React, { useRef, useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { Modalize } from "react-native-modalize";
import { MainContext } from "store/MainProvider";

import { ShowInfo, ChatInput, ChatHeader, ChatComment } from "./components";

export default function Show({ route: { params: activeShow } }) {
  const { setActiveShow } = useContext(MainContext);

  useEffect(() => {
    setActiveShow(activeShow);
  }, []);

  const modalizeRef = useRef(null);

  const isOpen = (state) => {
    state && modalizeRef.current?.open("top");
    !state && modalizeRef.current?.close("alwaysOpen");
    setChatOpen(state);
  };

  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <ShowInfo {...dummyShowInfo} />

      <Modalize
        ref={modalizeRef}
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
      ></Modalize>
    </>
  );
}

// Styles

const styles = StyleSheet.create({
  rootModalize: {
    backgroundColor: "#000",
    flex: 1,
  },
});

// Dummy variables - DELETE

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

const dummyBGImage = { uri: "https://f4.bcbits.com/img/a1024330960_10.jpg" };

const dummyShowInfo = {
  showId: "1",
  showTitle: "SHOW NAME",
  showName: "Some show",
  showDescription: "this is a description",
  amountSpeakers: "10",
  amountListeners: "20",
  imageUri: dummyBGImage.uri,
  users: [],
  listenCallback: null,
};
