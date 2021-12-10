import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Portal } from "react-native-portalize";
import { MenuHome, LiveShow, CreateShowModalize, HomeSong } from "./components";
import { MainContext } from "store/MainProvider";
import { getShows } from "api/shows";
import { fontStyles, colorStyles } from "styles";
import LinearGradient from "react-native-linear-gradient";
import Logomark from 'assets/icons/Logomark';

export default function Home({ navigation }) {
  const { user, activeShow, checkPermissions } = useContext(MainContext);
  const [liveShows, setliveShows] = useState([]);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    getShows()
      .then((res) => {
        setliveShows(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeShow]);

  const openModal = () => {
    setModal((<CreateShowModalize openModal={true} onClose={closeModal} callback={(newShow) => navigation.navigate('Show', newShow)} />));
  }

  const closeModal = () => {
    setModal(null);
  }

  const emptyShowList = () => {
    return (
      <View style={styles.noShowsContainer}>
        <View style={{ width:150, height:150, marginBottom: 20, opacity: 0.5 }}>
          <Logomark />
        </View>
        <Text style={[fontStyles.subtitle, { color: colorStyles.textSecondary }]}>No active shows right now</Text>
      </View>
    )
  }

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <>
      <View style={styles.container}>
        
        <View style={styles.liveShow}>
          <FlatList
            data={liveShows}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={emptyShowList()}
            renderItem={({ item, index }) => (
              <View style={index == 0 ? [styles.liveShowItem, {marginTop: 72}] : styles.liveShowItem}>
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

        <MenuHome 
          user={user} 
          callback={openModal}
        />

        <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.linearGradientBottom}></LinearGradient>
        
        {activeShow._id !== "" && <HomeSong
          callback={() => navigation.navigate("Show", activeShow)}
        />}

      </View>

      <Portal>
        {modal}
      </Portal>
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
  noShowsContainer: {
    flex: 1,
    marginTop: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linearGradientBottom: {
    position: 'absolute',
    bottom: -48,
    height: 172,
    width: '100%',
  }
});
