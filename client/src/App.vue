<template>
  <v-app style="background: #E3E3EE">
    <!-- Side Navbar -->
    <v-navigation-drawer app temporary fixed v-model="sideNav">
      <v-toolbar color="accent" dark text>
        <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">VueShare</h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- Side Navbar Links -->
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="item in sideNavItems" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon" small></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <!-- Signout Button -->
        <v-list-item v-if="user" @click="handleSignoutUser">
          <v-list-item-icon>
            <v-icon small>fas fa-sign-out-alt</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="'Signout'"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal Navbar -->
    <v-toolbar max-height="60" color="primary" fixed dark>
      <!-- App Title -->
      <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">VueShare</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Search Input -->
      <v-text-field
        flex
        prepend-icon="$vuetify.icon.search"
        placeholder="Search posts"
        color="accent"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <!-- Horizontal Navbar Links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn text v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
          <v-icon class="hidden-sm-only" left small>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>

        <!-- Profile Button -->
        <v-btn text to="/profile" v-if="user">
          <v-icon class="hidden-sm-only" left>fas fa-id-card</v-icon>
          <v-badge right color="blue darken-2">
            <span slot="badge">1</span>
            Profile
          </v-badge>
        </v-btn>

        <!-- Signout Button -->
        <v-btn text v-if="user" @click="handleSignoutUser">
          <v-icon class="hidden-sm-only" left>fas fa-sign-out-alt</v-icon>Signout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- App Content -->
    <main>
      <v-container>
        <transition name="fade">
          <router-view />
        </transition>
      </v-container>
    </main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      sideNav: false
    };
  },

  computed: {
    ...mapGetters(["user"]),

    horizontalNavItems() {
      let items = [
        { icon: "$vuetify.icon.chat", title: "Posts", link: "/posts" },
        { icon: "$vuetify.icon.lock_open", title: "Sign In", link: "/signin" },
        { icon: "$vuetify.icon.create", title: "Sign Up", link: "/signup" }
      ];

      if (this.user) {
        items = [
          { icon: "$vuetify.icon.chat", title: "Posts", link: "/posts" }
        ];
      }
      return items;
    },

    sideNavItems() {
      let items = [
        { icon: "$vuetify.icon.chat", title: "Posts", link: "/posts" },
        { icon: "$vuetify.icon.lock_open", title: "Sign In", link: "/signin" },
        { icon: "$vuetify.icon.create", title: "Sign Up", link: "/signup" }
      ];

      if (this.user) {
        items = [
          { icon: "$vuetify.icon.chat", title: "Posts", link: "/posts" },
          {
            icon: "$vuetify.icon.star",
            title: "Create Post",
            link: "/post/add"
          },
          { icon: "$vuetify.icon.profile", title: "Profile", link: "/profile" }
        ];
      }

      return items;
    }
  },

  methods: {
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    },

    toggleSideNav() {
      this.sideNav = !this.sideNav;
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-property: all;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-25px);
}
</style>
