<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      overflow
    >
      <v-list dense>
        <v-list-item
          link
          to="/"
        >
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-if="installPrompt !== null"
          @click="installPrompt.prompt()"
        >
          <v-list-item-action>
            <v-icon>mdi-cloud-download</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Install</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          to="/about"
        >
          <v-list-item-action>
            <v-icon>mdi-information</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          link
          @click="deleteDatabase"
        >
          <v-list-item-action>
            <v-icon>mdi-delete</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Reset</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      dark
      color="accent"
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Cycle</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import database from '@/plugins/db.ts'
  export default {
    props: {
      source: String,
    },
    data: () => ({
      installPrompt: null,
      drawer: null,
    }),
    mounted () {
      window.addEventListener('beforeinstallprompt', e => {
        // Prevent Chrome 76 and later from showing the mini-infobar
        e.preventDefault()
        // Stash the event so it can be triggered later.
        this.installPrompt = e
      })
    },
    methods: {
      deleteDatabase () {
        if (confirm('Are you sure you want to delete everything?\nThis cannot be undone.')) {
          database.deleteDb()
          document.location.reload()
        }
      },
    },
  }
</script>
