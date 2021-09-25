import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import CustomIcon from '../components/icons/CustomIcons';

export default function Fonts() {

  const icons = require('../assets/icons.json');


    return (
      <View style={styles.page}>
        <Text style={[styles.text, styles.title]}>MOBILE</Text>
        <Text style={[styles.text, styles.title]}>title</Text>
        <Text style={[styles.text, styles.section]}>section</Text>
        <Text style={[styles.text, styles.button]}>button</Text>
        <Text style={[styles.text, styles.subtitle]}>subtitle</Text>
        <Text style={[styles.text, styles.body]}>body</Text>
        <Text style={[styles.text, styles.titleSecondary]}>titleSecondary</Text>
        <Text style={[styles.text, styles.subtitleSecondary]}>subtitleSecondary</Text>
        <Text style={[styles.text, styles.bodySecondary]}>bodySecondary</Text>
        <Text style={[styles.text, styles.subtext]}>subtext</Text>
        <Text style={[styles.text, styles.title]}>Icons</Text>
        <View style={styles.iconContainer}>
          <FlatList 
            data={icons}
            numColumns={12}
            renderItem={({item}) => (
              <View>
                <CustomIcon name={item.name} size={24} color='#000' />
              </View>
            )}
          />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginBottom: 10,
  },
  iconContainer: {
    height: 132,
  },
  title: {
    fontFamily: 'clarity-city-bold',
    fontSize: 22,
    lineHeight: 26,
  },
  section: {
    fontFamily: 'clarity-city-bold',
    fontSize: 16,
    lineHeight: 16,
  },
  button: {
    fontFamily: 'clarity-city-bold',
    fontSize: 14,
    lineHeight: 16,
  },
  subtitle: {
    fontFamily: 'clarity-city-semibold',
    fontSize: 14,
    lineHeight: 16,
  },
  body: {
    fontFamily: 'clarity-city-medium',
    fontSize: 14,
    lineHeight: 17,
  },
  titleSecondary: {
    fontFamily: 'clarity-city-bold',
    fontSize: 13,
    lineHeight: 13,
  },
  subtitleSecondary: {
    fontFamily: 'clarity-city-semibold',
    fontSize: 13,
    lineHeight: 13,
  },
  bodySecondary: {
    fontFamily: 'clarity-city-medium',
    fontSize: 13,
    lineHeight: 15,
  },
  subtext: {
    fontFamily: 'clarity-city-semibold',
    fontSize: 12,
    lineHeight: 12,
  },
});