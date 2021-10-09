<template>
  <div class="main row d-flex justify-content-center">
    <h1 class="sr-only">Imóveis favoritos</h1>
    <div class="container container--imoveis">
      <div class="row">
        <div class="col-md-12 title">
          <h2 class="title__text">
            <a href="#" @click="$router.go(-1)" class="title__link"><img src="/images/arrow-left.svg" alt="Voltar" class="title__icon"></a>
            <span class="title__title">Favoritos</span>
            <span class="title__number">({{ this.retImoveis.qtd_total_registros }})</span>
          </h2>
        </div>
      </div>
      <div class="imoveis" v-if="!carregando">
        <!--<h2 class="imoveis__title">{{ totalRegistrosEncontrados }} imóveis favoritos</h2>-->
        <div v-for="bairro in imoveisPorBairro" v-bind:key="bairro.bairro">
          <div class="row">
            <div class="col-md-12"><div class="separator"></div></div>
            <div class="offset-md-1 col-md-11 imovel__default-subtitle-box">
              <p class="imovel__default-subtitle">{{ bairro.bairro }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 lista-imoveis">
              <div v-for="imv in bairro.imoveis" v-bind:key="imv.imovel.codigo_imovel" class="lista-imoveis__imovel imovel">
                <cardImoveis :imovel="imv" tipoVisualizacao="tabela" @afterClickFavorito="getImoveisFavoritos()"/>
              </div>
            </div>
          </div>
        </div>

      </div>
      <loading v-else />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import cardImoveis from '../components/cardImoveis'
import loading from '../components/common/loading'

export default {
  name: 'Favoritos',
  watch: {
      $route: {
          immediate: true,  
          handler(to) {       
            if(to.query.page) this.paramsPagina.page = to.query.page
            this.paramsPagina.limit = 24
            
            this.getImoveisFavoritos()
          }
      }
  },
  components:{
    cardImoveis,loading
  },
  computed: {
    ...mapState(['favoritos'])
  },
  data() {
    return {
      carregando: true,
      showMap: true,
      tipoVisualizacao: 'tabela',
      retImoveis:[],
      totalRegistrosEncontrados: 0,
      imoveisPorBairro: [],
      paramsPagina: {
        limit: 12,
        page:1,
        sort: {'imovel.cidade': 'asc'}, 
      }
    }
  },
  methods: {
    async getImoveisFavoritos(){
      if (process.client) {
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        this.paramsPagina.termoBusca = {codigo_imovel: this.favoritos}
        this.carregando = true
        this.$imoveis.buscaParametrizada(token,this.paramsPagina).then(ret => {
          this.retImoveis = ret.data
          this.totalRegistrosEncontrados = ret.qtd_total_registros
          this.getImoveisBairro(this.retImoveis.imoveis);
      
        }).catch(err=>{
          console.log('ERRO -> ',err)
        }).finally(() => this.carregando = false)
      }
    }, 
    clickPagina(page){
      this.paramsPagina.page = page
      this.getImoveisFavoritos()
    },
    getImoveisBairro(imoveis) {
      this.imoveisPorBairro = []
      for(let i = 0; i < imoveis.length; i++){
        let check = this.imoveisPorBairro.find(c => c.bairro == imoveis[i].imovel.bairro);
        if(!check) {
          this.imoveisPorBairro.push({
            bairro: imoveis[i].imovel.bairro,
            imoveis: [imoveis[i]]
          });
        } else {
          check.imoveis.push(imoveis[i]);
        }
      }
      this.imoveisPorBairro.sort((a,b) => {
        return a.bairro > b.bairro;
      });
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../assets/css/_variables.scss';
</style>