function Fonts() {

  const { font: {
            app: fonts // rename
          }  
        } = require("../assets/design_tokens.json");

  const fontsDict = {};

  const weightMapping = require("../assets/fonts/weightMapping.json");

  Object.keys(fonts).forEach(key => {
    fontsDict[key] = {
      fontFamily: weightMapping[fonts[key].value.fontWeight], // convert    fontWeight to fontFamily
      fontSize: fonts[key].value.fontSize,
      lineHeight: fonts[key].value.lineHeight,
      fontStyle: fonts[key].value.fontStyle,
      letterSpacing: fonts[key].value.letterSpacing,
      textDecorationLine: fonts[key].value.textDecoration,
    }
  });

  // generate json file fontStyles.json
  const myJSON = JSON.stringify(fontsDict);
  let fs = require('fs')
  fs.writeFile('./styles/fontStyles.json', myJSON, function(err, result) {
    if(err) {
      console.log('error', err)
    } else {
      console.log('success generating fontStyles.json')
    }
  });

}

function Colors() {
  // Read the colors from the DesignToken json file and generate key/value pairs
  // e.g { "color-primary": "#0070f3" }
  const { color:colors } = require("../assets/design_tokens.json");

  // create empty dict 
  const colorsDict = {};

  // loop through the colors and create key/value pairs
  // snakeToCamel is used to convert the key from snake_case to camelCase 
  Object.keys(colors).forEach(key => {
    camelKey = snakeToCamel(key);
    colorsDict[camelKey] = colors[key].value;
  })

  // generate json file colors.json
  const myJSON = JSON.stringify(colorsDict);
  let fs = require('fs')
  fs.writeFile('./styles/colorStyles.json', myJSON, function(err, result) {
    if(err) {
      console.log('error', err)
    } else {
      console.log('success generating colorStyles.json')
    }
  });
}

function snakeToCamel(str) {
  return str.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();});
}

Fonts();
Colors();