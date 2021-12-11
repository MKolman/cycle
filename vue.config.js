module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vuetify',
  ],
  pwa: {
    themeColor: '#49a1af',
    workboxOptions: {
      exclude: ['CNAME', 'google127d846da64dc5ee.html'],
    },
  },
  css: {
    sourceMap: true,
  },
}
