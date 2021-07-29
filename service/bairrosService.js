const axios = require('axios')
module.exports = {
    buscar(token) {
        return axios.get(process.env.VUE_APP_SERVER_URI+'/bairros/getAllBairros',{
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
        });
    }, 

    getBairro(token, ra) {
        return axios.get(process.env.VUE_APP_SERVER_URI+'/bairros/getBairro?ra='+ra,
            {
                headers: { 
                    'authorization': token
                }
            },
        );
    },

    saveBairro(token, params) {
        return axios.post(process.env.VUE_APP_SERVER_URI+'/bairros/saveBairro',
            { params: params },
            {
                headers: { 
                    'authorization': token
                }
            }
        );
    },
}
