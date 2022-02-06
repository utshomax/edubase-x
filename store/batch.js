export const state =() =>({
    batches:[],
    darkmode:false,
})

export const mutations ={
    SET_BATCHES(state,batches){
        state.batches = batches
    },
    ADD_BATCH(state,batch){
        state.batches.push(batch)
    },
    REMOVE_BATCH(state,batch){
        state.batches.splice(state.batches.indexOf(batch), 1)
    },
    ADD_EXAM(state,{id,exam}){
        console.log(id,exam)
        state.batches.find(x=> x.id == id).exams.push(exam)
    },
    TOGGLE_MODE(state,mode){
        state.darkmode = mode
    }
}
export const actions={
    async getBatches({commit}){
        let {data} = await this.$api.batch.all()
        commit('SET_BATCHES',data)
    },
    async addBatch({commit},batch){
        let {status,data} = await this.$api.batch.add(batch)
        if(status==200){
            commit('ADD_BATCH',data)
        }
    },
    async deleteBatch({commit},batch){
        let {status,data} = await this.$api.batch.delete(batch.id)
        if(status==200){
            commit('REMOVE_BATCH',batch)
        }
    },
    async addExam({commit},{id,exam}){
        let {status,data} = await this.$api.batch.addExam(id,exam)
        if(status==200){
            commit('ADD_EXAM',{id:id,exam:data.pop()})
        }
    },
    async addMonth({dispatch},id){
        let {status,data} = await this.$api.batch.addMonth(id)
        if(status==200 && data.status==1){
            dispatch('getBatches')
            dispatch('student/getStudents',null,{root:true})
        }
    }
}


//Getters
export const getters ={
    getBatchbyid:(state)=>(id)=>{
        return state.batches.find(x=> x.id == id)
    },
    getAllBatch:(state)=>{
        return state.batches
    }
}