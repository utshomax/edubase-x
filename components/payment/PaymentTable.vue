<template>
  <div>
    <v-toolbar color="toolbar" flat>
      <v-toolbar-title>PAYMENTS</v-toolbar-title>
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
        style="max-width:300px;"
      ></v-text-field>
      <NuxtLink style="text-decoration:none" to="/history">
        <v-btn color="success" text>
          <v-icon class="pa-2">mdi-history</v-icon> History</v-btn
        >
      </NuxtLink>
      <confirm-dia
        :options="notifyOptions"
        outlined
        :icon="true"
        btnIconName="mdi-lightning-bolt"
        btncolor="success"
        iconClass="pa-1"
        smallicon
        @success="notifyall"
      />
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      class="mt-4"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <pay-dia
          :options="options"
          :info="currentStudent"
          @ready="setcurrent(item)"
          @success="payWindow(item, $event)"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import PayDia from "../payment/PayDia.vue";
import ConfirmDia from "../ConfirmDia.vue";
export default {
  components: { PayDia, ConfirmDia },
  data() {
    return {
      search: "",
      options: {
        title: "PAY WINDOW",
        agreeText: "PAY",
        btnText: "PAY"
      },
      currentStudent: {
        name: "",
        due: "",
        roll: ""
      },
      notifyOptions: {
        title: "Warning!",
        text: "Notify All who have dues ?",
        agreeText: "NOTIFY",
        btnText: "NOTIFY"
      }
    };
  },
  props: {
    headers: Array,
    items: Array,
    title: String
  },
  methods: {
    payWindow(student, payment) {
      let paymentData = {
        name: student.name,
        studentid: Number(student.roll),
        paid: Number(payment.amount),
        month: payment.month,
        ref: payment.ref,
        discount: Number(payment.discount),
        due: Number(student.due),
        brand: this.$store.state.settings.brand,
        date: new Date().toISOString()
      };
      this.$store.dispatch("payment/pay", paymentData);
    },
    setcurrent(item) {
      this.currentStudent = Object.assign({}, item);
    },
    notifyall() {
      this.$store.dispatch("message/notifyAll");
    }
  }
};
</script>
