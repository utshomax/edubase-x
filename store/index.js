export const state = () => ({
  hassms: true,
  settings: {},
  notices: []
});
export const mutations = {
  TOGGLE_HASSMS(state, value) {
    state.hassms = value;
  },
  SET_SETTINGS(state, payload) {
    state.settings = payload;
  },
  SET_NOTICES(state, payload) {
    state.notices = payload;
  }
};
export const actions = {
  async getSettings({ commit }) {
    let { status, data } = await this.$api.settings.getSettings();
    if (status == 200) {
      commit("SET_SETTINGS", data);
    }
  },
  async getAppNotice({ commit }) {
    const { status, data } = await this.$api.settings.getAppNotice();
    if (status == 200) {
      commit("SET_NOTICES", data);
    }
  }
};

export const getters = {
  getSmsCount: state => {
    let usersms = state.message.messages.reduce((n, { count }) => n + count, 0);
    let systemsms =
      state.payment.payments.length + state.student.students.length;
    return usersms + systemsms;
  },
  highLightedNotice: state => {
    let notice = state.notices.filter(x => x.highlight == true);
    return notice;
  }
};
