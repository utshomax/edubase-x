<template>
  <v-expansion-panels accordion>
    <v-expansion-panel v-for="item in items" :key="item.id">
      <v-expansion-panel-header disable-icon-rotate
        >{{ item.id }}.
        {{ item.title }}
        <template v-slot:actions>
          <v-icon small>
            mdi-information-outline
          </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        {{ item.content }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: ["items"]
};
</script>

<style></style>
