<template>
  <div class="main">
        
        <p v-if="carregando">
        Carregando..
        </p>
        
        
        <div v-else class="countainer fluid col-md-8 offset-md-2 card">
            <div class="card-body">
                <label>Lista de bairros</label>
                <table class="table col-md-12">
                    <thead>
                        <th>RA</th>
                        <th>Bairro/Cidade</th>
                        <th>Delete/Edit</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>RA001</td>
                            <td>Lago sul</td>
                            <td>Editar | Excluir</td>
                        </tr>
                        <tr>
                            <td>RA002</td>
                            <td>Lago norte</td>
                            <td>Editar | Excluir</td>
                        </tr>
                    </tbody>
                </table>
                
                <br>
                <hr>
                Formulario
                <form id="formularioBairro">
                    <div class="col-md-4">
                        
                    </div>
                </form>
            </div>
        </div>
        <br>
        <br>
        <br>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ConfigPage',
  data() {
    return {
      bairros:{},
      carregando: false
    }
  },
  methods: {
    async getImovel(codigo_imovel){
      this.carregando = true
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')

      this.$imoveis.getImoveisByIdImovel(token,codigo_imovel).then(ret => {
        this.dadosImovel = ret.data
        
        // axios.get(
        //     'https://www.cepaberto.com/api/v3/cep?cep='+this.imovel.cep,
        //     {headers: {'Authorization': 'Token token=160f2bf9d3632035f342253f6c23c8ef'}}
        //     )
        //   .then(response => console.log(response))
        //   .catch(error => console.log(error))
      }).catch(err=>{
        console.log('ERRO -> ',err)
      }).finally(()=> this.carregando = false)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>