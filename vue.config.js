module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  pwa: {
    themeColor: '#49a1af',
    workboxOptions: {
      exclude: ['CNAME'],
    },
  },
}
