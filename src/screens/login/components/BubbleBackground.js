import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";


function Bubble({uri, size, x, y}) {

  const moveX = useRef(new Animated.Value(size/2)).current;
  const moveY = useRef(new Animated.Value(size/2)).current;

  const animX = () => Animated.sequence([
    Animated.timing(moveX, {
      toValue: size/2 + (Math.random()-0.5) * 40,
      duration: Math.max(2000, Math.random()*4000),
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }),
    Animated.timing(moveX, {
      toValue: size/2,
      duration: Math.max(2000, Math.random()*4000),
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false
    }),
  ]).start(() => animX())

  const animY = () => Animated.sequence([
    Animated.timing(moveY, {
      toValue: size/2 + (Math.random()-0.5) * 40,
      duration: Math.max(2000, Math.random()*4000),
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }),
    Animated.timing(moveY, {
      toValue: size/2,
      duration: Math.max(2000, Math.random()*4000),
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false
    }),
  ]).start(() => animY())

  useEffect(() => {
    animX()
    animY()
  }, [])

  return (
    <Animated.Image
      style={[styles.backgroundImg, {width: size, height: size, left: x, top: y, transform: [{translateX: moveX}, {translateY: moveY}]}]}
      source={{uri: uri}} />
  )
}


export default function BubbleBackground({  }) {

  const images = [
    {uri: "https://upload.wikimedia.org/wikipedia/en/6/61/Little_Simz_-_Sometimes_I_Might_Be_Introvert.jpeg",
    x: "-10%", y: "0%", size: 120 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/8/8e/Silk_Sonic_-_An_Evening_with_Silk_Sonic.png",
    x: "55%", y: "-5%", size: 100 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/f/f4/Late_registration_cd_cover.jpg",
    x: "30%", y: "10%", size: 120 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/b/b9/London_Grammar_-_Californian_Soil.png",
    x: "-20%", y: "21%", size: 120 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/7/77/MacMillerFaces.jpg",
    x: "24%", y: "30%", size: 80 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/9/9b/Tame_Impala_-_Currents.png",
    x: "60%", y: "30%", size: 120 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/4/44/Kids_See_Ghosts_Cover.png",
    x: "35%", y: "45%", size: 100 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/d/d3/Mac_Miller_GOOD_AM.jpg",
    x: "-5%", y: "50%", size: 100 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/c/c7/Pure_Comedy.jpg",
    x: "70%", y: "60%", size: 100 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/4/4c/Logic_No_Pressure_album_cover.jpeg",
    x: "40%", y: "70%", size: 80 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/8/8a/Mmfood.jpg",
    x: "-5%", y: "65%", size: 120 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/1/14/Dilladonutscover.jpg",
    x: "-20%", y: "80%", size: 80 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/2/2a/2014ForestHillsDrive.jpg",
    x: "5%", y: "85%", size: 120 },
    {uri: "https://upload.wikimedia.org/wikipedia/en/0/0a/Kidcudimanonthemoonthelegendof.jpg",
    x: "60%", y: "83%", size: 100 },
  ]

  return (
    <View style={styles.imageBackground}>
      {images.map(({uri, x, y, size}, i) => {
        return <Bubble key={uri} uri={uri} x={x} y={y} size={size}/>
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backgroundImg: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 100,
    opacity: 0.25,
  }
});
