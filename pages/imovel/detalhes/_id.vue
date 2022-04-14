<template>
  <div class="main">
    <p v-if="carregando">
      <loading/>
    </p>
    <div v-else>
      <a target="_blank" title="Tirar dúvidas por Whatsapp" :href="'https://api.whatsapp.com/send?phone=556130312200&amp;text=Gostaria de receber mais informações sobre '+dadosImovel.imovel.titulo_imovel+' Código: '+dadosImovel.codigo_imovel+' URL: https://thaisimobiliaria.com.br/imovel/detalhes/'+this.imovelData.codigo_imovel" class="whatsapp">
        <img src="/images/whatsapp.png" alt="Tirar dúvidas por Whatsapp" class="whatsapp__icon" />
        <span class="sr-only">Abre em uma nova aba</span>
      </a>
      <h1 class="sr-only">{{dadosImovel.imovel.titulo_imovel}}</h1>
      <div class="banner">
        <div class="big-slider">
          <client-only>
            <splide :options="splideOptions">
              <splide-slide v-for="foto in dadosImovel.fotos" v-bind:key="foto._id" >
                <img :src="foto.url_arquivo" :alt="foto.foto_titulo" />
              </splide-slide>
            </splide>
          </client-only>
          <a href="#" @click.prevent="$modal.show('modal-galeria');" class="gallery-call" aria-hidden="true"></a>
        </div>
      </div>
      <div class="container container--dados-imovel">
        <div class="imovel imovel--solo" :class="{'imovel--comercial': dadosImovel.imovel.finalidade == 'Comercial'}">
          <div class="row title">
            <div class="col-md-5 offset-md-2">
              <h2 class="imovel__title main-title"><span class="main-title__highlight">{{dadosImovel.imovel.bairro}}, </span>{{dadosImovel.imovel.titulo_imovel}}</h2>
            </div>
            <div class="col-md-4 offset-md-1">
              <div class="relative">
                <div class="ticket" :class="{'ticket--abas':dadosImovel.ofertas.length > 1}">
                  <div class="ticket-info" v-for="oferta in dadosImovel.ofertas" v-bind:key="oferta.tipo_oferta">
                    <h3 class="ticket-info__title-box" v-if="dadosImovel.imovel.finalidade == 'Residencial'">
                      <img src="/images/lar.svg" alt="Seu novo lar" aria-hidden="true" class="ticket-info__icon">
                      <span class="ticket-info__title">Seu novo lar</span>
                    </h3>
                    <h3 class="ticket-info__title-box" v-else>
                      <span class="ticket-info__title">Resumo</span>
                    </h3>
                    <div class="ticket-info__info info-box">
                      <div class="info-box__row">
                        <span class="info-box__label">{{oferta.tipo_oferta==1?'Aluguel':'Venda'}}</span>
                        <span class="info-box__value info-box__highlight">R$ {{oferta.preco_oferta.toLocaleString('pt-BR')+(oferta.tipo_oferta==1?'/mês':'')}}</span>
                      </div>
                      <div class="info-box__row" v-if="oferta.preco_condominio">
                        <span class="info-box__label">Condomínio</span>
                        <span class="info-box__value">{{oferta.preco_condominio?'R$ '+oferta.preco_condominio.toLocaleString('pt-BR')+'/mês*':''}}</span>
                      </div>
                      <div class="info-box__row">
                        <span class="info-box__label">IPTU</span>
                        <span class="info-box__value">{{oferta.preco_iptu? 'R$'+oferta.preco_iptu.toLocaleString('pt-BR')+'/mês':''}}</span>
                      </div>
                      <div class="info-box__row info-box__row--last" v-if="oferta.tipo_oferta==2">
                        <span class="info-box__label">Preço médio m²</span>
                        <span class="info-box__value">R$ {{oferta.preco_medio_m2.toLocaleString('pt-BR')}}</span>
                      </div>
                      <div class="separator info-box__separator" v-if="oferta.tipo_oferta==1"></div>
                      <div class="info-box__row info-box__row--last" v-if="oferta.tipo_oferta==1">
                        <span class="info-box__label info-box__value info-box__highlight">Total</span>
                        <span class="info-box__value info-box__highlight">R$ {{getTotal(oferta)}}/mês</span>
                      </div>
                      <div class="imovel__buttons">
                        <a href="#" @click.prevent="setCompare()" class="button button--big button--secondary">Compare</a>
                        <a href="#" @click.prevent="handleVisita()" class="button button--big button--primary" taget="_blank">Visite</a>
                      </div>
                      <div class="imovel__buttons">
                        <a href="" @click.prevent="share" class="imovel__share imovel__share--big"><span :id="'share-'+dadosImovel.codigo_imovel">Compartilhe</span></a>
                        <span class="imovel__codigo imovel__codigo--big">CÓD. #{{dadosImovel.codigo_imovel}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="ticket__bottom-box" v-if="dadosImovel.imovel.finalidade == 'Residencial'">
                    <p class="ticket__catchphrase" v-if="dadosImovel.ofertas[0].tipo_oferta==1">Alugue com segurança e comodidade</p>
                    <p class="ticket__catchphrase" v-else>Compre com segurança e comodidade</p>
                  </div>
                  <div class="ticket__bottom-box" v-else>
                    <p class="ticket__catchphrase">Evite dor de cabeça com a ajuda de um especialista</p>
                  </div>
                  <p class="ticket__footer">* O valor do condomínio pode sofrer alterações</p>
                  <div class="ticket__corretor corretor" v-if="dadosImovel.ofertas[0].tipo_oferta==2">
                    <p class="corretor__call">Corretor</p>
                    <p class="corretor__nome">{{ dadosImovel.corretor.nome }}</p>
                    <i class="corretor__foto" :style="'background-image:url('+dadosImovel.corretor.foto+')'"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-5 offset-md-2">
              <div class="numbers numbers--big">
                <div class="numbers__item">
                  <img src="/images/quartos.svg" alt="Quantidade de quartos" class="numbers__icon">
                  <p class="numbers__text">Quartos</p>
                    <p class="numbers__number">{{dadosImovel.imovel.qtd_dormitorios?dadosImovel.imovel.qtd_dormitorios:'-'}}</p>
                </div>
                <div class="numbers__item">
                  <img src="/images/vagas.svg" alt="Quantidade de quartos" class="numbers__icon">
                  <p class="numbers__text">Vagas</p>
                    <p class="numbers__number">{{dadosImovel.imovel.qtd_vagas?dadosImovel.imovel.qtd_vagas:'-'}}</p>
                </div>
                <div class="numbers__item">
                  <img src="/images/banheiros.svg" alt="Quantidade de quartos" class="numbers__icon">
                  <p class="numbers__text">Banheiros</p>
                    <p class="numbers__number">{{dadosImovel.imovel.qtd_banheiros?dadosImovel.imovel.qtd_banheiros:'-'}}</p>
                </div>
                <div class="numbers__item">
                  <img src="/images/area.svg" alt="Quantidade de quartos" class="numbers__icon">
                  <p class="numbers__text">{{dadosImovel.imovel.unidade_metrica}}</p>
                  <p class="numbers__number">{{dadosImovel.imovel.area_total}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="row row--dados">
            <div class="col-md-8"><div class="separator"></div></div>
          </div>
          <div class="row">
            <div class="col-md-6 offset-md-1 flex-row imovel__default-subtitle-box">
              <p class="imovel__default-subtitle">Mais alguns detalhes</p>
              <button @click.prevent="setFavorito()" class="imovel__fav imovel__fav--relative" :class="favorito?'imovel__fav--faved':''" >
                <svg xmlns="http://www.w3.org/2000/svg" width="27.917" height="25.125" viewBox="0 0 27.917 25.125">
                <path id="Caminho_141" data-name="Caminho 141" d="M19.675,4.876a7.39,7.39,0,0,0-6.217,3.473A7.39,7.39,0,0,0,7.241,4.876,7.242,7.242,0,0,0,0,12.117a9.23,9.23,0,0,0,1.021,3.856c1.5,3.156,4.23,5.806,6.758,8.15a70.913,70.913,0,0,0,5.679,4.752,70.98,70.98,0,0,0,5.679-4.753c2.528-2.344,5.257-4.994,6.758-8.15a9.225,9.225,0,0,0,1.021-3.856A7.242,7.242,0,0,0,19.675,4.876Z" transform="translate(0.5 -4.376)" fill="none" stroke="#fff" stroke-width="1"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 offset-md-1 imovel__default-subtitle-box">
              <p class="imovel__default-subtitle">cód. #{{dadosImovel.codigo_imovel}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 offset-md-1 imovel__default-subtitle-box">
              <p class="imovel__default-text" :class="{ 'short-text': !verTexto }" style="white-space: pre-line">{{dadosImovel.imovel.observacao}}</p>
              <button class="button-mostrar-mais" @click="verTexto = !verTexto" v-if="!verTexto">Mostrar texto completo <img src="/images/arrow-up.svg" aria-hidden="true" class="button-mostrar-mais__icon"> </button>
            </div>
          </div>
          <!--<div class="row"><div class="col-md-12"><div class="separator"></div></div></div>
          <div class="row">
            <div class="col-md-6 offset-md-1 imovel__default-subtitle-box">
              <p class="imovel__default-subtitle">Localização e distâncias</p>
            </div>
          </div>-->
        </div>
      </div>
      <!--<div class="background-gradient">
        <div class="container">
          <div class="row">
            <div class="col-md-5"></div>
          </div>
        </div>
        <div class="mapa"></div>
      </div>-->
      <div class="container bairro" v-if="bairro">
        <div class="row not-mobile"><div class="col-md-12"><div class="separator"></div></div></div>
        <div class="row not-mobile">
          <div class="col-md-6 offset-md-1 imovel__default-subtitle-box">
            <p class="imovel__default-subtitle">O bairro</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-5 col-xs-12">
            <div class="relative bairro-container">
              <img :src="bairro.binario" alt="Imagem do bairro" aria-hidden="true" class="bairro__imagem-bairro" />
              <div class="mobile-bairro mobile-only">  
                <p class="mobile-bairro__title">O bairro</p>  
                <h4 class="bairro__title">{{ bairro.cidade_bairro }}</h4>
              </div>
            </div>
          </div>
          <div class="col-md-7 not-mobile">
            <h4 class="bairro__title">{{ bairro.cidade_bairro }}</h4>
            <nuxt-link :to="'/imoveis?tipo='+(dadosImovel.ofertas[0].tipo_oferta==2?'compra':'aluguel')+'&bairroImovel='+bairro.ra" class="bairro__link">Ver todos imóveis desta região</nuxt-link>
          </div>
        </div>
      </div>
      <div class="background-gradient bairro-gradient" :class="{'bairro-gradient--comercial': dadosImovel.imovel.finalidade == 'Comercial'}" v-if="bairro">
        <div class="container">
          <div class="row">
            <div class="offset-md-5 col-md-7">
              <!--<p class="bairro__subtitle">Às margens do Lago Paranoá, sendo assim uma das regiões mais valorizadas de Brasília</p>-->
              <p class="bairro__text" v-html="bairro.descricao"></p>
              <nuxt-link :to="'/imoveis?tipo='+(dadosImovel.ofertas[0].tipo_oferta==2?'compra':'aluguel')+'&bairroImovel='+bairro.ra" class="bairro__link mobile-only">Ver todos imóveis desta região</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="container relacionados" v-if="this.primeiroRetorno && this.primeiroRetorno.imoveis.length >= 1">
        <div class="row"><div class="col-md-12"><div class="separator"></div></div></div>
        <div class="row">
          <div class="col-md-6 offset-md-1 imovel__default-subtitle-box">
            <p class="imovel__default-subtitle">Você também pode gostar de</p>
          </div>
        </div>
        <div class="col-md-12 lista-imoveis">
          <div v-for="imv in this.primeiroRetorno.imoveis" v-bind:key="imv.imovel.codigo_imovel" class="lista-imoveis__imovel imovel imovel--tabela">
            <cardImoveis :imovel="imv" tipoVisualizacao="tabela" />
          </div>
        </div>
      </div>

    <!--<div class="container">
      <div class="row"><div class="col-md-12"><div class="separator"></div></div></div>
    </div>-->
    </div>
    <!-- MODAL ALERT -->
    <modal tabindex="-1" :adaptive="true" role="dialog" :id="'mdl-comparativo-'+imovelData.codigo_imovel" :name="'mdl-comparativo-'+imovelData.codigo_imovel">
        <div class="myModal">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Comparativo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <p v-if="!maisDe3imoveisNaListaCompare || imovelNaListaCompare">Imovel {{isCompare?'incluído no':'excluído do'}} comparativo.</p>
            <p v-else>Você já possui 3 imoveis no comparativo. Para incluir um novo remova um destes.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="$modal.hide('mdl-comparativo-'+imovelData.codigo_imovel)">Continuar Navegando</button>
                <button type="button" class="btn btn-primary" @click="irComparativo()">Ir para comparativo</button>
            </div>
            </div>
        </div>
    </modal>
    <modal tabindex="-1" role="dialog" name="modal-galeria" :adaptive="true" width="80%" height="80%">
      <client-only>
        <div class="close-me">
          <a href="#" @click.prevent="$modal.hide('modal-galeria')">
            Fechar (x)
          </a>
        </div>
        <splide :options="splideOptionsGallery">
          <splide-slide v-for="foto in dadosImovel.fotos" v-bind:key="foto._id" >
            <img :src="foto.url_arquivo" :alt="foto.foto_titulo" />
          </splide-slide>
        </splide>
      </client-only>
    </modal>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
import loading from '../../../components/common/loading'
import cardImoveis from '../../../components/cardImoveis'
import utils from '../../../utils/functions.js'
import getSiteMeta from "../../../utils/meta";

export default {
  components: {
    loading, cardImoveis
  },
  async asyncData({ $content, params }) {
    try {
      const imovelData = await $content('imoveis', params.id).fetch()
      return { imovelData }
    } catch(e) {
      const imovelData = {codigo_imovel: params.id}
      return { imovelData }
    }
    
  },
  computed: {
      ...mapState(['favoritos','compare']),
      maisDe3imoveisNaListaCompare: function(){
            return this.compare.length == 3 ? true:false
      },
      imovelNaListaCompare : function(){
            return (this.compare.find(com => com == this.imovelData.codigo_imovel)) ? true:false
      },
      meta() {
        if (this.imovelData.titulo){
          const metaData = {
            type: "website",
            url: "https://thaisimobiliaria.com.br/imovel/detalhes/"+this.imovelData.codigo_imovel,
            title: this.imovelData.titulo,
            description: "Veja este imóvel que encontrei na Thaís",
            picture: this.imovelData.foto,
            site_name: "Thaís Imobiliária"
          };
          return getSiteMeta(metaData);
        } else {
          return getSiteMeta({});
        }
    }
  },
  head() {
    return {
      title: 'Thaís Imobiliária - '+this.imovelData.titulo,
      meta : [
        ...this.meta
      ]
    }
  },
  watch: {
    $route: {
      immediate: true,  
      handler(to) {       
        this.getImovel(this.imovelData.codigo_imovel?this.imovelData.codigo_imovel:this.params.id)
        this.isCompare = this.imovelNaListaCompare
        this.imovTitle = to.query.title
      }
    }
  },
  data() {
    return {
      primeiroRetorno: null,
      segundoRetorno: null,
      imovTitle: null,
      favorito: false,
      isCompare: false,
      dadosImovel:{},
      carregando: true,
      bairro: {},
      enderecoQuinto: '',
      verTexto: false,
      splideOptions: {
			  	rewind : true,
          width  : '100%',
          cover: true,
          perPage: 3,
          //autoplay: true,
          pauseOnHover: true,
          lazyload: true,
          breakpoints: {
            768: {
              perPage: 1,
              fixedWidth: '100%',
            },
          }
      },
      splideOptionsGallery: {
			  	rewind : true,
          width  : '100%',
          cover: true,
          perPage: 1,
          //autoplay: true,
          pauseOnHover: true,
          lazyload: true,
          breakpoints: {
            768: {
              perPage: 1,
              fixedWidth: '100%',
            },
          }
      },
    }
  },
  methods: {
    async getImovel(codigo_imovel){
      if (process.client) {
        this.carregando = true
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')

        this.$imoveis.getImoveisByIdImovel(token,codigo_imovel).then(ret => {
          this.dadosImovel = ret.data
          this.favorito = this.favoritos.find(fav => fav == this.dadosImovel.codigo_imovel)? true: false

          this.enderecoQuinto = this.getUrlQUinto(this.dadosImovel.imovel.observacao);
          // axios.get(
          //     'https://www.cepaberto.com/api/v3/cep?cep='+this.imovel.cep,
          //     {headers: {'Authorization': 'Token token=160f2bf9d3632035f342253f6c23c8ef'}}
          //     )
          //   .then(response => console.log(response))
          //   .catch(error => console.log(error))

          this.getInformacoesBairro(ret.data.imovel.bairro)
          this.getPrimeiroRetorno()
        }).catch(err=>{
          console.log('ERRO -> ',err)
        }).finally(() => {
          this.carregando = false;
        })
      }
    },
    getUrlQUinto(obs) {
      const arrayURL = obs.split('https://www.quintoandar.com.br/imovel/');
      if(arrayURL[1]) {
        return 'https://www.quintoandar.com.br/imovel/'+arrayURL[1].split('/agendar')[0]+'/agendar';
      } else {
        return '';
      }
    },
    setFavorito(){
        this.$store.commit('toggleFav', this.dadosImovel.codigo_imovel)
        this.favorito = !this.favorito
        this.$emit('afterClickFavorito')
    },
    async getInformacoesBairro(ra){      
      if (process.client) {
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        this.$bairros.getBairro(token,ra).then(ret=>{
          this.bairro = ret.data;
        });
      }
    },
    getTotal(oferta){
      return (
        oferta.preco_oferta +
        (oferta.preco_condominio?oferta.preco_condominio:0) +
        (oferta.preco_iptu?oferta.preco_iptu:0)).toLocaleString('pt-BR',{minimumFractionDigits: 2})
    },
    handleVisita(){
      if(!this.enderecoQuinto){
        document.querySelector('.whatsapp').click();
      } else {
        window.location.href=this.enderecoQuinto;
      }
    },
    setCompare(){
        if(!this.maisDe3imoveisNaListaCompare || this.imovelNaListaCompare){
            this.$store.commit('toggleCompare', this.dadosImovel.codigo_imovel);
            this.isCompare = this.imovelNaListaCompare;
        }
        this.$modal.show('mdl-comparativo-'+this.imovelData.codigo_imovel);
    },
    irComparativo() {
        this.$modal.show('mdl-comparativo-'+this.imovelData.codigo_imovel);
        this.$router.push('/compare');
    },
    async getPrimeiroRetorno() {
      if (process.client) {
        const termoBusca = {
          'ofertas.tipo_oferta': this.dadosImovel.ofertas[0].tipo_oferta,
          'finalidade': this.dadosImovel.imovel.finalidade
        };
        let params = {
          limit: 5,
          page: 1,
          sort: {'imovel.cidade': 'asc'},
          termoBusca: termoBusca
        };
        params.finalidade = [this.dadosImovel.imovel.finalidade];
        params.tipo_imovel = [this.dadosImovel.imovel.tipo_imovel];
        params.bairro = [this.dadosImovel.imovel.bairro];
        params.maximoPreco = parseInt(this.dadosImovel.ofertas[0].preco_oferta,10)+(this.dadosImovel.ofertas[0].tipo_oferta==1?300:30000)
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        this.$imoveis.getImoveisByFiltro(token,params).then(ret => {
          this.primeiroRetorno= ret.data;
          const codigo = this.dadosImovel.codigo_imovel;
          if(this.primeiroRetorno.imoveis.length >= 2) {
            const imoveis = this.primeiroRetorno.imoveis.filter(function (imovel) {
              return imovel.codigo_imovel != codigo
            })
            this.primeiroRetorno.imoveis = imoveis
          } if (this.primeiroRetorno.imoveis.length < 4) {
            this.getSegundoRetorno(this.primeiroRetorno.imoveis.length)
          }
        }).catch(err=>{
          console.log('ERRO -> ',err)
        }).finally(() => true)
      }
    },
    async getSegundoRetorno(size) {
      if (process.client) {
        const termoBusca = {
          'ofertas.tipo_oferta': this.dadosImovel.ofertas[0].tipo_oferta,
          'finalidade': this.dadosImovel.imovel.finalidade
        };
        let params = {
          limit: 8,
          page: 1,
          sort: {'imovel.cidade': 'asc'},
          termoBusca: termoBusca
        };
        params.finalidade = [this.dadosImovel.imovel.finalidade];
        params.bairro = [this.dadosImovel.imovel.bairro];
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        this.$imoveis.getImoveisByFiltro(token,params).then(ret => {
          this.segundoRetorno = ret.data;
          const codigo = this.dadosImovel.codigo_imovel;
          if(this.segundoRetorno.imoveis.length > 0) {
            let primeiro = this.primeiroRetorno.imoveis.map(function(imovel2){
              return imovel2.codigo_imovel
            })
            primeiro.push(this.dadosImovel.codigo_imovel)
            const imoveis = this.segundoRetorno.imoveis.filter(function (imovel) {
              return !primeiro.includes(imovel.codigo_imovel)
            })
            this.segundoRetorno.imoveis = imoveis
          } if (this.segundoRetorno.imoveis.length > 4-size) {
            this.segundoRetorno.imoveis = this.segundoRetorno.imoveis.slice(0, 4-size)
          }
          this.primeiroRetorno.imoveis = this.primeiroRetorno.imoveis.concat(this.segundoRetorno.imoveis)
        }).catch(err=>{
          console.log('ERRO -> ',err)
        }).finally(() => true)
      }
    },
    share() {
        utils.shareButton(this.dadosImovel.codigo_imovel, this.dadosImovel.imovel.titulo_imovel, document.location.origin+'/imovel/detalhes/'+this.dadosImovel.codigo_imovel);
    }
  },
  mounted() {
  },

}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/_variables.scss';
.main {
  @include sm {
    padding-top: 75px;
  }
}

.banner {
  width: 100%;
  height: 400px;
  display: block;
  position: relative;
  @include sm {
    height: 470px;
  }
}

.big-slider {
  background: #000;
  height: 100%;
  width: 100%;
  display: block;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    background: linear-gradient(180deg, rgba(64,64,64,0) 0%, #181818 100%);
    bottom: 0;
    left: 0;
    right: 0;
    top: 45%;
    @include sm {
      background: linear-gradient(180deg, rgba(64, 64, 64, 0) 0%, #181818 90%, #181818 100%);
      top: 60%;
    }
  }
  .gallery-call {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 15%;
    right: 15%;
    display: block;
    z-index: 100;
  }
}

.container--dados-imovel {
  position: relative;
  &:before {
    @include sm {
      content: '';
      height: 200px;
      left: 0;
      right: 0;
      background: #404040;
      position: absolute;
    }
  }
}

.container--dados-imovel .imovel {
  position: relative;
  transform: translateY(-100px);
}

.title {
  margin-bottom: 43px;
}

.main-title {
  color: #FFF;
  font-size: 1.5em;
  line-height: 1.3em;
  font-weight: 400;
  margin: 0;
  line-clamp: 3;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  -webkit-box-orient: vertical;
  @include sm {
    font-size: 1.25rem;
    line-height: 1.5rem;
    text-align: center;
    min-height: 50px;
  }
}

  .main-title__highlight {
    color: inherit;
    font-weight: 800;
  }

  .row--dados {
    @include sm {
      padding-top: 570px;
    }
  }

  .ticket {
    @include sm {
      top: 170px;
    }
  }

  .numbers__number {
    @include sm { 
      color: #FFF;
    }
  }

  .bairro {
    @include sm {
      z-index: 1;
      position: relative;
    }
  }

  .bairro-container {
    @include sm {
      border-radius: 10px;
    }
  }

  .mobile-bairro {
    @include sm {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 74px 16px 16px;
      background: linear-gradient(180deg, rgba(64, 64, 64, 0) 0%, #404040 100%);
      border-radius: 0 0 10px 10px;
    }
  }

  .mobile-bairro__title {
    color: #FFF;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.140em;
    font-weight: 600;
    margin-bottom: 14px;
  }

  .bairro-gradient {
    @include sm {
      padding-top: 165px;
      margin-top: -140px;
      position: relative;
      z-index: 0;
    }
  }

  .corretor {
    border: 1px solid $sec-font-color;
    border-radius: 15px;
    padding: 23px 30px 30px 30px;
    margin-top: 100px;
    position: relative;
  }

    .corretor__call {
      padding-left: 85px;
      margin-bottom: 11px;
      font-size: 0.75rem;
      font-weight: 600;
      color: $sec-font-color;
      text-transform: uppercase;
    }

    .corretor__nome {
      font-weight: 600;
      font-size: 1.875rem;
      line-height: 1.13em;
      margin: 0;
    }

    .corretor__foto {
      width: 70px;
      height: 70px;
      border-radius: 35px;
      background-size: cover;
      position: absolute;
      top: 0;
      left: 30px;
      transform: translateY(-50%);
    }

.close-me {
  width: 100%;
  padding: 5px;
  background: #000;
  text-align: right;
  a {
    color: #FFF;
  }
}
</style>