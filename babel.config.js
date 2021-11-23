module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module-resolver", {
        "root": ["./src"],
        "alias": {
          "@ui": "./ui",
          "@home": "./screens/home"
        },
        "extensions": [
          ".android.js",
          ".js",
          ".json",
        ],
      }]
    ]
  };
};
