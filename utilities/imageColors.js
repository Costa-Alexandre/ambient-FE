import ImageColors from 'react-native-image-colors'


export const imageBackgroundColor = async (uri) => {
    return ImageColors.getColors(uri, {
        fallback: '#228B22',
        cache: true,
        key: 'unique_key',
    })
    .then(result => {return result})
    .catch(error => {
      console.log(error)
      return null
    })
}