<template>
  <v-dialog v-model="dialog" persistent max-width="400px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        :disabled="!$store.state.hassms"
        color="success"
        :outlined="opt.type == 'all'"
        text
        v-bind="attrs"
        v-on="on"
        class="pa-1"
      >
        {{ opt.btnText }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ opt.title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation class="pa-1">
            <v-row>
              <v-text-field
                v-if="opt.type == 'student'"
                label="Student's Roll Numbers"
                hint="use ',' as separetor"
                required
                :rules="[v => !!v || 'Required']"
                v-model="data.to"
              ></v-text-field>
              <v-select
                v-if="opt.type == 'batch'"
                v-model="selectedbatch"
                :items="batches"
                item-text="name"
                item-value="id"
                label="Select Batch"
                return-object
                single-line
                :rules="[v => !!v || 'Select A Batch']"
              ></v-select>
            </v-row>
            <v-row>
              <v-textarea
                label="Your Message"
                multi-line
                required
                v-model="data.msg"
                :rules="[v => !!v || 'Messege is required']"
              ></v-textarea>
            </v-row>
            <v-row>
              <v-text-field
                label="Referance"
                required
                :rules="[v => !!v || ' Input NA if Nothing Appicable']"
                v-model="data.ref"
              ></v-text-field>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="emitnewdata">
          {{ opt.agreeText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    valid: false,
    dialog: false,
    data: {
      to: "",
      msg: "",
      ref: ""
    },
    selectedbatch: null
  }),
  props: ["opt"],
  methods: {
    emitnewdata() {
      let v = this.$refs.form.validate();
      if (v) {
        let data = this.data;
        if (this.opt.type == "all") {
          data.to = "All";
        }
        if (this.opt.type == "batch") {
          data.to = this.selectedbatch.id;
          data.batchname = this.selectedbatch.name;
        }
        console.log(data);
        this.$emit("submit", { type: this.opt.type, data: data });
        this.dialog = false;
      }
    }
  },
  computed: {
    batches() {
      return this.$store.state.batch.batches;
    }
  }
};
</script>
