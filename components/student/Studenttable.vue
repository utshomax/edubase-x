<template>
  <div>
    <v-toolbar color="toolbar" flat>
      <v-toolbar-title>STUDENTS</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        solo
        dense
        style="max-width:300px;"
        class="mr-3"
        single-line
        hide-details
      ></v-text-field>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            :disabled="!$store.state.hassms"
            color="success"
            text
            dark
            v-bind="attrs"
            v-on="on"
          >
            New Student<v-icon class="ml-1">mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Student name"
                      :rules="[v => !!v || 'Student Name is required']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="selectedBatch"
                      hint="Select A Batch"
                      :items="batchoptions"
                      item-text="name"
                      item-value="id"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                      :rules="[v => !!v || 'Batch Name is required']"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model.trim="editedItem.phone_no"
                      label="Primary Number"
                      type="number"
                      :rules="[v => !!v || 'Primary Number is required']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      v-model="editedItem.f_name"
                      label="Secondary Number (optional)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <date-picker label="Birth Date" v-model="editedItem.dob" />
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.address"
                      label="Address"
                      :rules="[v => !!v || 'Address Name is required']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.m_name"
                      :rules="[v => !!v || 'School Name is required']"
                      label="School Name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to delete this item?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <div class="datatableclass pt-4">
      <v-data-table
        :headers="headers"
        :items="students"
        sort-by="calories"
        class="elevation-1 pa-1"
        :search="search"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          NO DATA AVILABLE !
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import DatePicker from "../DatePicker.vue";
export default {
  components: { DatePicker },
  data: () => ({
    valid: false,
    dialog: false,
    dialogDelete: false,
    search: "",
    selectedBatch: null,
    headers: [
      { text: "ROLL", value: "roll" },
      { text: "NAME", value: "name" },
      { text: "BATCH", value: "batchname" },
      { text: "PHONE", value: "phone_no" },
      { text: "ADDRESS", value: "address", width: "20%" },
      { text: "ACTIONS", value: "actions", sortable: false }
    ],
    tobeDeleted: null,
    editedIndex: -1,
    editedItem: {
      name: "",
      batchname: "",
      phone_no: "",
      address: "",
      f_name: "",
      m_name: "",
      dob: "",
      due: 0
    },
    defaultItem: {
      name: "",
      batchname: "",
      phone_no: "",
      address: "",
      f_name: "",
      m_name: "",
      dob: "",
      due: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Student" : "Edit Student";
    },
    batchoptions() {
      return this.$store.state.batch.batches;
    },
    students() {
      return this.$store.state.student.students;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    selectedBatch(val) {
      if (val) {
        this.editedItem.batchid = val.id;
        this.editedItem.batchname = val.name;
        this.editedItem.due = Number(val.fee) + Number(val.admissionfee);
      }
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.selectedBatch = { id: item.batchid, name: item.batchname };
      this.dialog = true;
    },

    deleteItem(item) {
      this.tobeDeleted = { ...item };
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("student/deleteStudent", this.tobeDeleted);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.valid = false;
      this.$refs.form.reset();
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        (this.selectedBatch = null), (this.editedIndex = -1);
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.tobeDeleted = null;
      });
    },

    save() {
      let valid = this.$refs.form.validate();
      if (valid) {
        if (this.editedIndex > -1) {
          const editedObject = {};
          delete Object.assign(editedObject, this.editedItem, {
            r_id: this.editedItem._id
          })._id;
          this.$store.dispatch("student/updateStudent", {
            index: this.editedIndex,
            student: editedObject
          });
        } else {
          let pin = this.makepin(4);
          let data = {
            ...this.editedItem,
            password: pin,
            brand: this.$store.state.settings.brand
          };
          this.$store.dispatch("student/addStudent", data);
        }
        this.close();
      }
    },
    makepin(length) {
      var result = "";
      var characters = "0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }
  }
};
</script>
<style>
.datatableclass {
  height: 70vh;
  overflow-y: auto;
}
</style>
