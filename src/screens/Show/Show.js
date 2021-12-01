import React, { useRef, useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { remote as SpotifyRemote } from "react-native-spotify-remote";
import { Modalize } from "react-native-modalize";
import { MainContext } from 'store/MainProvider';

import { ShowInfo, ChatInput, ChatHeader, ChatComment } from "./components";

export default function Show({ route: { params: activeShow } }) {
  
  const { setActiveShow } = useContext(MainContext);

  useEffect(() => {
    setActiveShow(activeShow);
    console.log(activeShow);
  }, []);

  
  
  const modalizeRef = useRef(null);

  useEffect(() => {
    onToggle(chatOpen);
  }, [chatOpen]);

  const onToggle = (chatOpen) => {
    if (chatOpen) {
      // open chat modal
      modalizeRef.current?.open("top");
    } else {
      // close chat modal
      modalizeRef.current?.close("alwaysOpen");
    }
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
          <ChatHeader open={false} callback={(state) => setChatOpen(state)} />
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

const dummyOnPressHandler = () => {
  SpotifyRemote.playUri("spotify:track:4cY1UR4UCWzXqGm9lMvnQC");
};

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
