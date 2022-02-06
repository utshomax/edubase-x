<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="btncolor ? btncolor : 'primary lighten-2'"
        :text="text"
        :outlined="outlined"
        :disabled="!$store.state.hassms"
        v-bind="attrs"
        v-on="on"
        :icon="onlyicon"
      >
        {{ options.btnText }}
        <v-icon :small="smallicon" :class="iconClass" v-if="icon">{{
          btnIconName
        }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        {{ options.title }}
      </v-card-title>
      <v-card-text>{{ options.text }}</v-card-text>
      <slot name="inputslot"></slot>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          cancel
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="emitsuccess"
          :disabled="disabled"
        >
          {{ options.agreeText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: [
    "options",
    "btncolor",
    "icon",
    "btnIconName",
    "text",
    "outlined",
    "iconClass",
    "smallicon",
    "onlyicon",
    "disabled"
  ],
  methods: {
    emitsuccess() {
      this.dialog = false;
      this.$emit("success");
    }
  }
};
</script>
