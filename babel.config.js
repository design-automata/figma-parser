module.exports = {
  "presets": ["@babel/preset-env", "@babel/preset-typescript"],
  "plugins": [
    ["module-resolver", 
      {
        "alias": {
          "@design-automata/node-figma": "./src/submodules/@design-automata/node-figma/src",
          "@design-automata/colou-utils": "./src/submodules/@design-automata/colour-utils/src"
        }
      }
    ]
  ]
}