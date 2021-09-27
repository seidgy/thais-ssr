<template>
  <div class="main row d-flex justify-content-center">
    <div class="container">
      <div class="row">
        <div class="col-3">
          <MenuAdmin />
        </div>
        <div class="col-9">
          <h1 class="form-title">Gerenciar Integração</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Tipo</th>
                <th scope="col">Executar a cada</th>
                <th scope="col">Proxima execução</th>
                <th scope="col">Habilitado?</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="itg in integracao" v-bind:key="itg._id">
                <th scope="row" class="row-title">{{itg.dsc_agendador}}</th>
                <td class="flex">
                  
                  <input type="number" disabled="true" class="form-default__input" v-model="itg.val_periodicidade" />
                  
                  <div class="radio-group">
                    <input id="hora" type="radio" disabled="true" v-model="itg.periodicidade" value="hours" />
                    <label for="hora" class="label-radio" tabindex="0"></label>
                    <label for="hora">Horas</label>
                    
                    <input id="dia" type="radio" disabled="true" v-model="itg.periodicidade" value="d" />
                    <label for="dia" class="label-radio" tabindex="0"></label>
                    <label for="dia">Dias</label>
                  </div>
                </td>
                <td>
                  <input type="datetime-local" disabled="true" v-model="itg.proxima_execucao" class="form-default__input" />
                </td>
                <td>
                  <label>{{itg.habilitado?'Habilitado':'Desabilitado'}}</label>
                  <p>
                    <label class="switch">
                      <input v-model="itg.habilitado" type="checkbox">
                      <span class="slider round"></span>
                    </label>
                  </p>
                </td>
                <td class="flex flex--center">
                  <button v-on:click.prevent="executar(itg)" class="button button--secondary">Executar agora</button>
                  <button v-on:click.prevent="editar(itg)" class="button button--primary">Editar</button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="col-md-12">
            <h1 class="form-title">Logs</h1>
            <hr>
            <p>
              Ultimos Logs da integração
            </p>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="mdlIntegracao" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Integração</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Descrição</label>
                    <input type="text" class="form-default__input" v-model="auxIntegracao.dsc_agendador" />                
                  </div>
                </div>
              </div>
              <div class="row">
              
                <div class="col-md-5">
                  <div class="form-group">
                    <label>Periodicidade</label>
                    <input type="number" class="form-default__input" v-model="auxIntegracao.val_periodicidade" />
                  </div>
                </div>
                <div class="col-md-7">
                  <div class="form-group">
                    <label  class="label-radio">A cada Horas/Dias</label>
                    <div class="radio-group" style="margin-top:15px;">
                      <input id="mdl_hora" type="radio" name="periodicidade" v-model="auxIntegracao.periodicidade" value="hours" />
                      <label for="mdl_hora" class="label-radio" tabindex="0"></label>
                      <label for="mdl_hora">Horas</label>
                      
                      <input id="mdl_dia" type="radio" name="periodicidade" v-model="auxIntegracao.periodicidade" value="d" />
                      <label for="mdl_dia" class="label-radio" tabindex="0"></label>
                      <label for="mdl_dia">Dias</label>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>URL</label>
                    <input type="text" class="form-default__input" v-model="auxIntegracao.url" />                
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8">
                  <div class="form-group">
                    <label>Token</label>
                    <input type="text" class="form-default__input" v-model="auxIntegracao.token" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>{{auxIntegracao.habilitado?'Habilitado':'Desabilitado'}}</label>
                    <p>
                      <label class="switch">
                        <input v-model="auxIntegracao.habilitado" type="checkbox">
                        <span class="slider round"></span>
                      </label>
                    </p>
                  </div>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" :disabled="salvando" v-on:click.prevent="salvar()">{{salvando?'Salvando...':'Salvar'}}</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import MenuAdmin from '../../components/MenuAdmin';

