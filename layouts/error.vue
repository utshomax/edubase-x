<template>
  <v-container fill-height fluid class="text-center">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="4">
        <div v-if="error.statusCode == 404">
          <h1 class="">404</h1>
          <h3>Page Not Found !</h3>
          <br />
          <v-btn small>
            <NuxtLink to="/">
              Home
            </NuxtLink>
          </v-btn>
        </div>
        <div v-else>
          <h3>{{ otherError }}</h3>
          <br />
          <h4>If this error persists, Please contact Support !</h4>
          <br />
          <v-btn small>
            <NuxtLink to="/support">
              support
            </NuxtLink>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  auth: false,
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred !"
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 38px;
}
</style>
