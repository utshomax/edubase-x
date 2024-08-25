export default axios =>({
    history(){
        return axios.get("api/getHistory")
    },
    pay(payment){
        return axios.post('api/pay',payment)
    },
})