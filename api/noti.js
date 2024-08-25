export default axios =>({
    all(){
        return axios.get("api/noti")
    },
    send(noti){
        return axios.post('api/noti',{...noti})
    },
    makedis(item){
        return axios.get(`api/noti/makedis/${item.id}/${item.state}/${item.ref}`)
    }
})