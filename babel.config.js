module.exports = function(api) {
  api.cache(true);
  const presets = [
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        targets: {
          browsers: ['defaults']
        }
      }
    ],
    '@babel/react'
  ];
  const plugins = ["@babel/plugin-proposal-class-properties"];

  return {
    presets,
    plugins
  };
};