import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#fc766a', // Peach
        secondary: '#fdb1aa',
        accent: '#49a1af', // Cyan
      },
    },
  },
})
