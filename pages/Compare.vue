<template>
  <div class="main row d-flex justify-content-center">
    <h1 class="sr-only">Comparativo de imóveis</h1>
    <div class="container container--imoveis">
      <div class="compare">
        <div class="compare__linha">
          <div class="compare__align-top compare__coluna compare__coluna--grow">
            <h2 class="title__text">
              <a href="#" @click="$router.go(-1)" class="title__link"><img src="/images/arrow-left.svg" alt="Voltar" class="title__icon"></a>
              <span class="title__title">Comparativo</span>
            </h2>
          </div>
          <div class="compare__coluna" v-for="i in 3" :key="i">
            <div class="compare__imagem" v-if="comparativoPorCampos.cabecalho && comparativoPorCampos.cabecalho[(i-1)]">
              <button class="compare__small-button compare__small-button--white" alt="Excluir imóvel da comparação" @click.prevent="setCompare(comparativoPorCampos.cabecalho[(i-1)].codigo_imovel)"></button>
              <div :style="`background-image:url('${comparativoPorCampos.cabecalho[(i-1)].foto}');`" :alt="comparativoPorCampos.cabecalho[(i-1)].titulo_imovel" class="compare__foto" :title="comparativoPorCampos.cabecalho[(i-1)].titulo_imovel"></div>
            </div>
            <div class="compare__imagem" v-else>
              <span class="compare__small-button compare__small-button--red" alt="Excluir imóvel da comparação"></span>
              <div class="compare__foto compare__foto--fallback"></div>
            </div>
          </div>
        </div>
        <div class="compare__linha">
          <div class="compare__coluna compare__coluna--shrink">&nbsp;</div>
          <div class="compare__coluna compare__titulo" v-for="(imv, index) in comparativoPorCampos.cabecalho" :key="index">{{imv.bairro}}</div>
          <div class="compare__coluna">&nbsp;</div>
        </div>
        <div class="compare__linha lined">
          <div class="compare__coluna compare__legend"><span>Valor total/mês</span></div>
          <div :class="`compare__coluna compare__atributo ${imv.isBest && imv.valor_total_mes != 0?'compare__atributo--best':''}`" v-for="(imv, index) in comparativoPorCampos.valor_total_mes" :key="index">R${{imv.valor_total_mes !=0?imv.valor_total_mes:'-'}}</div>
        </div>
        <div class="compare__linha lined">
          <div class="compare__coluna compare__legend"><span>Quartos</span></div>
          <div :class="`compare__coluna ${imv.qtd_quartos !=0?'compare__atributo':''} ${imv.isBest && imv.qtd_quartos!=0?'compare__atributo--best':''}`" v-for="(imv, index) in comparativoPorCampos.qtd_quartos" :key="index">{{imv.qtd_quartos!=0?imv.qtd_quartos:'-'}} <span>{{ getLabel('quarto',imv.qtd_quartos) }}</span> </div>
        </div>
        <div class="compare__linha lined">
          <div class="compare__coluna compare__legend"><span>Vaga</span></div>
          <div :class="`compare__coluna ${imv.qtd_vagas !=0?'compare__atributo':''} ${imv.isBest && imv.qtd_vagas!=0?'compare__atributo--best':''}`" v-for="(imv, index) in comparativoPorCampos.qtd_vagas" :key="index">{{imv.qtd_vagas!=0?imv.qtd_vagas:'-'}} <span>{{ getLabel('vaga',imv.qtd_vagas) }}</span> </div>
        </div>
        <div class="compare__linha lined">
          <div class="compare__coluna compare__legend"><span>Banheiros</span></div>
          <div :class="`compare__coluna ${imv.qtd_banheiros !=0?'compare__atributo':''} ${imv.isBest && imv.qtd_banheiros !=0?'compare__atributo--best':''}`" v-for="(imv, index) in comparativoPorCampos.qtd_banheiros" :key="index">{{imv.qtd_banheiros != 0?imv.qtd_banheiros:'-'}} <span>{{ getLabel('banheiro',imv.qtd_banheiros) }}</span> </div>
        </div>
        <div class="compare__linha lined">
          <div class="compare__coluna compare__legend"><span>Área do imóvel</span></div>
          <div :class="`compare__coluna compare__atributo ${imv.isBest && imv.area_total !=0?'compare__atributo--best':''}`" v-for="(imv, index) in comparativoPorCampos.area_total" :key="index">{{imv.area_total !=0?imv.area_total+' '+imv.unidade_metrica.toLowerCase() :'-'}}</div>
        </div>
        <div class="compare__linha compare__buttons">
          <div class="compare__coluna compare__coluna--shrink">&nbsp;</div>
          <div class="compare__coluna" v-for="(imv, index) in comparativoPorCampos.cabecalho" :key="index">
            <nuxt-link class="button button--primary" :to="{ name: 'imovel', params: {id: imv.codigo_imovel}}">Detalhes</nuxt-link>
          </div>
          <div class="compare__colun ">&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '../utils/functions'
