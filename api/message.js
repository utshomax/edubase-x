export default axios =>({
    sendResult(data){
        return axios.post("api/smsRes",data)
    },
    history(){
        return axios.get('api/getSms')
    },
    sendSms(data){
        if(data.type=='all'){
            return axios.post("api/smsToall",data.data)
        }
        if(data.type=='batch'){
            return axios.post("api/smsTobatch",data.data)
        }
        if(data.type=='student'){
            return axios.post("api/smsTostudent",data.data)
        }
    },
    notifyAll(){
        return axios.get('api/notifyAll')
    }
})