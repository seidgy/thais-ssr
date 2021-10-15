<template>
  <div class="main row d-flex justify-content-center">
    <h1 class="sr-only">Encontre seu imóvel</h1>
    <a target="_blank" title="Tirar dúvidas por Whatsapp" :href="'https://api.whatsapp.com/send?phone=556183186609&amp;text=Gostaria de receber mais informações sobre Imóveis '+(tipo=='aluguel'?'para alugar':'`à venda')+' URL:'+this.$route.fullPath" class="whatsapp">
      <img src="/images/whatsapp.png" alt="Tirar dúvidas por Whatsapp" class="whatsapp__icon" />
      <span class="sr-only">Abre em uma nova aba</span>
    </a>
    <div class="container container--imoveis">
      <div class="imoveis" v-if="!carregando">
        <div class="parametros" v-if="false">
          <p class="parametros__title">Sua pesquisa</p>
          <input type="text" class="parametros__input-termo" v-model="textoBusca" />
        </div>
        <div class="relative">
          <h2 class="imoveis__title not-mobile">{{ totalRegistrosEncontrados }} imóveis encontrados</h2>
          <div class="visualizador not-mobile">
            <div class="opcao-visualizador">
              <input type="radio" class="opcao-visualizador__check" id="vis-tabela" value="tabela" v-model="tipoVisualizacao" />
              <label for="vis-tabela" class="opcao-visualizador__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" alt="tabela">
                  <g id="Grupo_1555" data-name="Grupo 1555" transform="translate(-274.5 -496)">
                    <rect id="Retângulo_556" data-name="Retângulo 556" width="4" height="7" rx="1" transform="translate(274.5 496)" fill="#142038"/>
                    <rect id="Retângulo_557" data-name="Retângulo 557" width="4" height="7" rx="1" transform="translate(274.5 505)" fill="#142038"/>
                    <rect id="Retângulo_558" data-name="Retângulo 558" width="4" height="7" rx="1" transform="translate(280.5 496)" fill="#142038"/>
                    <rect id="Retângulo_559" data-name="Retângulo 559" width="4" height="7" rx="1" transform="translate(280.5 505)" fill="#142038"/>
                    <rect id="Retângulo_560" data-name="Retângulo 560" width="4" height="7" rx="1" transform="translate(286.5 496)" fill="#142038"/>
                    <rect id="Retângulo_561" data-name="Retângulo 561" width="4" height="7" rx="1" transform="translate(286.5 505)" fill="#142038"/>
                  </g>
                </svg>
              </label>
            </div>
            <div class="opcao-visualizador">
              <input type="radio" class="opcao-visualizador__check" id="vis-lista" value="lista" v-model="tipoVisualizacao" />
              <label for="vis-lista" class="opcao-visualizador__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" alt="Lista">
                  <g id="Grupo_1556" data-name="Grupo 1556" transform="translate(-321 -496)">
                    <rect id="Retângulo_562" data-name="Retângulo 562" width="4" height="16" rx="1" transform="translate(321 512) rotate(-90)" fill="#ccc"/>
                    <rect id="Retângulo_563" data-name="Retângulo 563" width="4" height="16" rx="1" transform="translate(321 506) rotate(-90)" fill="#ccc"/>
                    <rect id="Retângulo_564" data-name="Retângulo 564" width="4" height="16" rx="1" transform="translate(321 500) rotate(-90)" fill="#ccc"/>
                  </g>
                </svg>
              </label>
            </div>
          </div>
        </div>
        <div v-if="retImoveis.imoveis.length <= 0">
            <h4>Infelizmente não encontramos nenhum imóvel a partir dos filtros informados.</h4>
        </div>
        <div class="row" id="filtros-container" :class="{'show-filters':showFilters}" v-else>
          <div class="toggle-filtros mobile-only">
            <button class="button button--secondary" @click="showFilters=!showFilters">
              <img src="/images/filter-red.svg" alt="Ícone de filtro" aria-hidden="true" class="button__icon">
              Filtros
            </button>
            <button class="button button--borderless button--gray button--paddingless cancel-button" @click="showFilters=false">Cancelar</button>
          </div>
          <div class="col-md-3 filtro-imoveis">
            <form action="" id="form-filtros" class="form-filtros">
              <!--<input type="hidden" name="textoBusca" v-model="textoBusca">-->
              <input type="hidden" name="finalidadeImovel" v-model="finalidadeImovel">
              <div class="search-form__options">
                <div class="search-form__option" >
                  <input type="radio" id="alugar" name="tipo" v-model="tipo" checked value="aluguel" class="search-form__radio">
                  <label for="alugar" class="search-form__custom-radio" tabindex="0"></label>
                  <label for="alugar" class="search-form__label">Alugar</label>
                </div>
                <div class="search-form__option">
                  <input type="radio" id="comprar" name="tipo" v-model="tipo" value="compra" class="search-form__radio">
                  <label for="comprar" class="search-form__custom-radio" tabindex="0"></label>
                  <label for="comprar" class="search-form__label">Comprar</label>
                </div>
              </div>
              <div class="filtro-imoveis__group">
                <button class="filtro-imoveis__title" :class="{'filtro-imoveis__title--open':showtipo}" @click.prevent="showtipo=!showtipo">
                  <span>Tipo de imóvel</span>
                </button>
                <simplebar class="filtro-list" :class="{'filtro-list--open':showtipo}">
                  <a href="#" @click.prevent="cleanFilter('tipo')" class="filtro-list__clean" v-if="this.filterTipo && this.filterTipo.length > 0">Limpar filtro</a>
                  <div class="filtro-list__item" v-for="item in retImoveis.listTipoImovel" v-bind:key="item._id">
                    <div class="search-form__option" >
                      <input type="checkbox" :id="replaceCharacters(item._id)" name="tipoImovel" :value="item._id" class="search-form__radio" v-model="filterTipo">
                      <label :for="replaceCharacters(item._id)" class="search-form__custom-radio search-form__custom-radio--checkbox" tabindex="0"></label>
                      <label :for="replaceCharacters(item._id)" class="search-form__label search-form__label--lower">{{item._id}}</label>
                    </div>
                    <a href="#" title="Abrir este filtro em uma nova aba." @click="newTabSearch('tipoImovel', item._id)" class="filtro-list__number">({{item.total}})</a>
                  </div>
                </simplebar>
              </div>
              <div class="filtro-imoveis__group">
                <button class="filtro-imoveis__title" :class="{'filtro-imoveis__title--open':showbairro}" @click.prevent="showbairro=!showbairro">
                  <span>Bairro</span>
                </button>
                <simplebar class="filtro-list" :class="{'filtro-list--open':showbairro}">
                  <a href="#" @click.prevent="cleanFilter('bairro')" class="filtro-list__clean" v-if="this.filterBairro && this.filterBairro.length > 0">Limpar filtro</a>
                  <div class="filtro-list__item" v-for="item in retImoveis.listaBairros" v-bind:key="item._id">
                    <div class="search-form__option" >
                      <input type="checkbox" :id="replaceCharacters(item._id)" name="bairroImovel" :value="item._id" class="search-form__radio" v-model="filterBairro">
                      <label :for="replaceCharacters(item._id)" class="search-form__custom-radio search-form__custom-radio--checkbox" tabindex="0"></label>
                      <label :for="replaceCharacters(item._id)" class="search-form__label search-form__label--lower">{{item._id}}</label>
                    </div>
                    <a href="#" title="Abrir este filtro em uma nova aba." @click="newTabSearch('bairroImovel', item._id)" class="filtro-list__number">({{item.total}})</a>
                  </div>
                </simplebar>
              </div>
              <div class="filtro-imoveis__group">
                <button class="filtro-imoveis__title" :class="{'filtro-imoveis__title--open':showEndereco}" @click.prevent="showEndereco=!showEndereco">
                  <span>Endereço</span>
                </button>
                <simplebar class="filtro-list" :class="{'filtro-list--open':showEndereco}">
                  <a href="#" @click.prevent="cleanFilter('endereco')" class="filtro-list__clean" v-if="this.filterEndereco && this.filterEndereco.length > 0">Limpar filtro</a>
                  <div class="filtro-list__item" v-for="item in retImoveis.listEndereco" v-bind:key="item._id">
                    <div class="search-form__option" >
                      <input type="checkbox" :id="replaceCharacters(item._id)" name="enderecoImovel" :value="item._id" class="search-form__radio" v-model="filterEndereco">
                      <label :for="replaceCharacters(item._id)" class="search-form__custom-radio search-form__custom-radio--checkbox" tabindex="0"></label>
                      <label :for="replaceCharacters(item._id)" class="search-form__label search-form__label--lower">{{item._id}}</label>
                    </div>
                    <a href="#" title="Abrir este filtro em uma nova aba." @click="newTabSearch('enderecoImovel', item._id)" class="filtro-list__number">({{item.total}})</a>
                  </div>
                </simplebar>
              </div>
              <div class="filtro-imoveis__group">
                <button class="filtro-imoveis__title" :class="{'filtro-imoveis__title--open':showquarto}" @click.prevent="showquarto=!showquarto">
                  <span>Quartos</span>
                </button>
                <simplebar class="filtro-list" :class="{'filtro-list--open':showquarto}">
                  <div class="filtro-list__item" v-for="item in 5" v-bind:key="item">
                    <div class="search-form__option" >
                      <input type="radio" :id="'quarto-'+item" name="minimoQuartos" :value="item" v-model="retImoveis.minimoQuartos" class="search-form__radio">
                      <label :for="'quarto-'+item" class="search-form__custom-radio search-form__custom-radio" tabindex="0"></label>
                      <label :for="'quarto-'+item" class="search-form__label search-form__label--lower">{{item}}{{ item>=5?'+':'' }}</label>
                    </div>
                  </div>
                </simplebar>
              </div>
              <div class="filtro-imoveis__group">
                <button class="filtro-imoveis__title" :class="{'filtro-imoveis__title--open':showvaga}" @click.prevent="showvaga=!showvaga">
                  <span>Vagas</span>
                </button>
                <simplebar class="filtro-list" :class="{'filtro-list--open':showvaga}">
                  <div class="filtro-list__item" v-for="item in 5" v-bind:key="item">
                    <div class="search-form__option" >
                      <input type="radio" :id="'vaga-'+item" name="minimoVagas" :value="item" v-model="retImoveis.minimoVagas" class="search-form__radio">
                      <label :for="'vaga-'+item" class="search-form__custom-radio search-form__custom-radio" tabindex="0"></label>
                      <label :for="'vaga-'+item" class="search-form__label search-form__label--lower">{{item}}{{ item>=5?'+':'' }}</label>
                    </div>
                  </div>
                </simplebar>
              </div>
              <div class="filtro-imoveis__group">
                <button class="filtro-imoveis__title" :class="{'filtro-imoveis__title--open':showbanheiro}" @click.prevent="showbanheiro=!showbanheiro">
                  <span>Banheiros</span>
                </button>
                <simplebar class="filtro-list" :class="{'filtro-list--open':showbanheiro}">
                  <div class="filtro-list__item" v-for="item in 5" v-bind:key="item">
                    <div class="search-form__option" >
                      <input type="radio" :id="'banheiro-'+item" name="minimoBanheiros" :value="item" v-model="retImoveis.minimoBanheiros" class="search-form__radio">
                      <label :for="'banheiro-'+item" class="search-form__custom-radio search-form__custom-radio" tabindex="0"></label>
                      <label :for="'banheiro-'+item" class="search-form__label search-form__label--lower">{{item}}{{ item>=5?'+':'' }}</label>
                    </div>
                  </div>
                </simplebar>
              </div>
              <div class="filtro-imoveis__group">
                <button class="filtro-imoveis__title" :class="{'filtro-imoveis__title--open':showPreco}" @click.prevent="showPreco=!showPreco">
                  <span>Faixa de preço</span>
                </button>
                <div class="filtro-list" :class="{'filtro-list--open':showPreco}">
                  <div class="row">
                    <div class="col-md-12" :class="{'form-default__filled': minimoPreco}">
                      <input type="number" min="0" :step="tipo == 'aluguel'?'50':'50000'" name="minimoPreco" id="valMinimo" class="form-default__input" v-model="minimoPreco">
                      <label for="valMinimo" class="form-default__label">Valor mínimo</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12" :class="{'form-default__filled': maximoPreco}">
                      <input type="number" :step="tipo == 'aluguel'?'50':'50000'" :min="minimoPreco" name="maximoPreco" id="valMaximo" class="form-default__input" v-model="maximoPreco">
                      <label for="valMaximo" class="form-default__label">Valor máximo</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="filtro-imoveis__group">
                <button class="filtro-imoveis__title" :class="{'filtro-imoveis__title--open':showArea}" @click.prevent="showArea=!showArea">
                  <span>Área</span>
                </button>
                <div class="filtro-list" :class="{'filtro-list--open':showArea}">
                  <div class="row">
                    <div class="col-md-12" :class="{'form-default__filled': minimoArea}">
                      <input type="number" min="0" step="10" name="minimoArea" id="valMinimo" class="form-default__input" v-model="minimoArea">
                      <label for="valMinimo" class="form-default__label">Área mínima</label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12" :class="{'form-default__filled': maximoArea}">
                      <input type="number" step="10" :min="minimoArea" name="maximoArea" id="valMaximo" class="form-default__input" v-model="maximoArea">
                      <label for="valMaximo" class="form-default__label">Área máxima</label>
                    </div>
                  </div>
                </div>
              </div>
              <input 
                id="submit-button"
                type="submit" 
                value="Aplicar filtros" 
                class="button button--primary button--full"
              >
            </form>
          </div>
          <div class="col-sm-12 mobile-only">
            <h2 class="imoveis__title">{{ totalRegistrosEncontrados }} imóveis encontrados</h2>
          </div>
          <div class="col-md-9 lista-imoveis lista-imoveis--short" :class="'lista-imoveis--'+tipoVisualizacao">
            <div v-for="imv in retImoveis.imoveis" v-bind:key="imv.imovel.codigo_imovel" class="lista-imoveis__imovel imovel" :class="'imovel--'+tipoVisualizacao">
              <cardImoveis :imovel="imv" :tipoVisualizacao="tipoVisualizacao" />
            </div>
          </div>

          <div class="col-md-12">
            <Paginacao v-if="!carregando" :pagina="paramsPagina.page" :totalDeRegistros="retImoveis.qtd_total_registros" :itensPorPagina="paramsPagina.limit" :clickHandler='clickPagina'/>
          </div>
          
        </div>
      </div>


      <loading message="Aguarde, estamos separando os melhores imóveis" v-else />

    </div>
  </div>
