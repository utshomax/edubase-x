<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary lighten-2"
          text
          v-bind="attrs"
          v-on="on"
        >
          ADD EXAM
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Exam</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Exam Topic *"
                  required
                  :rules="[(v) => !!v || 'Exam Name is required']"
                  v-model="exam.examname"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
              >
                <v-text-field
                  label="Full Mark"
                  required
                  :rules="[(v) => !!v || ' Required']"
                  v-model.number="exam.fmark"
                ></v-text-field>
              </v-col>
            </v-row>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="emitnewexamdata"
          >
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
  export default {
    data: () => ({
      valid:false,
      dialog: false,
      exam:{
          examname:'',
          fmark:null,
      }
    }),
    methods:{
        emitnewexamdata(){
            let v = this.$refs.form.validate()
            if(v){
                this.$emit('submit',this.exam)
                this.dialog = false
            }
        }
    }
  }
</script>