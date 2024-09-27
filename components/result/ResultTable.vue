<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-toolbar color="toolbar" flat class="mb-4">
        <v-toolbar-title>RESULTS</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <span
          >Exam: {{ options.exam.examname }} - Full Mark:
          {{ options.exam.fmark }}</span
        >
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
        <v-btn color="success" @click="uploadsheet" text>
          <v-icon class="pa-2">mdi-plus</v-icon> Add result</v-btn
        >
      </v-toolbar>
      <v-toolbar flat>
        <v-select
          class="pt-6"
          prepend-icon="mdi-select-group"
          v-model="options.batch"
          :items="batches"
          item-text="name"
          item-value="id"
          label="Select Batch"
          solo
          return-object
          single-line
          :rules="[v => !!v || 'Select A Batch']"
        ></v-select>
        <v-select
          solo
          class="pt-6 ml-3"
          prepend-icon="mdi-ballot-outline"
          v-model="options.exam"
          :items="exams"
          item-text="examname"
          item-value="examid"
          label="Select Exam"
          persistent-hint
          return-object
          single-line
          :rules="[v => !!v || 'Select An Exam']"
        ></v-select>

        <v-spacer></v-spacer>
        <confirm-dia
          :options="sendSmsOptions"
          outlined
          :icon="true"
          btnIconName="mdi-arrow-top-right-thin-circle-outline"
          btncolor="success"
          iconClass="pa-1"
          @success="sendSms"
        />
      </v-toolbar>
    </v-form>
    <v-data-table
      :headers="headers"
      :items="displayeditems"
      :search="search"
      :sort-by="sortcol"
      :sort-desc="dsec"
    >
      <template v-slot:[`item.mark`]="props">
        <v-edit-dialog
          :return-value.sync="props.item.mark"
          large
          persistent
          @save="save({ roll: props.item.roll, mark: props.item.mark })"
          >{{ props.item.mark }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.mark"
              label="Edit"
              single-line
              counter
              autofocus
              :rules="[
                v => !!v || 'Mark is required',
                t =>
                  Number(t) < Number(options.exam.fmark) ||
                  'Mark should be less than full mark'
              ]"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ConfirmDia from "../ConfirmDia.vue";
export default {
  components: { ConfirmDia },
  data() {
    return {
      sendSmsOptions: {
        title: "Warning!",
        text: "Send All Results for This Exam ?",
        agreeText: "SEND",
        btnText: "SEND RESULTS"
      },
      valid: false,
      dialog: false,
      search: "",
      sortcol: "percent",
      dsec: true,
      options: {
        batch: "",
        exam: ""
      },
      exams: [],
      displayeditems: [],
      headers: [
        { text: "# ID", value: "id", align: "center" },
        { text: "ROLL", value: "roll", align: "center" },
        { text: "NAME", value: "name", align: "center" },
        { text: "PERCENT", value: "percent", align: "center" },
        { text: "MARK", value: "mark", align: "center" }
      ]
    };
  },
  computed: {
    batches() {
      return this.$store.state.batch.batches;
    }
  },
  watch: {
    "options.batch": function(val) {
      this.exams = this.batches.find(x => x.id == val.id).exams;
    },
    "options.exam": function(val) {
      let batchid = this.options.batch.id;
      let examid = val.examid;
      let res = this.$store.state.result.results.filter(
        x =>
          x.batchid == batchid && x.result.find(y => y.examid == examid) != null
      );
      const ret = res
        .map(v => ({
          roll: v.roll,
          name: v.name,
          mark: v.result.find(x => x.examid === examid)?.mark || 0,
          percent: 0,
          id: 0
        }))
        .map(v => ({
          ...v,
          percent: Math.round((v.mark / this.options.exam.fmark) * 100)
        }))
        .sort((a, b) => b.percent - a.percent)
        .map((item, index) => ({
          ...item,
          id: index + 1,
        }));
      this.displayeditems = ret;
    }
  },
  methods: {
    uploadsheet() {
      if (this.validate()) {
        this.$emit("upload", this.options);
      }
    },
    open() {},
    cancel() {},
    close() {},
    validate() {
      let valid = this.$refs.form.validate();
      if (valid && this.options.exam != "" && this.options.batch != "") {
        return true;
      } else {
        return false;
      }
    },
    save(item) {
      if (item.mark != null || item.mark != "") {
        let data = {
          roll: item.roll,
          res: {
            examid: this.options.exam.examid,
            mark: Number(item.mark)
          }
        };
        this.$store.dispatch("result/updateResult", data);
        this.displayeditems.find(x => x.roll == item.roll).percent =
          Math.round(
            (Number(item.mark) / Number(this.options.exam.fmark)) * 100
          ) + " %";
        console.log(item);
      }
    },
    sendSms() {
      let info = {
        batchid: this.options.batch.id,
        examid: this.options.exam.examid,
        examname: this.options.exam.examname,
        fullmark: this.options.exam.fmark,
        brand: this.$store.state.settings.brand
      };
      this.validate() && this.$store.dispatch("message/sendResult", info);
    }
  }
};
</script>
