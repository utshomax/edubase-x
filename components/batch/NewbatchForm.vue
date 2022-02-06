<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="success" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-plus</v-icon>
       </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add New Batch</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    label="Batch name"
                    required
                    v-model="batchdata.name"
                    :rules="[(v) => !!v || 'Batch Name is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                 <date-picker label="Starting Date" v-model="batchdata.startdate"/>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="Monthly Fee"
                    required
                    v-model.number="batchdata.fee"
                    type="number"
                    :rules="[(v) => !!v || 'Monthly Fee is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    label="Admission Fee"
                    required
                    v-model.number="batchdata.admissionfee"
                    type="number"
                    :rules="[(v) => !!v || 'Admission Fee is required']"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>all fields are required</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="onSubmit"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import DatePicker from '../DatePicker.vue';
export default {
  components:{
        DatePicker
  },
  data: () => ({
    dialog: false,
    valid: false,
    batchdata: {
      name: "",
      startdate: '',
      currentdate: '',
      admissionfee: "",
      fee: "",
    },
  }),
  methods: {
    onSubmit() {
      let valid = this.$refs.form.validate();
      if (valid) {
        this.batchdata['currentdate'] = this.batchdata.startdate
        this.dialog = false;
        this.$store.dispatch("batch/addBatch", this.batchdata);
      } else return;
    },
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
  },
};
</script>

<style>
.addbtn {
  cursor: pointer;
}
</style>