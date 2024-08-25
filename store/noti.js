export const state =() =>({
    noti:[],
})

export const mutations ={
    SET_NOTI(state,noti){
        state.noti = noti
    },
    ADD_NOTI(state,noti){
        state.noti.push(noti)
    },
    UP_NOTI(state,data){
        state.noti[state.noti.findIndex(x=> x.id == data.id)] = data
        state.noti = [...state.noti]
    }
}
export const actions={
    async getAllNoti({commit}){
        let {data} = await this.$api.noti.all()
        commit('SET_NOTI',data)
        return 'ok'
    },
    async addNoti({commit},noti){
        let {status,data} = await this.$api.noti.send(noti)
        if(status==200){
            commit('ADD_NOTI',data)
        }
    },
    async makedis({commit,dispatch},item){
        let {status,data} = await this.$api.noti.makedis(item)
        if(status==200){
            if(data.hasOwnProperty('paydata')){
                commit('UP_NOTI',data.notidata)
                dispatch('payment/payformNoti',data.paydata,{ root: true })
            }
            else{
                commit('UP_NOTI',data) 
            }
        } 
    }
}


//Getters
export const getters ={
    getUpperNoti:(state)=>{
        return state.noti.filter(x=> x.type == "payment").sort( (a,b) => b.id - a.id).slice(0, 20);
    },
    getPending:(state)=>{
        return state.noti.filter(x=> x.type == "payment" && x.status == 'pending').length
    }
}