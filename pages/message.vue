<template>
<div>
    <v-toolbar flat class="mb-4">
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer> 
         <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          class="mr-3"
          single-line
          hide-details
          solo
          dense
          style="max-width:250px;"
        ></v-text-field>
        <v-tooltip bottom>
         <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs"
          v-on="on" icon @click="refatch"><v-icon>mdi-refresh</v-icon></v-btn>
         </template>
         <span>Reload Message History</span>
        </v-tooltip>
        <span class="pa-1 mr-1 font-weight-medium text-button"> SMS TO :</span> 
        <msg-dia :opt="optall.student" @submit="smsto($event)"/>
        <msg-dia :opt="optall.batch" @submit="smsto($event)"/>
        <msg-dia :opt="optall.all" @submit="smsto($event)"/>
      </v-toolbar>
       <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
    >
    </v-data-table>
</div>
</template>

<script>
import CommonTable from '~/components/CommonTable.vue'
import MsgDia from '~/components/message/MsgDia.vue'
export default {
    components:{
        CommonTable,
        MsgDia   
    },
     data(){
        return{
            headers:[
                {text:'# ID',value:'id',align:'center'},
                {text:'TO',value:'to',align:'center'},
                {text:'MESSAGE',value:'msg',align:'center'},
                {text:'REF',value:'ref',align:'center'},
                {text:'COUNT',value:'count',align:'center'},
                {text:'STATUS',value:'status',align:'center'},
                ],
            title:'MESSAGES',
            search:'',
            optall:{
                all:{
                    title:'SMS TO ALL',
                    btnText:'ALL',
                    agreeText:'SEND',
                    type:'all'
                },
                batch:{
                    title:'SMS TO BATCH',
                    btnText:'BATCH',
                    agreeText:'SEND',
                    type:'batch'
                },
                student:{
                    title:'SMS TO STUDNETS',
                    btnText:'STUDNETS',
                    agreeText:'SEND',
                    type:'student'
                },
            }
        }
    },
    computed:{
        items(){
            return this.$store.state.message.messages
        },
    },
    methods:{
        smsto(v){
          this.$store.dispatch('message/sendSms',v)
        },
        refatch(){
            this.$store.dispatch('message/getHistory')
        }
    }
}
</script>

<style>

</style>