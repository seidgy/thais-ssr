<template>
  <div class="main row d-flex justify-content-center">
    <div class="container">
      <div class="row">
        <div class="col-3">
          <MenuAdmin />
        </div>
        <div class="col-9">
            <h1 class="form-title">Excluir Imóvel</h1>
            <div class="row">
              <div class="col-8">
                <div class="form-group">
                  <label>Código do Imóvel</label>
                  <input type="text" class="form-default__input" v-model="codImovel" placeholder="Ex: CA3404" />                
                </div>
              </div>
              <div class="col-4 flex buttons">
                <button v-on:click.prevent="getImovel" class="button button--primary">Buscar</button>
              </div>
            </div>
            <div v-if="excluido">
              <div class="row result">
                <div class="col-12" v-if="excluido == 'erro'">
                  <p class="alert alert-danger">Erro ao excluir o imóvel. Por favor, tente novamente.</p>
                </div>
                <div class="col-12" v-else>
                  <p class="alert alert-success">Imóvel excluído com sucesso.</p>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row result" v-if="!imovel && buscado">
                <div class="col-12">
                  <p class="alert alert-info" role="alert">Nenhum imóvel encontrado com o código informado.</p>
                </div>
              </div>
              <div class="row result" v-else-if="buscado">
                <div class="col-md-12 lista-imoveis lista-imoveis--lista">
                  <div class="lista-imoveis__imovel imovel imovel--lista">
                    <cardImoveis :imovel="imovel" tipoVisualizacao="lista"/>
                  </div>
                  <button class="button button--primary" data-toggle="modal" data-target="#confirm">Excluir este imóvel</button>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="confirm" tabindex="-1" role="dialog" aria-labelledby="Confirmar exclusão" aria-hidden="true" v-if="imovel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Confirmar exclusão</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Tem certeza que deseja excluir o imovel "{{ imovel.imovel.titulo_imovel }}"? Esta operação não poderá ser desfeita.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="deleteImovel" data-dismiss="modal">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardImoveis from '../../components/cardImoveis';
import MenuAdmin from '../../components/MenuAdmin';

export default {
  name: 'DeleteImovel',
  components:{
    cardImoveis,
    MenuAdmin
  },
  data() {
    return {
      login: null,
      password: null,
      integracao: [],
      salvando: false,
      auxIntegracao: {},
      codImovel: null,
      imovel: null,
      buscado: false,
      excluido: false,
    }
  },
  methods: {
    async getImovel(){
      if(this.codImovel){
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        this.$imoveis.getImoveisByIdImovel(token,this.codImovel).then(ret => {
          this.imovel = ret.data;
          this.buscado = true;
        }).catch(err=>{
          console.log('ERRO -> ',err)
        })
      }
    },
    async deleteImovel(){
      if(this.codImovel){
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        this.$imoveis.deleteImovel(token,this.codImovel).then(ret => {
          console.log(ret)
          this.excluido = 'excluido';
        }).catch(err=>{
          console.log('ERRO -> ',err);
          this.excluido = 'erro';
        })
      }
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
  },
  updated() {
    this.validaLogin()
  },
  watch: {
    codImovel: function (val) {
      this.codImovel = val.toUpperCase();
      this.excluido = false;
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/_variables.scss';
.buttons {
  justify-content: flex-end;
  align-items: flex-end;
}
.result {
  margin-top: 30px;
}

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