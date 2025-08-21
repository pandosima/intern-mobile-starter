module.exports = {
  presets: [
    'module:metro-react-native-babel-preset'
  ],
  plugins: [
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['babel-plugin-syntax-hermes-parser'],
    ['react-native-worklets/plugin'],
    [
      'module-resolver',
      {
        alias: {
          root: ['./'],
          '@modules': './js/modules',
          '@utils': './js/utils',
          '@services': './js/services',
          '@components': './js/components',
          '@themes': './js/themes',
          '@hooks': './js/hooks',
          '@localization': './js/localization',
          // Add more aliases as needed
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // Specify file extensions to resolve
      },
    ],
  ],
};
