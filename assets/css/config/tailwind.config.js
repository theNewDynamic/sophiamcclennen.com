module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: require('./purge.config.js'),
  theme: {
    extend: {
      spacing: {
        '4m': '1em'
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ]
};
