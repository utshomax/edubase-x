<template>
  <v-dialog v-model="dialog" persistent max-width="390">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :color="showOnly ? 'grey lighten-1' : 'green'"
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>{{ showOnly ? "mdi-eye" : "mdi-check-circle-outline" }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        {{ showOnly ? "APROVED !" : "APROVE PAYMENT !" }}
      </v-card-title>
      <v-card-subtitle class="pt-2">
        <span class="font-weight-black"
          >NAME : {{ item.sendername.toUpperCase() }} | ID : {{ item.senderid }}
        </span>
      </v-card-subtitle>
      <v-card-text>
        TRANSACTION ID :<span
          style="color: orange;font-weight:900;letter-spacing: 2px;"
        >
          {{ item.paymentinfo.tranxid }}</span
        >
        <br />
        <span>
          <span style="color: green;font-weight:900;">
            PAID : {{ item.paymentinfo.paid }} <br
          /></span>
          MODE : {{ item.paymentinfo.mode }} <br />
          DUE : {{ item.paymentinfo.due }} <br />
          DATE TIME : {{ item.paymentinfo.datetime }} <br />
          MONTH : {{ item.paymentinfo.month }}
        </span>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          close
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          v-if="!showOnly"
          @click="emitsuccess"
          :disabled="!$store.state.hassms"
        >
          APROVE
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: ["item", "showOnly"],
  methods: {
    emitsuccess() {
      this.dialog = false;
      this.$emit("success");
    }
  }
};
</script>
