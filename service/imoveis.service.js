import axios from 'axios'

export class ImoveiService {
  async buscaParametrizada(token,params) {
    return axios.get(process.env.VUE_APP_SERVER_URI+'/imoveis/getAllImoveis', {
        params:params,
        headers:{
            authorization: token
        }
    })
  }

  async buscar(token,params) {
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
  }

  async getImoveisByFiltro(token, params) {
    console.log('AQUI')
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
  }

  async getImoveisByIdImovel(token,codigo_imovel){
      return axios.get(process.env.VUE_APP_SERVER_URI+'/imoveis/getImoveisByIdImovel', {
          params: {
              codigo_imovel: codigo_imovel
          },
          headers:{
              authorization: token
          }
      })
  }

  async deleteImovel(token, codigo_imovel) {
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