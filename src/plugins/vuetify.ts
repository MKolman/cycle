import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        // primary: colors.pink.base,
        // secondary: colors.pink.lighten4,
        // accent: colors.grey.darken1,

        // primary: '#ffb6a3', // Peach
        // secondary: '#f5d1c3',
        // accent: '#f0bc68', // Yellow

        // primary: '#aab8bb', // Grey-Blue
        // secondary: '#c4d7d1',
        // accent: '#5f9595', // Mint

        // primary: '#f9dbbd', // Dark yellow
        // secondary: '#faf3dd',
        // accent: '#e9afa3', // Peach

        // primary: '#a5f4ed', // Mint
        // secondary: '#e0fcf9',
        // accent: '#f79da4', // Peach

        primary: '#174a45', // Green
        secondary: '#afb8b3',
        accent: '#fc766a', // Peach
      },
        // primary: colors.deepOrange.darken1,
        // secondary: colors.deepOrange.lighten4,
        // accent: colors.deepOrange.lighten1,
    },
  },
})
