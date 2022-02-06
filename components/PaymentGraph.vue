<template>
  <v-card height="100%" class="pa-5">
      <v-sparkline
        :labels="labels"
        :gradient="gradient"
        :value="graphdata"
        height="100%"
        auto-draw
        color="white"
        line-width="2"
        padding="16"
        smooth
        show-labels
        type="bar"
      ></v-sparkline>
      <v-card-text>
      <div class="text-h6 font-weight-light mb-2">
        Leatest Payment Graph
      </div>
      <div class="subheading font-weight-light grey--text">
        By month - Total Amount vs Paid Amount
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon
        class="mr-2"
        small
      >
        mdi-clock
      </v-icon>
      <span class="text-caption grey--text font-weight-light">last updated 1 second ago</span>
    </v-card-text>
  </v-card>
</template>

<script>
var months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export default {
    data(){
      return{
      gradient: ['purple', 'violet'],
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      graphdata:[]
    }
    },
    mounted(){
      var data = []
      months.forEach(el => {
        let due = this.$store.state.payment.payments.filter(x=>x.month.toUpperCase()== el.toUpperCase()).reduce((n, {paid}) => n + paid, 0)
        data.push(due)
      });
      this.graphdata = data
    }
  }
</script>

<style>

</style>