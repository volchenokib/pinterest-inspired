<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Signun Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Get Started Here</h1>
      </v-flex>
    </v-layout>

    <!-- Error Alert -->
    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Signin Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="accent" dark>
          <v-container>
            <v-form v-model="isFormValid" ref="form" @submit.prevent="handleSignupUser">
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="username"
                    prepend-icon="$vuetify.icon.user"
                    label="Username"
                    type="text"
                    :rules="usernameRules"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="email"
                    prepend-icon="$vuetify.icon.email"
                    label="Email"
                    type="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="password"
                    prepend-icon="$vuetify.icon.lock"
                    label="Password"
                    type="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="passwordConfirmation"
                    prepend-icon="$vuetify.icon.gavel"
                    label="Confirm Password"
                    type="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex xs12>
                  <v-btn
                    :loading="loading"
                    :disabled="!isFormValid || loading"
                    color="info"
                    type="submit"
                  >
                    <span slot="loader" class="custom-loader">
                      <v-icon light>fas fa-spinner</v-icon>
                    </span>
                    Signup
                  </v-btn>
                  <h3>
                    Already have an account?
                    <router-link to="/signin">Signin</router-link>
                  </h3>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      username: "",
      password: "",
      passwordConfirmation: "",
      email: "",

      isFormValid: true,

      usernameRules: [
        username => !!username || "Username is required",
        username =>
          username.length < 10 || "Username cannot be more than 10 characters"
      ],
      passwordRules: [
        password => !!password || "Password is required",
        password =>
          password.length >= 4 || "Password must be at least 4 characters",
        confirmation => confirmation === this.password || "Passwords must match"
      ],
      emailRules: [
        email => !!email || "Email is required",
        email => /.@+./.test(email) || "Email must be valid"
      ]
    };
  },
  watch: {
    user(value) {
      if (value) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapGetters(["loading", "error", "user"])
  },
  methods: {
    handleSignupUser() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signupUser", {
          username: this.username,
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>