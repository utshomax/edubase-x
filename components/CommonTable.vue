<template>
  <v-card class="pa-1">
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        solo
        dense
        style="max-width:300px;"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :sort-by="sortcol"
      :sort-desc="dsec"
      :items-per-page="itemsPerPage"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  props: {
    headers: Array,
    items: Array,
    title: String,
    sortcol: String,
    dsec: Boolean,
    itemsPerPage: {
      type: Number,
      default: 5
    }
  },
  methods: {}
};
</script>
