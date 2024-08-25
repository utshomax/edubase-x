<template>
<client-only>
    <div>
    <v-toolbar flat>
        <v-toolbar-title>UPLOAD RESULT</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon class="mb-1 mr-2">mdi-book-open-outline</v-icon> BATCH : {{info.batchname}}
        <v-icon class="ml-3 mb-1 mr-2">mdi-book-open-page-variant-outline</v-icon> EXAM: {{info.examname}}
        <v-btn outlined color="pink" class="ml-3" @click="$emit('closed')">CLOSE</v-btn>
    </v-toolbar>
  <table>
      <thead>
          <tr >
            <th v-for="item in headers" :key="item.value">{{item.text}}</th>
            <th>Mark</th>
          </tr>
      </thead>
      <tbody class="text-center">
          <tr v-for="item in displayeditems" :key="item.roll">
              <td v-for="h in headers" :key="h.text">{{item[h.value]}}</td>
              <td>
                  <input type="text"
                  :class="{inpc : !$vuetify.theme.dark}"
                  @keyup.enter="focusNext" 
                  v-model="item.mark">
              </td>
          </tr>
      </tbody>
     <tfoot>
         <td colspan="4" class="text-right">
            <span class="mr-2">Result {{Math.min(items.length,page_size)}} of {{items.length}}</span> 
            <v-btn elevation="2" :disabled="displayeditems.length<1" outlined color="success" :loading="loading" right @click="saveandcontinue()">
             NEXT <v-icon small class="ml-1">mdi-arrow-right-thin-circle-outline</v-icon></v-btn>
         </td>
     </tfoot>
  </table></div>
  </client-only>
</template>

<script>
export default {
    computed:{
        items(){
            let results = this.$store.state.result.results.filter(
                x=> x.batchid == this.info.batchid 
                && x.result.find(y=>y.examid == this.info.examid) == null
            )
            let i =results.map(v => ({roll:v.roll, name:v.name, mark:''}))
            return [...i]
        },
    displayeditems(){
        return this.paginate(this.items)
    },
    // count(){
    //     let c = this.items.length < this.page_size ? this.i
    // }
    },
    data(){
        return{
            headers:[
                {text:'Roll',value:'roll'},
                {text:'Name',value:'name'},
            ],
			page_size: 10,
            active:false,
            loading:false
        }
    },
    props:['info'],
    methods:{
        saveandcontinue(){
            this.loading = true
            let err= false
            let data=[]
         //   this.page_number++
            this.displayeditems.forEach(e => {
                if(!e.mark || e.mark == ""){
                    err = true
                    return
                }
                data.push({roll:e.roll,mark:e.mark})
            });
            if(!err && data.length>0){
                let pack = {
                    info:{
                        examid: this.info.examid,
                    },
                    data: data
                }
                this.$store.dispatch('result/addResult',pack).then(info=>{
                    this.loading = false
                    if(info=="ok"){
                        // this.page_number++
                    }
                    else{
                        this.$nuxt.$emit('toast',{type:'error',msg:"Somthing Went wrong!"})
                    }
                })
                console.log(data)
            }
            else{
                this.$nuxt.$emit('toast',{type:'error',msg:"Check All Mark Input Field !"})
                 this.loading = false
            }
        },
		paginate(items) {
            let page_size = this.page_size
            return items.slice(0, page_size);
        },
        focusNext(e){
           try{
               e.target.parentElement.parentElement.nextSibling.children[2].children[0].focus()
           }
            catch(err){
                console.log(err)
            }
        },
  }

}
</script>

<style scoped>
table{
    border-collapse: collapse;
    width: 100%;
}
table td,th{
    border:2px solid rgba(147, 147, 221, 0.356);
    padding: 8px;
}

table tr:hover {background-color: #ddd;color: black;}
table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  background-color: #04AA6D;
  color: white;
}
input{
    outline: none;
    width: 100%;
    height: 100%;
    color: white;
    text-align: center;
}
input:hover{
    color: black;
}
.inpc{
    color: black !important;
}
.bgfocused{
   background-color: aliceblue; 
}
</style>