</template>

<script>
import Paginacao from '../components/common/paginacao'
import loading from '../components/common/loading'
import cardImoveis from '../components/cardImoveis'
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';
export default {
  name: 'imoveis',
  watch: {
      $route: {
          immediate: true,  
          handler(to) {       
            this.textoBusca = to.query.textoBusca
            this.tipo = to.query.tipo
            if(to.query.tipoImovel) this.tipoImovel = Array.isArray(to.query.tipoImovel) ? to.query.tipoImovel : [to.query.tipoImovel];
            if(to.query.bairroImovel) this.bairroImovel = Array.isArray(to.query.bairroImovel) ? to.query.bairroImovel : [to.query.bairroImovel];
            if(to.query.enderecoImovel) this.enderecoImovel = Array.isArray(to.query.enderecoImovel) ? to.query.enderecoImovel : [to.query.enderecoImovel];
            if(to.query.finalidadeImovel) this.finalidadeImovel = Array.isArray(to.query.finalidadeImovel) ? to.query.finalidadeImovel : [to.query.finalidadeImovel];
            if(to.query.minimoQuartos) this.minimoQuartos = to.query.minimoQuartos
            if(to.query.minimoBanheiros) this.minimoBanheiros = to.query.minimoBanheiros
            if(to.query.minimoVagas) this.minimoVagas = to.query.minimoVagas
            if(to.query.minimoPreco) this.minimoPreco = to.query.minimoPreco
            if(to.query.maximoPreco) this.maximoPreco = to.query.maximoPreco
            if(to.query.minimoArea) this.minimoArea = to.query.minimoArea
            if(to.query.maximoArea) this.maximoArea = to.query.maximoArea
            if(to.query.page) this.paramsPagina.page = to.query.page
            if(to.query.limit) this.paramsPagina.limit = to.query.limit
            
            this.getImoveis()
          }
      },
      tipo: function (value) {
        this.filterEndereco = null
      }
  },
  components:{
    Paginacao,cardImoveis,loading,simplebar
  },
  data() {
    return {
      carregando: true,
      showMap: false,
      termoBusca:null,
      tipo:null,
      tipoVisualizacao: 'lista',
      retImoveis:{},
      totalRegistrosEncontrados: 0,
      showtipo: false,
      showbairro: false,
      showfinalidade: false,
      showEndereco: false,
      showquarto: false,
      showbanheiro: false,
      showvaga: false,
      showarea: false,
      showPreco: false,
      minimoPreco: null,
      maximoPreco: null,
      showArea: false,
      minimoArea: null,
      maximoArea: null,
      filterBairro: [],
      filterFinalidade: [],
      filterTipo: [],
      filterEndereco: [],
      paramsPagina: {
        limit: 12,
        page:1,
        sort: {'imovel.cidade': 'asc'},
      },
      showFilters: false,
      buscaDireta: false,
    }
  },
  methods: {
    async getImoveis(){
      if (process.client) {
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        if(this.textoBusca || this.textoBusca==='') {
          this.paramsPagina.textoBusca = this.textoBusca ? this.textoBusca: '';
        }
        this.paramsPagina.termoBusca = {
          'ofertas.tipo_oferta': this.tipo == 'aluguel'?1:2,
          'finalidade': this.finalidadeImovel?this.finalidadeImovel:null
        };
        let paramsConsulta = {
          limit: this.paramsPagina.limit,
          page: this.paramsPagina.page,
          sort: this.paramsPagina.sort,
          termoBusca: this.paramsPagina.termoBusca
        };
        this.carregando = true
        if(this.paramsPagina.textoBusca || this.paramsPagina.textoBusca==='') {
          this.$imoveis.buscar(token,this.paramsPagina).then(ret => {
            const primeiraConsulta = ret.data;
            if(primeiraConsulta.listaBairros && primeiraConsulta.listaBairros.length <= 6) {
              paramsConsulta.bairro = [];
              primeiraConsulta.listaBairros.forEach(element => {
                paramsConsulta.bairro.push(element._id);
              });
            } 
            if(primeiraConsulta.listTipoImovel && primeiraConsulta.listTipoImovel.length < 5) {
              paramsConsulta.tipo_imovel = [];
              primeiraConsulta.listTipoImovel.forEach(element => {
                paramsConsulta.tipo_imovel.push(element._id);
              });
            } 
            if(primeiraConsulta.listEndereco) {
              paramsConsulta.endereco = [];
              primeiraConsulta.listEndereco.forEach(element => {
                paramsConsulta.endereco.push(element._id);
              });
            } 
            if(primeiraConsulta.minimoQuartos >= 1) paramsConsulta.minimoQuartos = primeiraConsulta.minimoQuartos;
            if(primeiraConsulta.minimoBanheiros >= 1) paramsConsulta.minimoBanheiros = primeiraConsulta.minimoBanheiros;
            if(primeiraConsulta.minimoVagas >= 1) paramsConsulta.minimoVagas = primeiraConsulta.minimoVagas;
            paramsConsulta.finalidade = this.finalidadeImovel?this.finalidadeImovel:null
            this.getImoveisFiltro(paramsConsulta);
          }).catch(err=>{
            console.log('ERRO -> ',err)
          })
        } else {
          if(this.tipoImovel) paramsConsulta.tipo_imovel = this.tipoImovel;
          if(this.bairroImovel) paramsConsulta.bairro = this.bairroImovel;
          if(this.finalidadeImovel) paramsConsulta.finalidade = this.finalidadeImovel;
          if(this.enderecoImovel) paramsConsulta.endereco = this.enderecoImovel;
          if(this.minimoQuartos) paramsConsulta.minimoQuartos = parseInt(this.minimoQuartos,10);
          if(this.minimoBanheiros) paramsConsulta.minimoBanheiros = parseInt(this.minimoBanheiros,10);
          if(this.minimoVagas) paramsConsulta.minimoVagas = parseInt(this.minimoVagas,10);
          if(this.minimoPreco) paramsConsulta.minimoPreco = parseInt(this.minimoPreco,10);
          if(this.maximoPreco) paramsConsulta.maximoPreco = parseInt(this.maximoPreco,10);
          if(this.minimoArea) paramsConsulta.minimoArea = parseInt(this.minimoArea,10);
          if(this.maximoArea) paramsConsulta.maximoArea = parseInt(this.maximoArea,10);
          this.buscaDireta = true;
          this.getImoveisFiltro(paramsConsulta);
        }
      }
    }, 
    async getImoveisFiltro(params) {
      if (process.client) {
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        this.$imoveis.getImoveisByFiltro(token,params).then(ret => {
          this.retImoveis= ret.data;
          if((this.retImoveis.listTipoImovel && this.retImoveis.listTipoImovel.length == 1) || params.tipo_imovel) {
            this.showtipo = true;
            params.tipo_imovel ? this.filterTipo = params.tipo_imovel : this.filterTipo.push(this.retImoveis.listTipoImovel[0]._id);
          }
          if((this.retImoveis.listaBairros && this.retImoveis.listaBairros.length == 1) || params.bairro) {
            this.showbairro = true;
            params.bairro ? this.filterBairro = params.bairro : this.filterBairro.push(this.retImoveis.listaBairros[0]._id);
          }
          if((this.retImoveis.listFinalidade && this.retImoveis.listFinalidade.length == 1) || params.finalidade) {
            this.showfinalidade = true;
            params.finalidade ? this.filterFinalidade = params.finalidade : this.filterFinalidade.push(this.retImoveis.listFinalidade[0]._id);
          }
          if((this.retImoveis.listEndereco && this.retImoveis.listEndereco.length == 1) || params.endereco) {
            if(this.buscaDireta || (this.retImoveis.listEndereco.length <= 6)){
              this.showEndereco = true;
              params.endereco ? this.filterEndereco = params.endereco : this.filterEndereco.push(this.retImoveis.listEndereco[0]._id);
            }
          }
          this.showquarto = (this.retImoveis.minimoQuartos && this.retImoveis.minimoQuartos >=1);
          this.showvaga = (this.retImoveis.minimoVagas && this.retImoveis.minimoVagas >=1);
          this.showbanheiro = (this.retImoveis.minimoBanheiros && this.retImoveis.minimoBanheiros >=1);
          this.showPreco = (this.minimoPreco || this.maximoPreco);
          this.showArea = (this.minimoArea || this.maximoArea);
          
          this.totalRegistrosEncontrados = ret.data.qtd_total_registros
        }).catch(err=>{
          console.log('ERRO -> ',err)
        }).finally(() => this.carregando = false)
      }
    },
    clickPagina(page){
      this.paramsPagina.page = page
      this.getImoveis()
    },
    replaceCharacters(userText) {
      var regExpr = /[^a-zA-Z0-9-. ]/g;
      return userText.toLowerCase().replace(/\s/g , "-").replace(regExpr, "");
    },
    cleanFilter(tipo) {
      if(tipo == 'bairro'){
        this.filterBairro = null; 
      }
      if(tipo == 'bairro' || tipo == 'endereco') {
        this.filterEndereco = null;
      }
      if(tipo == 'tipo') {
        this.filterTipo = null;
      }
      window.setTimeout(function(){
        document.getElementById('submit-button').click();
      },50)
    },
    mountParameters() {
      let finalidadeImovel = '';
      let tipo = [];
      let tipoImovel = [];
      let bairroImovel = [];
      let enderecoImovel = [];
      let minimoQuartos = '';
      let minimoVagas = '';
      let minimoBanheiros = '';
      let minimoPreco = '';
      let maximoPreco = '';
      let minimoArea = '';
      let maximoArea = '';
      finalidadeImovel = document.querySelector('[name="finalidadeImovel"]').value;
      document.querySelectorAll('[name="tipo"]:checked').forEach((i) => {
        tipo.push(i.value);
      });
      document.querySelectorAll('[name="tipoImovel"]:checked').forEach((i) => {
        tipoImovel.push(i.value);
      });
      document.querySelectorAll('[name="bairroImovel"]:checked').forEach((i) => {
        bairroImovel.push(i.value);
      });
      document.querySelectorAll('[name="enderecoImovel"]:checked').forEach((i) => {
        enderecoImovel.push(i.value);
      });
      minimoQuartos = document.querySelector('[name="minimoQuartos"]:checked')?document.querySelector('[name="minimoQuartos"]:checked').value:'';
      minimoVagas = document.querySelector('[name="minimoVagas"]:checked')?document.querySelector('[name="minimoVagas"]:checked').value:'';
      minimoBanheiros = document.querySelector('[name="minimoBanheiros"]:checked')?document.querySelector('[name="minimoBanheiros"]:checked').value:'';
      minimoPreco = document.querySelector('[name="minimoPreco"]').value;
      maximoPreco = document.querySelector('[name="maximoPreco"]').value;
      minimoArea = document.querySelector('[name="minimoArea"]').value;
      maximoArea = document.querySelector('[name="maximoArea"]').value;
      var params = {
        'finalidadeImovel': finalidadeImovel,
        'tipo': tipo,
        'tipoImovel': tipoImovel,
        'bairroImovel': bairroImovel,
        'enderecoImovel': enderecoImovel,
        'minimoQuartos': minimoQuartos,
        'minimoVagas': minimoVagas,
        'minimoBanheiros': minimoBanheiros,
        'minimoPreco': minimoPreco,
        'maximoPreco': maximoPreco,
        'minimoArea': minimoArea,
        'maximoArea': maximoArea,
      }
      return params;
    },
    newTabSearch(type, newValue) {
      const parameters = this.mountParameters();
      if(type == 'tipoImovel') {
        parameters.tipoImovel = [newValue];
      }
      if(type == 'bairroImovel') {
        parameters.bairroImovel = [newValue];
      }
      if(type == 'enderecoImovel') {
        parameters.enderecoImovel = [newValue];
      }
      let routeData = this.$router.resolve({ to: '/imoveis', query: parameters });
      window.open(routeData.href, '_blank');
    }
  },
  async mounted() {
    /*try {
      await this.$recaptcha.init()
    } catch (e) {
      console.error(e);
    }*/
    if(window.innerWidth < 1270) {
      this.tipoVisualizacao = 'tabela';
    }
  },
  /*beforeDestroy() {
    this.$recaptcha.destroy()
  }*/
}
</script>
<style lang="scss" scoped>
@import '../assets/css/_variables.scss';
.parametros{
  border-bottom: 1px solid #CCC;
  padding-bottom: 30px;
  margin-bottom: 30px;
}

