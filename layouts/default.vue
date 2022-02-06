<template>
  <v-app style="max-height:100vh; overflow:hidden">
    <v-navigation-drawer
      :mini-variant="miniVariant"
      permanent
      app
      mini-variant-width="70"
      color="nav"
    >
      <v-list-item>
        <v-list-item-content>
          <div v-if="!miniVariant">
            <v-list-item-title class="text-h6 white--text">
              ADMIN
            </v-list-item-title>
            <v-list-item-subtitle class="text-caption white--text">
              {{ time }}
            </v-list-item-subtitle>
          </div>
          <v-img v-else src="images/unicorn.png" width="100%"></v-img>
        </v-list-item-content>
      </v-list-item>
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="navicon">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app color="batchCol">
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <noti-menu />
      <mode-switch class="mr-3" />
      <v-btn small>
        <v-icon small>mdi-account</v-icon>
        <span class="ml-2">{{ this.$auth.user.name }}</span>
      </v-btn>
      <v-btn icon @click="logout()"
        ><v-icon class="pa-3">mdi-logout-variant</v-icon></v-btn
      >
    </v-app-bar>
    <v-main class="main">
      <v-container
        :fluid="$vuetify.breakpoint.lgAndDown"
        style="overflow:auto;"
      >
        <v-snackbar
          bottom
          right
          color="batchCol grey--text"
          v-model="snackbar"
          :timeout="type == 'loading' ? '-1' : '6000'"
        >
          <v-icon v-if="type == 'success'" color="success" class="mr-1"
            >mdi-check-circle-outline</v-icon
          >
          <v-icon v-if="type == 'error'" color="error" class="mr-1"
            >mdi-alert-circle-outline</v-icon
          >
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn
              color="pink"
              :loading="type == 'loading'"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              close
            </v-btn>
          </template>
        </v-snackbar>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer class="text-caption grey--text font-weight-bold" app>
      <span>MADVERTLABS &copy; {{ new Date().getFullYear() }}</span>
      <v-spacer></v-spacer>
      <span>v 1.2.0</span>
      <span v-show="false">{{ hassms }}</span>
    </v-footer>
    <div v-for="notice in notices" :key="notice.id">
      <common-dia
        v-if="!notice.isCancelable || (notice.isCancelable && !showed)"
        :cancelable="notice.isCancelable"
        title="Important !"
        :message="notice.msg"
        max_width="500"
        @close="showed = true"
      />
    </div>
    <common-dia
      v-if="!hassms"
      :cancelable="true"
      title="No Message Left !"
      message="You have no message left to send. Please contact us ( 01521530584 ) to buy more."
    />
  </v-app>
</template>

<script>
import CommonDia from "~/components/commonDia.vue";
import ModeSwitch from "~/components/modeSwitch.vue";
import NotiMenu from "~/components/noti/NotiMenu.vue";

export default {
  middleware: ["settings"],
  name: "default",
  components: {
    NotiMenu,
    ModeSwitch,
    CommonDia
  },
  data() {
    return {
      showed: false,
      items: [
        {
          icon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/"
        },
        {
          icon: "mdi-school-outline",
          title: "Student",
          to: "/student"
        },
        {
          icon: "mdi-credit-card-outline",
          title: "Payment",
          to: "/payment"
        },
        {
          icon: "mdi-history",
          title: "History",
          to: "/history"
        },
        {
          icon: "mdi-newspaper-variant-outline",
          title: "Results",
          to: "/result"
        },
        {
          icon: "mdi-message-bulleted",
          title: "Messages",
          to: "/message"
        },
        {
          icon: "mdi-bell",
          title: "Notification",
          to: "/notification"
        },
        {
          icon: "mdi-lifebuoy",
          title: "Support",
          to: "/support"
        }
      ],
      miniVariant: true,
      right: true,
      title: "Edu-base",
      snackbar: false,
      text: `Loading...`,
      type: "",
      devtool: null
    };
  },
  mounted() {
    setTimeout(() => {
      let dark = localStorage.getItem("dark") === "true";

      if (dark != this.$vuetify.theme.dark) {
        this.$vuetify.theme.dark = dark;
      }
    }, 500);
    setTimeout(() => this.initSoket(), 2000);
    //Dispathing Notice getter
    this.$store.dispatch("getAppNotice");
    //Preventing inspection
    if (!this.$store.state.settings.debug) {
      document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
      });
      document.onkeydown = function(e) {
        if (e.ctrlKey && e.shiftKey && e.key == "I") {
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.key == "C") {
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.key == "J") {
          return false;
        }
        if (e.ctrlKey && e.key == "U") {
          return false;
        }
      };
    }
  },
  created() {
    this.$nuxt.$on("toast", ({ type, msg }) => {
      this.text = msg;
      this.type = type;
      this.snackbar = true;
    });
    this.$nuxt.$on("initsocket", () => {
      this.initSoket();
    });
    if (this.$auth.user) {
      let url = this.$config.baseUrl + this.$store.state.settings.cid;
      this.$axios.defaults.baseURL = url;
    } else {
      this.$router.push({ name: "login" });
    }
  },
  computed: {
    time() {
      return new Date().toLocaleString().split(",")[1];
    },
    notices() {
      let notice = this.$store.getters.highLightedNotice;
      return notice;
    },
    hassms() {
      if (
        this.$store.state.settings.msg_left - this.$store.getters.getSmsCount <
        1
      ) {
        this.$store.commit("TOGGLE_HASSMS", false);
        return false;
      } else {
        this.$store.commit("TOGGLE_HASSMS", true);
        return true;
      }
    }
  },
  watch: {
    "this.$auth.user": {
      handler: function(val, old) {
        if (!val) {
          this.$router.push({ name: "login" });
        }
      },
      deep: true
    }
  },
  methods: {
    logout() {
      this.$auth.logout();
      this.$router.push({ name: "login" });
    },
    initSoket() {
      if (this.$auth.user) {
        var vm = this;
        let url = this.$config.baseUrl + this.$store.state.settings.cid;
        let soketurl =
          "wss://" +
          url.split("//")[1] +
          "/api/ws?token=" +
          this.$auth.strategy.token.get().split(" ")[1];
        let socket = new WebSocket(soketurl);
        socket.onmessage = function(event) {
          let { code } = JSON.parse(event.data);
          if (Number(code) == Number(vm.$store.state.settings.code)) {
            vm.$store.dispatch("noti/getAllNoti").then(() => {
              vm.$nuxt.$emit("toast", {
                type: "success",
                msg: "New Paymet Request Received !"
              });
            });
          }
        };
        socket.onopen = function(e) {
          let msg = JSON.stringify({ msg: "JSON MSG" });
          socket.send(msg);
        };
        socket.onclose = function(event) {
          if (event.wasClean) {
            this.text = `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`;
            this.type = "success";
            this.snackbar = true;
          } else {
            this.text = "Real-time connection Interrupted !";
            this.type = "error";
            this.snackbar = true;
          }
        };
        socket.onerror = function(error) {
          this.text = "Real-time connection Interrupted !";
          this.type = "error";
          this.snackbar = true;
        };
      }
    }
  }
};
</script>
<style>
html {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
[class$="--disabled"],
[class*="--disabled "] * {
  color: rgb(116, 116, 116) !important;
}
html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
.v-navigation-drawer__border {
  width: 0px;
}
.main {
  max-height: calc(100vh - 36px);
  overflow: auto;
}
</style>
