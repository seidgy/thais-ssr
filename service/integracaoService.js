const axios = require('axios')
module.exports = {
    getAgendamentos(token) {
      return axios.get(process.env.VUE_APP_SERVER_URI+'/admin/integracao/getAgendamentos', {
          headers:{
              authorization: token
          }
      })
    },

    saveAgendamento(token,ag) {
        return axios.post(process.env.VUE_APP_SERVER_URI+'/admin/integracao/saveAgendamento', {
            params:ag,
            headers:{
                authorization: token
            }
        })
    },

    validaTokenAdmin(token,token_admin){
        return axios.post(process.env.VUE_APP_SERVER_URI+'/admin/login/validaToken', {
            params:token_admin,
            headers:{
                authorization: token
            }
        })
    }

}
