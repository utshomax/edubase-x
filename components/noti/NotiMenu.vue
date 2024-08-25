<template>
   <v-menu
      transition="slide-x-transition"
      bottom
      right
      max-width="300px"
    >
      <template v-slot:activator="{ on, attrs }">
         <v-badge
          :color="pending > 0 ? 'orange lighten-2': 'transprent'"
          dot
          overlap
          class="mr-4"
        >
        <v-btn
          v-bind="attrs"
          v-on="on"
          small
          icon
          class="pa-0"
        >
        <v-icon>mdi-bell</v-icon>
        </v-btn>
         </v-badge>
      </template>

      <v-list class="pt-0" two-line max-width="350px">
      <v-list-item-group
        v-model="selected"
        active-class="pink--text"
      >
       <v-card>
        <v-card-title class="font-weight-bold text-subtitle-1">
            <span class="mr-2">NOTIFICATIONS</span>
            <v-spacer></v-spacer>
           <v-btn small fab>{{pending}}</v-btn>
            </v-card-title>
       </v-card>
       <v-container fluid class="noticon">
        <template v-for="(item, index) in items">
          <v-list-item :key="item.id" 
          @click="opennoti(item.id)">
            <template v-slot:default>
              <v-list-item-content class="pb-4">
                  <div class="text-overline mb-1">
                   {{item.type}}
                    </div>
                <v-list-item-title v-text="'ID : '+ item.id+' , '+item.msg"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.date"></v-list-item-action-text>

                <v-icon
                small
                  :color="item.status == 'pending' ? 'orange lighten-2': item.status == 'aproved' ? 'success' : 'error'"
                >
                 {{item.status == 'pending' ? 'mdi-clock': item.status == 'aproved' ? 'mdi-check-circle-outline' : 'mdi-cancel',}}
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>

          <v-divider
            v-if="index < items.length - 1"
            :key="index"
          ></v-divider>
        </template>
       </v-container>
      </v-list-item-group>
    </v-list>
    </v-menu>
</template>

<script>
export default {
    computed:{
        items(){
            return this.$store.getters['noti/getUpperNoti']
        },
        pending(){
          return this.$store.getters['noti/getPending']
        }
    },
    data(){
        return{
            selected:'',
           
        }
    },
    methods:{
      opennoti(id){
        this.$router.push({name:'notification'})
        this.$nuxt.$emit('openNoti',id)
      }
    }
}
</script>

<style>
.noticon {
    height: 400px;
    overflow-y: scroll;
    overflow-x: hidden;
}
.noticon::-webkit-scrollbar {
    width: 3px;
}
 
/* Handle */
.noticon::-webkit-scrollbar-thumb {
  background: rgb(100, 100, 100); 
}

/* Handle on hover */
.noticon::-webkit-scrollbar-thumb:hover {
  background: #00b39b;
  cursor: pointer !important;
}
</style>