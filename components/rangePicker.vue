<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
    class="pa-0 ma-0"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Select Date Range"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        solo
        dense
        class="mr-2 shrink"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="date"
      range
      @input="date.length >1 ? menu = false : ''"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
    props:['label'],
    data(){
        return{
            date:[],
            menu:false
        }
    },
    watch:{
        date(val){
            val.length > 1 &&
            this.$emit('input',val)
        }
    },
    methods:{
        formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
    }
};
</script>

<style>
</style>