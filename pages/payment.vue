<template>
  <PayTable :headers="headers" :items="students" title="Dues" />
</template>

<script>
import PayTable from "~/components/payment/PaymentTable.vue";

export default {
  components: { PayTable },
  data() {
    return {
      headers: [
        { text: "ROLL", value: "roll" },
        { text: "BATCH", value: "batchname" },
        { text: "NAME", value: "name" },
        { text: "DUE", value: "due" },
        { text: "PHONE NO.", value: "phone_no" },
        { text: "ACTIONS", value: "actions", align: "center" },
      ],
    };
  },
  computed: {
    students() {
      return this.$store.state.student.students.filter((x) => x.due > 0);
    },
  },
};
</script>

<style></style>
