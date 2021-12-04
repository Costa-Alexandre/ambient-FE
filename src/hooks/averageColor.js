import React, { useState, useEffect } from 'react';
import ImageColors from 'react-native-image-colors'



const useAverageColor = (defaultUri, defaultBg) => {

  const [imageUri, setImageUri] = useState(defaultUri)
  const [bgColor, setBgColor] = useState(defaultBg)

  const updateBgColor = async (uri) => {
    if (uri) {
      const result = await ImageColors.getColors(uri, {
        fallback: defaultBg,
        cache: true,
      })
      
      if (result.platform === "android") {
        setBgColor(result.average)
      } else {
        throw new Error('Unexpected platform key')
      }
    } else {
      setBgColor(defaultBg)
    }
  }

  useEffect(() => {
    updateBgColor(imageUri)
  }, [imageUri])
  
  return [bgColor, setImageUri];
}

export default useAverageColor;