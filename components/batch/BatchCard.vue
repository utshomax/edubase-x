<template>
  <v-card class="mb-2">
    <v-card-title>
      <span> {{ batch.name }}</span>
      <v-spacer></v-spacer>
      <confirm-dia
        :icon="true"
        :onlyicon="true"
        :btncolor="'dark'"
        btnIconName="mdi-delete"
        :options="{
          text: `All of your data related to this batch will be lost ! Do you want to Delete Batch '${batch.name}' ?`,
          ...deletebatchOptions
        }"
        :disabled="deleteText != $auth.user.password"
        @success="deletebatch(batch)"
      >
        <template v-slot:inputslot>
          <v-text-field
            v-model="deleteText"
            label="Your Password"
            outlined
            class="mx-3"
          ></v-text-field>
        </template>
      </confirm-dia>
    </v-card-title>
    <v-card-subtitle>
      {{ batch.startdate }}
    </v-card-subtitle>
    <v-card-actions class="pa-1 ma-0">
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <confirm-dia
        text
        :options="addMonthOptions"
        @success="addmonth(batch.id)"
      />
      <add-exam-dia @submit="addExam(batch.id, $event)" />
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          ID:{{ batch.id ? batch.id : "peinding" }} -- Current Date:
          {{ batch.currentdate }}<br />
          Total Students: {{ getStudentByBatchId(batch.id) }}, Addmission Fee:
          {{ batch.admissionfee }} -- Fee: {{ batch.fee }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import AddExamDia from "./AddExamDia.vue";
import ConfirmDia from "~/components/ConfirmDia.vue";
export default {
  components: {
    ConfirmDia,
    AddExamDia
  },
  data: () => ({
    show: false,
    addMonthOptions: {
      title: "Warning!",
      text: "Do you want to Add One Month To This Batch?",
      agreeText: "Add",
      btnText: "ADD MONTH"
    },
    deletebatchOptions: {
      title: "Be Careful !",
      agreeText: "Delete"
    },
    deleteText: ""
  }),
  props: {
    batch: {
      type: Object,
      default: () => ({
        name: "NO BATCH AVILABLE",
        date: "NA"
      })
    }
  },
  methods: {
    deletebatch(batch) {
      this.$store.dispatch("batch/deleteBatch", batch);
    },
    addmonth(batchid) {
      console.log(batchid);
      this.$store.dispatch("batch/addMonth", batchid);
      //this.$nuxt.$emit('toast',{type:'error',msg:'ADDING NEW MONTH - CONECTING TO API REQUIRED!'})
    },
    addExam(id, data) {
      this.$store.dispatch("batch/addExam", { id: id, exam: data });
    },
    getStudentByBatchId(id) {
      return this.$store.getters["student/getStudentByBatchId"](id);
    }
  }
};
</script>

<style>
.dlticon {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
