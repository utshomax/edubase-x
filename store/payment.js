export const state =() =>({
    payments:[],
})

export const mutations ={
    SET_PAYMENTS(state,payments){
        state.payments = payments
    },
    ADD_PAYMENT(state,payment){
        state.payments.push(payment)
    },
}
export const actions={
    async getPaymentHistory({commit}){
        let {data} = await this.$api.payment.history()
        commit('SET_PAYMENTS',data)
    },
    async pay({commit,dispatch},payment){
        let {status,data} = await this.$api.payment.pay(payment)
        if(status==200){
            commit('ADD_PAYMENT',data)
            dispatch('student/updateDue',data,{ root: true })
        }
    },
    async payformNoti({commit,dispatch},data){
        commit('ADD_PAYMENT',data)
        dispatch('student/updateDue',data,{ root: true })
    }
}


//Getters
export const getters ={
    getPaymentbyid:(state)=>(id)=>{
        return state.payments.find(x=> x.id == id)
    },
    getAllPayment:(state)=>{
        return state.payments
    },
    getTotalPaid:(state)=>{
        return state.payments.reduce((n, {paid}) => n + paid, 0)
    },
    getHistoryByDate:(state)=>(val)=>{
        if(!val.length>0){
            return state.payments
        }
        let ed  =new Date(val[1]).getTime()
        let sd  = new Date(val[0]).getTime()
        let res = state.payments.filter(d => {var time = new Date(d.date).getTime();
                                return (sd < time && time < ed);
                               });                    
        return res
    }
}