export default function DesignTokens(obj) {

  const data = require("../assets/design_tokens.json");

  const styleTitles = Object.keys(data.font.app)

  // loop through the data
  for (let i = 0; i < styleTitles.length; i++) {

    obj[styleTitles[i]] = data.font.app[styleTitles[i]].value;
  }

}