
function IconSelection() {

  const data = require("../assets/fonts/selection.json");

  const icons = [];

  // loop through the data
  for (let i = 0; i < data.icons.length; i++) {
    const dict = {
      name: data.icons[i].properties.name,
      key: i
    }
    icons.push(dict);
  }

  const myJSON = JSON.stringify(icons);
  
  let fs = require('fs')
  fs.writeFile('./assets/icons.json', myJSON, function(err, result) {
    if(err) {
      console.log('error', err)
    } else {
      console.log('successfully generated icons.json')
    }
  });


}
IconSelection();