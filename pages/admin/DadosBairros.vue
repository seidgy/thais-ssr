<template>
  <div class="main row d-flex justify-content-center">
    <div class="container">
      <div class="row">
        <div class="col-3">
          <MenuAdmin />
        </div>
        <div class="col-9">
          <h1 class="form-title">Bairros</h1>
            <div class="row">
              <hr>
              <div class="col-md-12">
                <label for="cidade_bairro"><b>Bairros:</b></label>
              </div>
              
              <div class="col-md-4" v-for="lb in listaDeBairrosSelect" v-bind:key="lb"><input v-model="bairrosSelecionados" type="checkbox" :value="lb._id"/> {{lb._id}}</div>
              <hr>
              <div class="col-md-12">
                <label for="cidade_bairro"><b>Titulo:</b></label>
                <input type="text" class="form-control" v-model="bairro.cidade_bairro"/>
              </div>
              <div class="col-md-12">
                <label for="descricao"><b>Descrição:</b></label>
                <vue-editor :customModules="customModulesForEditor" v-model="bairro.descricao" id="descricao"> </vue-editor>
              </div>
              <div class="col-md-12">
                <label for="midia"><b>Midia:</b></label>
                <input type="file" class="form-control" ref="binario" id="midia" @change="getFile"/>
              </div>
            </div>
            <hr>
            <button class="button button--primary" v-on:click="saveBairro()" :disabled="carregandoBinario">Salvar</button>
          

          <br>


          <table style="width:100%">
            <tr>
              <th>Bairro</th>
              <th>Titulo</th>
              <th>Descrição</th>
              <th>Editar</th>
            </tr>
            <tr v-for="bai in bairros" v-bind:key="bai">
              <td>{{bai.ra}}</td>
              <td>{{bai.cidade_bairro}}</td>
              <td>{{bai.descricao}}</td>
              <td><a href="#" v-on:click.prevent="bairro = bai">Editar</a></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import MenuAdmin from '../../components/MenuAdmin';
export default {
  name: 'DadosBairros',
  components: {VueEditor, MenuAdmin},
  data() {
    return {
      bairros: [],
      bairro: {},
      carregandoBinario: false,
      bairrosSelecionados:[],
      listaDeBairrosSelect: [],
      customToolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }]]
    }
  },
  methods: {
    async getBairros(){
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')
      
      this.carregando = true
      this.$bairros.buscar(token).then(ret => {
        this.bairros = ret.data
      }).catch(err=>{
        console.log('ERRO -> ',err)
      }).finally(() => this.carregando = false)
    },
    getFile(){
      let file = this.$refs.binario.files[0]
      this.carregandoBinario = true
      this.toBase64(file).then(ret=>{
        this.bairro.binario = ret
      }).catch(e => Error(e))
      .finally(()=>{
        this.carregandoBinario = false
      })
    },
    toBase64(file){
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      })
    },
    async getListaBairrosSelect(){
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')

      let paramsConsulta = {
        limit: 1,
        page: 1,
        termoBusca: {'ofertas.tipo_oferta': 1}
      };
      this.$imoveis.buscar(token,paramsConsulta).then(ret => {
        this.listaDeBairrosSelect = ret.data.listaBairros
      }).catch(err=>{
        console.log('ERRO -> ',err)
      })
    },
    async saveBairro(){
      await this.$recaptchaLoaded()
      const token = await this.$recaptcha('login')
      this.carregando = true
      this.bairro.ra = this.bairrosSelecionados
      this.$bairros.saveBairro(token,this.bairro).then(ret => {
        this.getBairros()
      }).catch(err =>{
        console.log('ERRO -> ',err)
      }).finally(() => this.carregando = false)
    },
  },
  mounted() {
    this.getBairros()
    this.getListaBairrosSelect()
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
</style>