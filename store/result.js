export const state =() =>({
    results:[],
})

export const mutations ={
    SET_RESULTS(state,results){
        state.results = results
    },
    ADD_RESULT(state,pack){
        console.log(pack)
        pack.data.forEach(res => {
            console.log(res)
            state.results.find(x=> x.roll == res.roll).result.push({examid:pack.info.examid,mark:Number(res.mark)})
        });
    },
    REMOVE_RESULT(state,student){
        state.results.splice(state.results.indexOf(student), 1)
    },
    UPDATE_RESULT(state,{roll,data}){
        let index = state.results.findIndex(x=>x.roll == roll)
        Object.assign( state.results[index], data);
    },
}
export const actions={
    async getAllResult({commit}){
        let {data} = await this.$api.result.all()
        commit('SET_RESULTS',data)
    },
    async addResult({commit},pack){
        let {status,data} = await this.$api.result.addResult({...pack})
        if(status==200){
            commit('ADD_RESULT',pack)
            return 'ok'
        }
        else{
            return 'error'
        }
    },
    async updateResult({commit},editedData){
        console.log(editedData)
        let {status,data} = await this.$api.result.update(editedData.roll,editedData.res)
        console.log(data)
        if(status==200 && data!=null){
            commit('UPDATE_RESULT',{roll:editedData.roll,data:data})
        }
    },
   
}


//Getters
// export const getters ={
//     getStudentbyid:(state)=>(id)=>{
//         return state.results.find(x=> x.id == id)
//     },
//     getAllStudent:(state)=>{
//         return state.results
//     }
// }