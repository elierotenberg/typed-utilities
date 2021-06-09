// This config is only used for tests with jest, as per https://jestjs.io/docs/getting-started#using-typescript

module.exports = {
  presets: [
    [`@babel/preset-env`, { targets: { node: `current` } }],
    +`@babel/preset-typescript`,
  ],
};
