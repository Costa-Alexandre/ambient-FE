import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { globalStyles } from '../../styles/global';
import CustomIcon from '../icons/CustomIcons';

import Svg, { Path, Mask, Image as SVGImage, Rect } from "react-native-svg"


function ProfileShapeRectBig({uri, hasCutout}) {
  // path converted from Figma with https://svg2jsx.com/ and https://react-svgr.com/playground/?native=true
  const size = 74
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 74 74" // original size of path
      xmlns="http://www.w3.org/2000/svg"
    >
      <Mask id={`clip`}>
        {hasCutout ? <Path
          d="M33.3 0C14.909 0 0 14.909 0 33.3v7.4C0 59.091 14.909 74 33.3 74h7.4c3.868 0 7.582-.66 11.036-1.872 2.365-.83 2.899-3.808 2.436-6.271A10.054 10.054 0 0154 64c0-5.523 4.477-10 10-10 .635 0 1.255.06 1.857.172 2.463.463 5.44-.071 6.27-2.436A33.248 33.248 0 0074 40.7v-7.4C74 14.909 59.091 0 40.7 0h-7.4z"
          fill={'white'}
        />
        : <Rect width={size} height={size} fill="white" rx={size*0.45}></Rect>}
      </Mask>
      <Rect x="0" y="0"
        width="100%" height="100%"
        fill={globalStyles['solid'].backgroundColor}
        mask={`url(#clip)`} />
      <SVGImage href={{uri:uri}}
        width="100%" height="100%"
        preserveAspectRatio="xMidYMid slice"
        mask={`url(#clip)`} />
    </Svg>
  )
}


export default function UserBig({uri=null, callback=null, isLive=false}) {

  const onPress = () => {
    if (callback) {
      callback()
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={callback!==null ? 0.8 : 1}
      onPress={onPress}
    >
      <ProfileShapeRectBig uri={uri} hasCutout={isLive}/>
      {isLive && <View style={styles.liveIndicator}>
        <CustomIcon name={"Live"} size={20} color='#37bb64' />
      </View>}
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    width: 74,
    height: 74
  },
  liveIndicator: {
    position: 'absolute',
    right: 0,
    bottom: 0
  }
});