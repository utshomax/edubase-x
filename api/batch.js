export default axios =>({
    all(){
        return axios.get("api/batch")
    },
    add(batch){
        return axios.post('api/batch',batch)
    },
    delete(id){
        return axios.delete(`api/batch/${id}`)
    },
    addMonth(id){
        return axios.get(`api/addMonth/${id}`)
    },
    addExam(id,examdata){
        return axios.post('api/addExam',{
            batchid:id,
            exam:examdata
        })
    }
})