<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      :max-width="max_width ? max_width : 340"
    >
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-text>{{ message }} </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="cancelable"
            color="green darken-1"
            text
            @click="
              dialog = false;
              $emit('close');
            "
          >
            close
          </v-btn>
          <v-btn v-else color="green darken-1" text @click="logout()">
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  props: ["title", "message", "cancelable", "max_width"],
  data() {
    return {
      dialog: true
    };
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push({ name: "login" });
    }
  }
};
</script>
