export default axios =>({
    all(){
        return axios.get("api/getAllResult")
    },
    addResult(pack){
        return axios.put('api/addResult',pack)
    },
    update(roll,res){
        return axios.put(`api/upResult/${roll}`,res)
    }
})