import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import stc from 'string-to-color';
import CustomIcon from './CustomIcon';
import { colorStyles, fontStyles } from 'styles';

import Svg, { Path, Mask, Image as SVGImage, Rect } from "react-native-svg"


function ProfileShapeRectStage({uri, hasCutout, fill=colorStyles.buttonSolid}) {
  // path converted from Figma with https://svg2jsx.com/ and https://react-svgr.com/playground/?native=true
  const size = 60
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 60 60" // original size of path
      xmlns="http://www.w3.org/2000/svg"
    >
      <Mask id={`clip`}>
        {hasCutout ? <Path
          d="M27 0C12.088 0 0 12.088 0 27v6c0 14.912 12.088 27 27 27h6c1.496 0 2.964-.122 4.394-.356 2.968-.486 3.556-4.425 2.87-7.353A10.03 10.03 0 0140 50v-2c0-5.523 4.477-10 10-10 .684 0 1.351.069 1.996.2 3.193.646 7.724-.112 7.942-3.362.041-.608.062-1.22.062-1.838v-6C60 12.088 47.912 0 33 0h-6z"
          fill="white"
        />
        : <Rect width={size} height={size} fill="white" rx={size*0.45}></Rect>}
      </Mask>
      <Rect x="0" y="0"
        width="100%" height="100%"
        fill={fill}
        mask={`url(#clip)`} />
      <SVGImage href={{uri:uri}}
        width="100%" height="100%"
        preserveAspectRatio="xMidYMid slice"
        mask={`url(#clip)`} />
    </Svg>
  )
}


export default function UserStage({uri=null, callback=null, username="...", isMuted=false, isTalking=false}) {

  const [color, setColor] = useState(colorStyles.buttonSolid)

  const onPress = () => {
    if (callback) {
      callback()
    }
  }

  useEffect(() => {
    setColor(stc(username))
  }, [])

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={callback!==null ? 0.8 : 1}
      onPress={onPress}
    >
      <View style={[styles.wrapper, {borderColor: isTalking&&!isMuted ? 'rgba(255, 255, 255, 0.75)' : 'transparent'}]}>
        <View style={styles.image}>
          <ProfileShapeRectStage uri={uri} hasCutout={isMuted} fill={color}/>
          {isMuted && <View style={styles.muteIcon}>
            <CustomIcon name={"mute"} size={18} color='#fff' />
          </View>}
          {!uri && <Text style={styles.letter}>{username[0]}</Text>}
        </View>
      </View>
      <Text style={[
        fontStyles.subtext,
        styles.username]} numberOfLines={1} ellipsizeMode={"tail"}>{username}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    width: 68,
    height: 68,
    borderRadius: 68 * 0.45,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: 68,
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    width: 60,
    height: 60
  },
  muteIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  username: {
    color: 'white',
    marginTop: 4
  },
  letter: {
    color: 'white',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    lineHeight: 55,
    fontSize: 22,
    fontWeight: "700"
  }
});
