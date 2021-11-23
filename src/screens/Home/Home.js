import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MenuHome, Stories, LiveShow } from './components';
import { PlayingSong } from 'ui';


export default function Home({ navigation }) {

  const dummyUser = {
    avatar: "https://images.unsplash.com/photo-1631701119265-33ca2b80d00d?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
  }

  const dummyLiveShowList = [
    {
      key: '1', 
      showTitle: "SHOW NAME",
      showName: "Show Name",
      showDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. fejspo eos jo o oeo",
      amountSpeakers: "5",
      amountListeners: "50",
      imageUri: "https://f4.bcbits.com/img/a1024330960_10.jpg",
    },
    {
      key: '2', 
      showTitle: "SHOW NAME 2",
      showName: "Show Name 2",
      showDescription: "Consectetur adipiscing elit. fejspo eos jo o oeo",
      amountSpeakers: "1",
      amountListeners: "623",
      imageUri: "https://yt3.ggpht.com/a/AATXAJzmEsgCTUtk-YcQp0s7Uf6OLJN4BRXsnvz33g=s900-c-k-c0xffffffff-no-rj-mo",
    },
  ]

  const dummyPlayingSongUri = "https://f4.bcbits.com/img/a1024330960_10.jpg"


    return (
      <View style={styles.container}>
        <MenuHome user={dummyUser} />
          <View style={styles.liveShow}>
            <FlatList
              data={dummyLiveShowList}
              ListHeaderComponent={
                <View style={styles.stories}>
                  <Stories />
                </View>
                }
              renderItem={({ item }) => (
              <View style={styles.liveShowItem}>
                <LiveShow
                showId={item.key}
                showTitle={item.showTitle}
                showName={item.showName}
                showDescription={item.showDescription}
                amountSpeakers={item.amountSpeakers}
                amountListeners={item.amountListeners}
                imageUri={item.imageUri}
                listenCallback={() => navigation.navigate('Show', item.key)}
                />
              </View>
              )}
            />
          </View>
        <PlayingSong uri={dummyPlayingSongUri} />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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