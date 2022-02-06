export default axios =>({
    all(){
        return axios.get("api/getAllStudent")
    },
    add(student){
        return axios.post('api/addStudent',student)
    },
    delete(id){
        return axios.delete(`api/deleteStudent/${id}`)
    },
    update(student){
        return axios.put('api/updateStudent',student)
    }
})