.parametros__title {
  font-size: 0.75rem;
  letter-spacing: 0.080em;
  text-transform: uppercase;
  margin-bottom: 17px;
}

.relative {
  padding-bottom: 34px;
}


    .search-form__options {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 22px;
    }

    .search-form__option {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      flex-grow: 1;
    }


    .search-form__radio {
      display:none;
    }

    .search-form__custom-radio {
      width: 16px;
      height: 16px;
      border-radius: 8px;
      border: 2px solid #{$font-color};
      margin-right: 5px;
      position: relative;
      margin-bottom: 0;
    }

    .search-form__custom-radio--checkbox {
      border-radius: 2px; 
    }

    .search-form__custom-radio::after {
      content: '';
      display: block;
      position: absolute;
      border-radius: 6px;
      background-color: #{$font-color};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.1s ease-out;
      height: 0;
      width: 0;
    }

    .search-form__custom-radio--checkbox::after {
      border-radius: 2px;
    }

    .search-form__radio:checked ~ .search-form__custom-radio::after {
      width: 8px;
      height: 8px;
    }

    .search-form__radio:checked ~ .search-form__custom-radio--checkbox::after {
      width: 9px;
      height: 9px;
    }

    .search-form__label {
      font-size: 0.75rem;
      letter-spacing: 0.080em;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 0;
      max-width: calc(100% - 24px);
    }

    .search-form__label--lower {
      text-transform: none;
      font-weight: 500;
      font-size: 0.875rem;
    }

    .filtro-imoveis__group {
      width: 100%;
      min-height: 44px;
      border-radius: 22px;
      border: 1px solid #CCC;
      padding: 12px 17px;
      margin-bottom: 30px;
    }

    .filtro-imoveis__title {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      border: none;
      background: none;
      transition: all 0.3s ease-in-out;
      span {
        font-size: 1rem;
        font-weight: 600;
      }
      &::after {
        content: url('/images/arrow-up.svg');
        transform: rotateX(0);
        display: block;
        transition: all 0.2s ease-out;
      }
      &:focus {
        outline: transparent;
      }
    }

    .filtro-imoveis__title--open {
      margin-bottom: 23px;
      &::after {
        transform: rotateX(180deg);
      }
    }

    .filtro-list {
      max-height: 0;
      overflow-y: hidden;
      width: 100%;
      transition: max-height 0.3s ease-in-out;
      &.filtro-list--open {
        max-height: 300px;
        overflow-y: auto;
      }
    }

    .filtro-list__item {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .filtro-list__number {
      font-size: 0.875rem;
      font-weight: 500;
      color: $main-color;
    }

    .filtro-list__clean {
      font-size: .875rem;
      color: $main-color;
      margin-bottom: 15px;
      display: block;
    }

    .filtro-list__item {
      width: 90%;
    }

    .row {
      width: 100%;
    }

//APENAS RESPONSIVO!!!
@include sm {
  .toggle-filtros {
    padding: 0 15px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    transition: margin-bottom 0.3s ease-in;
  }

  .filtro-imoveis {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-in;
  }

  .cancel-button {
    display: none;
  }

  .show-filters {
    .toggle-filtros {
      margin-bottom: 38px;
    }
    .cancel-button {
      display: block;
    }
    .filtro-imoveis {
      max-height: 2550px;
    }
  }
  


}
</style>