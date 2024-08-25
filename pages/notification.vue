<template>
  <div>
    <v-toolbar color="toolbar" flat>
      <v-toolbar-title>NOTIFICATION</v-toolbar-title>
      <v-select
        v-model="selectedType"
        solo
        :items="f_types"
        label="Type"
        single-line
        dense
        class="pt-6 ml-2"
        style="max-width:200px"
        :rules="[v => !!v || 'Required']"
      ></v-select>
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
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" icon @click="refatch"
            ><v-icon>mdi-refresh-circle</v-icon></v-btn
          >
        </template>
        <span>Check For New Notification</span>
      </v-tooltip>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="success" text dark v-bind="attrs" v-on="on">
            Send Notification<v-icon class="ml-1">mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">New Notification</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="editedItem.type"
                      :items="types"
                      label="Select Type"
                      single-line
                      :rules="[v => !!v || 'Type is required']"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-select
                      v-model="selectedBatch"
                      hint="Select A Batch"
                      :items="batchoptions"
                      item-text="name"
                      item-value="batchid"
                      label="Select"
                      persistent-hint
                      return-object
                      single-line
                      :rules="[v => !!v || 'Batch Name is required']"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      solo
                      label="Put links at very bottom. Use ' ~ '  ex: ~https://google.com "
                      v-model="editedItem.msg"
                      :rules="[v => !!v || 'Message is required']"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
            <v-btn color="blue darken-1" text @click="save"> SEND </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <div class="datatableclass pt-4">
      <v-data-table
        :headers="headers"
        :items="noti"
        sort-by="id"
        :sort-desc="true"
        class="elevation-1 pa-1"
        :search="search"
      >
        <template v-slot:item="{ item }">
          <tr class="text-center">
            <td class="truncate">{{ item.id }}</td>
            <td class="font-weight-black">
              <v-chip class="ma-2" label outlined>
                {{ item.type.toUpperCase() }}
              </v-chip>
            </td>
            <td>{{ item.isAdmin ? "ADMIN" : item.batchname.toUpperCase() }}</td>
            <td class="text-truncate" style="max-width:500px">
              {{ item.msg }}
            </td>
            <td>
              <v-chip
                v-if="item.type == 'payment'"
                class="ma-2 text-caption"
                label
                outlined
                small
                :color="
                  item.status == 'pending'
                    ? 'orange lighten-2'
                    : item.status == 'aproved'
                    ? 'success'
                    : 'error'
                "
              >
                {{ item.status.toUpperCase() }}
              </v-chip>
            </td>
            <td>
              <div v-if="item.type == 'payment' && item.status != 'aproved'">
                <v-icon
                  @click="reject(item)"
                  :disabled="item.status == 'rejected'"
                >
                  mdi-close-circle-outline
                </v-icon>
                <aprove-dia :item="item" @success="aprove(item)" />
              </div>
              <div v-else>
                <aprove-dia :item="item" :showOnly="true" />
              </div>
            </td>
          </tr>
        </template>
        <template v-slot:no-data>
          NO NOTIFICATION AVILABLE !
        </template>
      </v-data-table>
    </div>
  </div>
</template>
<script>
import AproveDia from "~/components/noti/AproveDia.vue";
export default {
  components: { AproveDia },
  data: () => ({
    valid: false,
    dialog: false,
    search: "",
    selectedBatch: null,
    selectedType: "payment",
    f_types: ["payment", "notice", "resource"],
    headers: [
      { text: "ID", value: "id", align: "center" },
      { text: "TYPE", value: "type", align: "center" },
      { text: "TO", value: "batchname", align: "center" },
      { text: "MESSAGE", value: "msg", width: "50%", align: "center" },
      { text: "REF", value: "aproved", align: "center" },
      { text: "ACTIONS", value: "actions", sortable: false, align: "center" }
    ],
    editedItem: {
      type: "",
      msg: "",
      isStudent: false
    },
    types: ["notice", "resource"]
  }),
  created() {
    let vm = this;
    this.$nuxt.$on("openNoti", function(e) {
      vm.setSearch(e);
    });
  },
  computed: {
    batchoptions() {
      return this.$store.state.batch.batches;
    },
    noti() {
      return this.$store.state.noti.noti.filter(
        r => r.type == this.selectedType
      );
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    selectedBatch(val) {
      this.editedItem.batchid = val.id;
      this.editedItem.batchname = val.name;
    }
  },

  methods: {
    close() {
      this.dialog = false;
    },
    refatch() {
      this.$store.dispatch("noti/getAllNoti");
    },
    save() {
      let valid = this.$refs.form.validate();
      if (valid) {
        let i_data = {
          date: new Date().toLocaleString().split(",")[0],
          senderid: this.$auth.user.id,
          sendername: this.$auth.user.name,
          isAdmin: true,
          status: "sent"
        };
        let data = { ...this.editedItem, ...i_data };
        // console.log(data)
        this.$store.dispatch("noti/addNoti", data);
        this.close();
      }
    },
    aprove(item) {
      let id = item.id;
      this.$store.dispatch("noti/makedis", {
        id: id,
        state: "aproved",
        ref: this.$auth.user.id + "-on."
      });
    },
    reject(item) {
      let id = item.id;
      this.$store.dispatch("noti/makedis", {
        id: id,
        state: "rejected",
        ref: this.$auth.user.id
      });
    },
    setSearch(e) {
      this.search = e.toString();
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
