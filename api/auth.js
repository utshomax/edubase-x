export default axios =>({
    login(user){
        return axios.get(`api/authUser?t_id=${user.t_id}&password=${user.password}`)
    },
})