import {mapState} from 'vuex'
export default {
  name: 'Compare',
  metaInfo() {
      return { 
          title: "Thaís Imobiliária imovéis para venda e locação",
          meta: [
              { name: 'description', content:  'Thaís Imobiliária imovéis para venda e locação'},
              { name: 'keywords', content: 'vendadeimoveis,locaçãodeimoveis,guara,asasul,asanorte,aguasclaras,sudoeste,noroeste,brasilia,apartamento,casa,imobiliariabrasilia'},
              { property: 'og:title', content: "Thaís Imobiliária"},
              { property: 'og:description', content: "Thaís Imobiliária imovéis para venda e locação"},
              { property: 'og:site_name', content: 'Thaís Imobiliária'},
              {property: 'og:url', content: 'https://novo.thaisimobiliaria.com.br'},   
              {property: 'og:type', content: 'website'},   
              {property: 'og:image:width', content: '550'},
              {property: 'og:image:height', content: '309'}, 
              {property: 'og:image:height', content: 'https://managing-images.kenlo.io/unsafe/600x400/filters:quality(100)/storage.googleapis.com/kenlo-sites-images/VWRCUkQ2Tnp3d1BJRDBJVe1s0xgxSbBGOsBT9+RO1zjks-ynciLnlXpdKzsuCVZKPvMZhGt-GI0v+QFtypVh7xY3icsFUfjv4HHembm5wv7fiGO536-3h5Ts7uLDcYCHkIkx36P+GAOhv-Q1TYF+Yx0oNrkjGhayU4mMNSFcqnywpkzMApYcDjsIkihq3TwLiXGSRtX2r1N9gXmfBv-V53TUCe28WXh7OsFfAttJ8h8PpwKpSRFyvwoXqw==.png'}, 
              {name: 'robots', content: 'index,follow'} 
          ]
      }
  },
  watch: {
      $route: {
          immediate: true,  
          handler(to) {       
            this.getImoveis()
          }
      }
  },
  computed: {
     ...mapState(['favoritos','compare']),
  },
  data() {
    return {
      carregando: true,
      showMap: true,
      tipoVisualizacao: 'tabela',
      retImoveis:{},
      paramsPagina: {
        limit: 3,
        page:1,
        sort: {'imovel.cidade': 'asc'}, 
      },
      comparativo:[],
      comparativoPorCampos: {}
    }
  },
  methods: {
    async getImoveis(){
      if (process.client) {
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        
        // AQUI BASTA OBTER OS "codigo_imovel" SALVOS NO FAVORITOS E PASSAR COMO OBJETO DE codigo_imovel EX: codigo_imovel: ['AP9972','CA3197']
        this.paramsPagina.termoBusca = {codigo_imovel: this.compare}
        
        this.carregando = true
        this.$imoveis.buscaParametrizada(token,this.paramsPagina).then(ret => {
          this.retImoveis= ret.data.imoveis
          this.montarComparativo()
        }).catch(err=>{
          console.log('ERRO -> ',err)
        }).finally(() => this.carregando = false)
      }
    },
    setCompare(codigo){
      this.$store.commit('toggleCompare', codigo);
      location.reload();
    },
    montarComparativo(){
      if(this.retImoveis){
        this.retImoveis.forEach(imv => {
          let foto = imv.fotos.find(ft => {return ft.principal})? imv.fotos.find(ft => {return ft.principal}): imv.fotos[0]
          this.comparativo.push({
            codigo_imovel: imv.codigo_imovel,
            titulo_imovel:imv.imovel.titulo_imovel,
            bairro:imv.imovel.bairro,
            foto: foto.url_arquivo,
            
            valor_total_mes:imv.ofertas[0].preco_oferta,

            qtd_quartos:imv.imovel.qtd_dormitorios?imv.imovel.qtd_dormitorios:0,

            qtd_vagas: imv.imovel.qtd_vagas?imv.imovel.qtd_vagas:0,
            qtd_banheiros: imv.imovel.qtd_banheiros?imv.imovel.qtd_banheiros:0,
            area_total: imv.imovel.area_total,
            unidade_metrica : imv.imovel.unidade_metrica
          })
        });
        this.montarComparativoPorCampos()
      }
    },
    montarComparativoPorCampos(campo){
      this.comparativoPorCampos = {
          cabecalho:[],
          valor_total_mes:[],
          qtd_quartos:[],
          qtd_vagas:[],
          qtd_banheiros:[],
          area_total:[],
          // codigo_best_imovel:''
        }

      // CABECALHO
      this.comparativo.forEach(imv => {
        this.comparativoPorCampos.cabecalho.push({
          codigo_imovel: imv.codigo_imovel,
          titulo_imovel:imv.titulo_imovel,
          bairro:imv.bairro,
          foto: imv.foto
        })
      });
      
      // valor_total_mes
      this.comparativo.forEach(imv => {
        this.comparativoPorCampos.valor_total_mes.push({
          codigo_imovel: imv.codigo_imovel,
          valor_total_mes:imv.valor_total_mes,
          isBest: this.isBest('valor_total_mes','menor',imv)
        })
      });

      // qtd_quartos
      this.comparativo.forEach(imv => {
        this.comparativoPorCampos.qtd_quartos.push({
          codigo_imovel: imv.codigo_imovel,
          qtd_quartos: imv.qtd_quartos,
          isBest: this.isBest('qtd_quartos','maior',imv)
        })
      });

      // qtd_vagas
      this.comparativo.forEach(imv => {
        this.comparativoPorCampos.qtd_vagas.push({
          codigo_imovel: imv.codigo_imovel,
          qtd_vagas: imv.qtd_vagas,
          isBest: this.isBest('qtd_vagas','maior',imv)
        })
      });

      // qtd_banheiros
      this.comparativo.forEach(imv => {
        this.comparativoPorCampos.qtd_banheiros.push({
          codigo_imovel: imv.codigo_imovel,
          qtd_banheiros: imv.qtd_banheiros,
          isBest: this.isBest('qtd_banheiros','maior',imv)
        })
      });

      // area_total
      this.comparativo.forEach(imv => {
        this.comparativoPorCampos.area_total.push({
          codigo_imovel: imv.codigo_imovel,
          area_total: imv.area_total,
          unidade_metrica : imv.unidade_metrica,
          isBest: this.isBest('area_total','maior',imv)
        })
      });
    },
    isBest(campo,operacao,imovel){
      if(operacao == 'maior'){
        return this.comparativo.find(imv => {return imv.codigo_imovel != imovel.codigo_imovel && parseInt(imv[campo]) > parseInt(imovel[campo])})? false:true
      }else{
        return this.comparativo.find(imv => {return imv.codigo_imovel != imovel.codigo_imovel && parseInt(imv[campo]) < parseInt(imovel[campo])}) ? false:true
      }

    },
    getLabel(label,qtd) {
      if(qtd!=0){
        return qtd>1?label+'s':label;
      } else {
        return '';
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/_variables.scss';
.title__text {
  margin-bottom: 0;
}

  .compare{
    width: 100%;
    font-size: 1.25rem;
    line-height: 2rem;
    @include sm {
      font-size: 0.75rem;
      line-height: 0.8125rem;
      letter-spacing: 0.080em;
    }
  }

  .compare__linha {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    @include sm {
      flex-wrap: wrap;
      gap: 10px;
    }
  }

  .compare__coluna {
    width: 25%;
    position: relative;
    @include sm {
      width: auto;
      max-width: calc(33% - 6.66px);
      flex-grow: 1;
    }
  }

  .compare__coluna--grow {
    @include sm {
      width: 100%;
      max-width: none;
    }
  }

  .compare__coluna--shrink {
    @include sm {
      display: none;
    }
  }

  .compare__align-top {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
  }

  .compare__legend {
    font-weight: 400;
    @include sm {
      width: 100%;
      max-width: none;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      text-transform: uppercase;
      font-weight: 600;
      margin: 30px 0 10px;
      span {
        color: $sec-font-color;
      }
      &:before,
      &:after {
        content: '';
        height: 1px;
        background: #EDEDED;
        width: auto;
        flex-grow: 1;
      }
    }
    span {
      background: #FFF;
      margin: 0 10px;
    }
  }

.lined {
  border-bottom: 1px solid #CCCCCC;
  @include sm {
    border: none;
  }
  div{
    padding: 20px 0;
    @include sm {
      padding: 0;
    }
  }
}

  .compare__imagem {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  
  .compare__small-button {
    width: 38px;
    height: 38px;
    border: 1px solid $main-color;
    background-color: #FFF;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

    .compare__small-button--red {
      background-color: $main-color;
    }

    .compare__small-button:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .compare__small-button--white:before{
      content: url('/images/close-black.svg');
    }

    .compare__small-button--red:before{
      content: url('/images/plus-white.svg');
    }

  .compare__foto {
    width: 150px;
    height: 111px;
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    position: relative;
    z-index: 1;
    @include sm {
      width: 100%;
      height: 80px;
    }
  }

    .compare__foto--fallback {
      background-color: #EDEDED;
    }

    .compare__foto--fallback:before {
      content:url('/images/casa-fallback.svg');
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .compare__titulo {
      text-align: center;
      padding: 23px 0 17px;
      @include sm {
        padding: 9px 0 13px;
        font-weight: 600;
      }
    }

    .compare__atributo {
      font-weight: 900;
      @include sm {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        font-size: 1rem;
        line-height: 1rem;
        font-weight: 700;
      }
      &:before {
        content: url('/images/radio-off.svg');
        margin-right: 9px;
        @include sm {
          margin: 0 0 5px 0;
        }
      }
      span {
        @include sm {
          margin-top: 3px;
          text-transform: uppercase;
          font-size: 0.75rem;
          line-height: 0.8125rem;
          letter-spacing: 0.080em;
          font-weight: 600;
          color: $sec-font-color;
        }
      }
    }

    .compare__atributo--best {
      color: #35A20C;
      &:before {
        content: url('/images/radio-on.svg');
      }
      span{
        color:#35A20C;
        @include sm {
          color: $sec-font-color;
        }
      }
    }

    .compare__buttons {
        padding-top: 62px;
    }
</style>