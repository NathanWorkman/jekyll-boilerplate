module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      browsers: [
        'last 1 version',
        '> 1%',
        'maintained node versions',
        'not dead'
      ]
    },
    cssnano: {}
  }
};
