import { useFonts } from 'expo-font';

// Load custom fonts from the assets folder

export default loadFonts = () => {
  [fontsLoaded] = useFonts({
    // Naming convention from assets/fonts/weightMapping.json
    // Considering there is only one font family: Clarity City

    'Bold': require('assets/fonts/ClarityCity-Bold.otf'),
    'Medium': require('assets/fonts/ClarityCity-Medium.otf'),
    'SemiBold': require('assets/fonts/ClarityCity-SemiBold.otf'),
    'IcoMoon': require('assets/fonts/icomoon.ttf') // Icons
  })

  return fontsLoaded;
}
