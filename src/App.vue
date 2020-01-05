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

      <v-img
        alt="Tracker logo"
        class="shrink mr-2"
        contain
        src="img/icons/icon.svg"
        transition="scale-transition"
        width="40"
      />
      <v-toolbar-title>Tracker</v-toolbar-title>
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
      drawer: null,
    }),
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
