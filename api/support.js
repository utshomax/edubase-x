export default axios =>({
  sendMessage(){
      return axios.post("api/support")
  },
})