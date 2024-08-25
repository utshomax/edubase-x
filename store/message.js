export const state =() =>({
    messages:[],
})

export const mutations ={
    SET_MESSAGES(state,messages){
        state.messages = messages
    },
    ADD_MESSAGE(state,message){
        state.messages.push(message)
    },
}
export const actions={
    async getHistory({commit}){
        let {data} = await this.$api.message.history()
        commit('SET_MESSAGES',data)
    },
    async sendResult({commit},info){
        let {status,data} = await this.$api.message.sendResult(info)
        if(status==200){
            commit('ADD_MESSAGE',data)
        }
    },
    async sendSms({commit},opt){
        let {status,data} = await this.$api.message.sendSms(opt)
        if(status==200){
            commit('ADD_MESSAGE',data)
        }
    },
    async notifyAll({commit}){
        let {status,data} = await this.$api.message.notifyAll()
        if(status==200){
            commit('ADD_MESSAGE',data)
        }
    },
}


//Getters
export const getters ={
    getTotalMsg:(state)=>{
        return state.messages.reduce((n, {count}) => n + count, 0)
    }
}