<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="orange lighten-2"
        text
        :disabled="!$store.state.hassms"
        v-bind="attrs"
        v-on="on"
        align-start
        @click="$emit('ready')"
      >
        {{ options.btnText }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        {{ options.title }}
      </v-card-title>
      <v-card-text>
        {{ `Roll:${info.roll}  |  Name:${info.name} ` }}<br />{{
          ` Due: ${info.due}`
        }}
      </v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                label="Amount"
                type="number"
                required
                :rules="[(v) => !!v || 'Amount is required']"
                v-model="payment.amount"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :items="months"
                label="Month"
                required
                v-model="payment.month"
                :rules="[(v) => !!v || 'Month is required']"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Discount"
                type="number"
                v-model="payment.discount"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Refarence"
                required
                v-model="payment.ref"
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          cancel
        </v-btn>
        <v-btn color="green darken-1" text @click="emitsuccess">
          {{ options.agreeText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      payment: {
        amount: "",
        month: "",
        ref: this.$auth.user.id,
        discount: "",
      },
      valid: false,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
        "Others",
      ],
    };
  },
  props: ["options", "info"],
  methods: {
    emitsuccess() {
      let v = this.$refs.form.validate();
      if (v) {
        this.dialog = false;
        this.$emit("success", this.payment);
      }
    },
  },
};
</script>
