<template>
<div>
    <result-table v-if="!show" @upload="donext($event)"/>
     <transition name="slide-fade">
    <upload-sheet v-if="show" @closed="show= false" :info="options"/>
  </transition> 
</div>
</template>

<script>
import ResultTable from '~/components/result/ResultTable.vue'
import UploadSheet from '~/components/result/UploadSheet.vue'
export default {
  components: { ResultTable, UploadSheet },
  data(){
    return{
      options:null,
      show:false
    }
  },
  computed:{
   batches(){
    return this.$store.state.batch.batches
   }
 },
 methods:{
   donext({batch,exam}){
     this.show = true
     this.options = {
        batchid:batch.id,
        batchname:batch.name,
        examid:exam.examid,
        examname:exam.examname
      }
   }
 }

}
</script>

<style>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>