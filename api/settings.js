export default axios => ({
  getSettings() {
    return axios.get(`api/settings`);
  },
  getAppNotice() {
    return axios.get(`api/notice`);
  }
});
