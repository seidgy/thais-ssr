import axios from 'axios'

export class BairroService  {
    async buscar(token) {
        return axios.get(process.env.VUE_APP_SERVER_URI+'/bairros/getAllBairros',{
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
    }

    async getBairro(token, ra) {
        return axios.get(process.env.VUE_APP_SERVER_URI+'/bairros/getBairro?ra='+ra,
            {
                headers: { 
                    'authorization': token
                }
            },
        );
    }

    async saveBairro(token, params) {
        return axios.post(process.env.VUE_APP_SERVER_URI+'/bairros/saveBairro',
            { params: params },
            {
                headers: { 
                    'authorization': token
                }
            }
        );
    }
}