export default (context) => {
      context.$axios.onRequest(config =>{
          context.store._vm.$nuxt.$emit('toast',{type:'loading',msg:'Requesting ...'})
      })
      context.$axios.onResponse(res =>{
          if(res.status == 200){
            context.store._vm.$nuxt.$emit('toast',{type:'success',msg:'Success !'})
          }
        })
    context.$axios.onError(error =>{
      if(error.response.status == 401 || error.response.status==403){
        context.$auth.logout()
      }
      context.store._vm.$nuxt.$emit('toast',{type:'error',msg:`Falied ! ${error.message}`})
    })
  }