export default {
  name: 'GerenciaIntegracao',
  components: {
    MenuAdmin
  },
  data() {
    return {
      login: null,
      password: null,
      integracao: [],
      salvando: false,
      auxIntegracao: {},
    }
  },
  methods: {
    async getAgendamentos(){
      await this.validaTokenAdmin()

      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')
      this.$integracao.getAgendamentos(token).then(ret => {
        for (let index = 0; index < ret.data.length; index++) {
          ret.data[index].proxima_execucao = this.getDateFormater(ret.data[index].proxima_execucao)
        }
        this.integracao = ret.data

      })
    },
    getDateFormater(data){
      return moment(data,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss')
    },
    editar(inte){
      this.auxIntegracao = JSON.parse(JSON.stringify(inte))
      this.$('#mdlIntegracao').modal('show')
    },
    async salvar(){
      await this.validaTokenAdmin()

      this.salvando = true
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')
      this.$integracao.saveAgendamento(token,this.auxIntegracao).then(ret => {
        this.getAgendamentos()
        this.$toast.info("Dados atualizados com sucesso");
      }).catch(err =>{
        
          this.$toast.error("Erro ao atualizar dados. Err "+err);
      }).finally(ret => {
        this.salvando = false
        this.$('#mdlIntegracao').modal('hide')
      })
    },
    async executar(ag){
      await this.validaTokenAdmin()

      this.salvando = true
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')
      let auxAg = JSON.parse(JSON.stringify(ag))
      
      delete auxAg._id
      auxAg.periodicidade = null
      auxAg.habilitado = true
      auxAg.proxima_execucao = moment().subtract(1,'days').format('YYYY-MM-DDTHH:mm:ss')
      this.$integracao.saveAgendamento(token,auxAg).then(ret => {
        this.getAgendamentos()
        this.$toast("A integração será executada nos proximos 2 minutos");
      }).catch(err =>{
        
          this.$toast.error("Erro ao atualizar dados. Err "+err);
      }).finally(ret => {
        this.salvando = false
        this.$('#mdlIntegracao').modal('hide')
      })
    },
    async validaTokenAdmin(){
      return new Promise(async (resolve, reject) => {
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        this.$integracao.validaTokenAdmin(token, localStorage.getItem('token_admin')).then(()=>{
          resolve('ok')
        }).catch(err =>{
          localStorage.removeItem('token_admin')
          this.$toast("Ops, token invalido!", {
            timeout: 3500,
            type: "error"
          });

          this.$router.push({ name: 'login' })
        })
      })
    },
    validaLogin(){
      if(!localStorage.getItem('token_admin')){
        this.$toast("Ops, primeiro você precisa fazer login!",{
           timeout: 3500,
           type: "info"
         });
        this.$router.push({ name: 'login' })
      }
    }
  },
  mounted() {
    this.validaLogin()
    this.getAgendamentos()
  },
  updated() {
    this.validaLogin()
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/_variables.scss';
.container {
  padding-bottom: 90px;
  @include sm {
    padding: 90px 0;
  }
}

tr {
  border-top: 1px solid #dee2e6;
}

.table td, .table th{
  border: none;
}

.row-title{
  vertical-align: middle;
}

.form-default__input {
  margin: 0
}

.flex {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 15px;
  &.flex--center {
    justify-content: center;
  }
  .form-default__input {
    width: 45px;
  }
}

.radio-group {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  label {
    margin: 0 15px 0 0;
  }
  input[type=radio] {
    display: none;
  }
  .label-radio {
    position: relative;
    cursor: pointer;
    width: 24px;
    height: 24px;
    border: 2.5px solid #707070;
    border-radius: 50%;
    &:after {
      content: '';
      position: absolute;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #FFF;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .label-radio:focus  {
    &:after {
      background: #CCCCCC;
    }
  }
  input[type=radio]:checked + .label-radio {
    &:after {
      background: #707070;
    }
  }
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}


</style>