<template>
  <v-card class="pa-4">
    <v-card-title>
      Payment History
      <v-spacer></v-spacer>
      <range-picker v-model="dates" />
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        solo
        dense
        style="max-width:300px;"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="payments"
      :search="search"
      sort-by="id"
      :sort-desc="true"
    >
      <template v-slot:[`item.ref`]="props">
        <v-chip
          v-if="props.item.ref.split('-').length > 1"
          class="ma-2 green text-caption font-weight-bold"
          label
          outlined
          small
        >
          {{ props.item.ref.split("-")[0] }}
        </v-chip>
        <span v-else>{{ props.item.ref.split("-")[0] }}</span>
      </template>
      <template v-slot:[`item.date`]="props">
        <span>{{ formatDate(props.item.date) }}</span>
      </template>
      <template slot="body.append">
        <tr>
          <th :colspan="9" class="text-center text-subtitle-2">
            Total Payment Received : {{ this.total }} &#2547;
          </th>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import RangePicker from "~/components/rangePicker.vue";

export default {
  components: { RangePicker },
  data() {
    return {
      search: "",
      total: 0,
      dates: [],
      headers: [
        { text: "PAYID", value: "id", align: "center" },
        { text: "ROLL", value: "studentid", align: "center" },
        { text: "BATCH", value: "batchname", align: "center" },
        { text: "NAME", value: "name", align: "center" },
        { text: "DUE", value: "due", align: "center" },
        { text: "PAID", value: "paid", align: "center" },
        { text: "MONTH", value: "month", align: "center" },
        { text: "DATE", value: "date", align: "center" },
        { text: "REF", value: "ref", align: "center" }
      ]
    };
  },
  computed: {
    payments() {
      let a = this.$store.getters["payment/getHistoryByDate"](this.dates);
      this.total = a.reduce((total, obj) => obj.paid + total, 0);
      return a;
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      let d = date.split("T")[0];
      const [year, month, day] = d.split("-");
      return `${day}/${month}/${year}`;
    }
  }
};
</script>

<style></style>
