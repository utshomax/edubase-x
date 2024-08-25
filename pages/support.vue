<template>
  <v-container fluid>
    <v-row class="child-flex">
      <v-toolbar>
        <v-btn icon class="hidden-xs-only">
          <v-icon>mdi-account-box-outline</v-icon>
        </v-btn>
        <v-toolbar-title class="text-uppercase">{{
          acc.brand
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="hidden-xs-only">
          <v-icon>mdi-credit-card-outline</v-icon>
        </v-btn>
        Due : <span class="text--disabled pl-2"> Will be updated soon !</span>
      </v-toolbar>
    </v-row>

    <v-row>
      <v-col cols="12">
        <common-table
          :items="acc.payment"
          :title="paymentinit.title"
          :headers="paymentinit.headers"
          :itemsPerPage="5"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card class="support-card" max-height="400px">
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-card-title class="support-card-title">
                  <v-icon class="support-card-title-icon"
                    >mdi-account-box-outline</v-icon
                  >
                  <span class="">Inbox</span>
                </v-card-title>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-expansion-panels class="elevation-0">
                  <v-expansion-panel
                    v-for="message in messages"
                    :key="message.id"
                  >
                    <v-expansion-panel-header disable-icon-rotate>
                      {{ message.sub }}
                      <template v-slot:actions>
                        <v-icon color="warning">
                          mdi-mail
                        </v-icon>
                      </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      {{ message.msg }}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <faq :items="faq" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommonTable from "~/components/CommonTable.vue";
import Faq from "~/components/faq.vue";
export default {
  data() {
    return {
      paymentinit: {
        title: "Billigs",
        headers: [
          {
            text: "Date",
            align: "center",
            sortable: false
          },
          {
            text: "Amount",
            align: "center"
          },
          {
            text: "Ref",
            align: "center"
          },
          {
            text: "Mode",
            align: "center"
          },
          {
            text: "Transaction ID",
            align: "center"
          },
          {
            text: "Status",
            align: "center"
          }
        ]
      },
      faq: [
        {
          id: 1,
          title: "How do I get started?",
          content:
            "You can follow the video tutorial on the website to get started. If you have any questions, feel free to contact us."
        },
        {
          id: 2,
          title: "I've only sent x message. Why the system showing y ?",
          content:
            "Every sms counts ! This counts all sms including those sent by the system like new student creation sms or payment notification sms. You can check the total sms sent by the system in the dashboard."
        }
      ]
    };
  },
  components: {
    Faq,
    CommonTable
  },
  computed: {
    acc() {
      return this.$store.state.settings;
    },
    messages() {
      return this.acc.support;
    }
  },
  mounted() {
    this.$store.dispatch("getSettings");
  }
};
</script>

<style></style>
