<template>
  <v-container fluid class=" ma-0 index-main">
    <dashbord-card
      :paid="paid"
      :due="due"
      :msg="Number(this.$store.state.settings.msg_left) - Number(message)"
      :pending="pending"
    />
    <v-row>
      <v-col class="full-height">
        <payment-graph />
      </v-col>
      <v-col>
        <v-toolbar height="50" rounded>
          <v-toolbar-title class="text-button">BATCHES</v-toolbar-title>
          <v-spacer></v-spacer>
          <newbatch-form />
        </v-toolbar>
        <v-container class="batchdiv batchCol rounded mt-4">
          <div v-for="batch in batches" :key="batch.id">
            <card :batch="batch" />
          </div> </v-container
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "~/components/batch/BatchCard.vue";
import NewbatchForm from "~/components/batch/NewbatchForm.vue";
import DashbordCard from "~/components/DashbordCard.vue";
import { mapGetters } from "vuex";

export default {
  title: "Home",
  components: { Card, NewbatchForm, DashbordCard },
  data: () => ({}),
  mounted() {
    this.$store.dispatch("batch/getBatches");
    this.$store.dispatch("student/getStudents");
    this.$store.dispatch("payment/getPaymentHistory");
    this.$store.dispatch("result/getAllResult");
    this.$store.dispatch("message/getHistory");
    this.$store.dispatch("noti/getAllNoti");
    this.$store.dispatch("getSettings");
  },
  computed: {
    batches() {
      return this.$store.state.batch.batches;
    },
    ...mapGetters({
      paid: "payment/getTotalPaid",
      due: "student/getTotalDues",
      message: "getSmsCount",
      pending: "noti/getPending"
    })
  }
};
</script>

<style>
.batchdiv {
  overflow: auto;
  height: calc(100vh - 305px);
}
.batchdiv::-webkit-scrollbar {
  width: 4px;
}

/* Handle */
.batchdiv::-webkit-scrollbar-thumb {
  background: rgb(17, 3, 31);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #00b39b;
  cursor: pointer !important;
}
.index-main {
  max-height: calc(100vh - 88px - 36px);
  overflow: hidden;
}
</style>
