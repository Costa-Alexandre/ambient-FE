
function IconSelection() {
  // empty object

  const data = require("../assets/fonts/selection.json");

  const icons = [];
  console.log(data.icons[1]);
  // loop through the data
  for (let i = 0; i < data.icons.length; i++) {
    const dict = {
      name: data.icons[i].properties.name,
      key: i
    }
    icons.push(dict);
  }

  console.log(icons);
  const myJSON = JSON.stringify(icons);
  
  let fs = require('fs')
  fs.writeFile('./assets/icons.json', myJSON, function(err, result) {
    if(err) console.log('error', err);
  });


}
IconSelection();
// console.log(IconSelection());