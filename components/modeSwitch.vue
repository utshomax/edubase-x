<template>
   <div>
      <v-tooltip v-if="$vuetify.theme.dark" bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" v-ripple="false" fab x-small @click="darkMode">
            <v-icon>mdi-moon-waxing-crescent</v-icon>
          </v-btn>
        </template>
        <span>It's Dark Here !</span>
      </v-tooltip>

      <v-tooltip v-else bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" fab x-small @click="darkMode">
            <v-icon color="yellow">mdi-white-balance-sunny</v-icon>
          </v-btn>
        </template>
        <span>You're in Light!</span>
      </v-tooltip>
    </div>
</template>

<script>
export default {
    methods:{
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('dark',this.$vuetify.theme.dark.toString())
    }
    }
}
</script>

<style>

</style>