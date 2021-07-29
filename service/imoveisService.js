const axios = require('axios');
module.exports = {
    buscaParametrizada(token,params) {
      return axios.get(process.env.VUE_APP_SERVER_URI+'/imoveis/getAllImoveis', {
          params:params,
          headers:{
              authorization: token
          }
      })
  },

    buscar(token,params) {
        var postData = {params}
        return axios.post(process.env.VUE_APP_SERVER_URI+'/imoveisHec/getAllImoveis',
          JSON.stringify(postData), 
            {withCredentials: false,
              headers: {
                'Content-Type': 'application/json',
                'authorization': token
              },
            }
          );
      }, 

    getImoveisByFiltro(token, params) {
      var postData = {params}
      return axios.post(process.env.VUE_APP_SERVER_URI+'/imoveisHec/getImoveisList',
      JSON.stringify(postData), 
        {withCredentials: false,
          headers: {
            'Content-Type': 'application/json',
            'authorization': token
          },
        }
      );
    },

    getImoveisByIdImovel(token,codigo_imovel){
        return axios.get(process.env.VUE_APP_SERVER_URI+'/imoveis/getImoveisByIdImovel', {
            params: {
                codigo_imovel: codigo_imovel
            },
            headers:{
                authorization: token
            }
        })
    },
    deleteImovel(token, codigo_imovel) {
      return axios.get(process.env.VUE_APP_SERVER_URI+'/imoveis/deleteImovel', {
          params: {
              codigo_imovel: codigo_imovel
          },
          headers:{
              authorization: token
          }
      })
    }

}
