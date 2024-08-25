<template>
  <v-app id="inspire">
    <v-main>
      <v-container fluid fill-height>
        <v-snackbar v-model="snackbar" top right>
          <span class="text-caption font-weight-black">{{ sncText }}</span>

          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              :loading="loading"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              close
            </v-btn>
          </template>
        </v-snackbar>

        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12 pa-6">
              <v-toolbar dark color="primary">
                <v-toolbar-title
                  class="font-weight-black"
                  style="letter-spacing: 3px"
                >
                  EDUBASE
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-icon large>mdi-shield-lock-outline</v-icon>
              </v-toolbar>

              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="mdi-account"
                    name="login"
                    label="Username"
                    type="text"
                    v-model="user.t_id"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    v-model="user.password"
                    name="password"
                    label="Password"
                    type="password"
                    dense
                  ></v-text-field>

                  <v-text-field
                    id="pin"
                    prepend-icon="mdi-fingerprint"
                    v-model="user.pin"
                    name="pin"
                    label="Edubase Pin"
                    type="password"
                    dense
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <span class="pl-2 text-caption">Forgot Password ?</span>

                <v-spacer></v-spacer>

                <v-btn
                  color="primary"
                  @click="login"
                  :loading="loading"
                  :disabled="user.t_id == '' || user.password == ''"
                >
                  Login
                  <v-icon class="pa-3">mdi-login-variant</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  layout: "login",
  data() {
    return {
      loading: false,
      user: {
        t_id: "",
        password: "",
        pin: "",
      },
      sncText: "",
      snackbar: false,
    };
  },
  mounted() {
    this.user.pin = this.getSubdomain();
  },
  methods: {
    getSubdomain() {
      // Get the current hostname (e.g., 'sub.domain.com')
      const hostname = window.location.hostname;
      // Split the hostname into an array by dots
      const parts = hostname.split(".");

      // Check if it's a subdomain (e.g., ['sub', 'domain', 'com'])
      if (parts.length > 2) {
        // Return the first part as the subdomain
        return parts[0];
      } else {
        return ""; // No subdomain
      }
    },
    async login() {
      this.loading = true;
      this.sncText = "AUTHENTICATING...";
      this.snackbar = true;
      try {
        let url = this.$config.baseUrl + this.user.pin;
        this.$axios.defaults.baseURL = url;
        this.$nuxt.$emit("initsocket", url);
        let response = await this.$auth.loginWith("local", {
          data: { ...this.user },
        });
        if (response.data.user) {
          this.$auth.setUser(response.data.user);
          this.$store.commit("SET_SETTINGS", response.data.settings);
          // this.$nuxt.$emit('initsocket')
        } else {
          this.snackbar = true;
          this.sncText = "INVALID APPROCH !";
          this.loading = false; //akbc2021cid
        }
      } catch (err) {
        console.log(err);
        this.snackbar = true;
        this.sncText = "Something Went Wrong !";
        this.loading = false;
      }
    },
  },
};
</script>

<style></style>
