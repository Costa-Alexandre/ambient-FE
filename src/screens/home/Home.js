import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { MenuHome, LiveShow, CreateShowModalize } from "./components";
import { PlayingSong } from "ui";
import { MainContext } from "store/MainProvider";
import { getLiveShows } from "api/shows";

export default function Home({ navigation }) {
  const { user, activeShow } = useContext(MainContext);
  const [liveShows, setliveShows] = useState([]);

  useEffect(() => {
    getLiveShows()
      .then((res) => {
        setliveShows(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <MenuHome 
          user={user} 
          callback={() => modalizeRef.current?.open("top")} 
        />
        <View style={styles.liveShow}>
          <FlatList
            data={liveShows}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.liveShowItem}>
                <LiveShow
                  showId={item._id}
                  showName={item.name}
                  showDescription={item.description}
                  amountSpeakers={0}
                  amountListeners={0}
                  imageUri={""}
                  listenCallback={() => navigation.navigate("Show", item)}
                />
              </View>
            )}
          />
        </View>
        {activeShow.showId !== "" && <PlayingSong uri={activeShow.imageUri} />}
      </View>
      <CreateShowModalize />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  stories: {
    marginVertical: 16,
  },
  liveShow: {
    marginHorizontal: 16,
    flex: 1,
  },
  liveShowItem: {
    marginBottom: 16,
  },
});

const dummyShowImageUri = "https://f4.bcbits.com/img/a1024330960_10.jpg";
