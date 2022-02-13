<template>
  <div id="main-home">
    <div class="search-box">
      <span class="search-box__bg"></span>
      <span class="shape"></span>
    </div>
    <div class="search-form-box">
      <div class="search-form">
        <div class="search-form__title-container">
          <h1 class="search-form__title" id="search-title-aluguel">Aluguel simples, com quem tem experiência</h1>
          <h1 class="search-form__title search-form__title--hidden" id="search-title-compra">Compre com segurança e comodidade</h1>
          <h1 class="search-form__title search-form__title--hidden" id="search-title-codigo">Encontre seu imóvel pelo código</h1>
        </div>
        <form class="search-form__form">
          <div class="search-form__options">
            <div class="search-form__option" >
              <input type="radio" id="alugar" name="tipo" v-model="tipo" checked value="aluguel" class="search-form__radio" @change="changeTitle('aluguel')">
              <label for="alugar" class="search-form__label">Alugar</label>
            </div>
            <div class="search-form__option">
              <input type="radio" id="comprar" name="tipo" v-model="tipo" value="compra" class="search-form__radio" @change="changeTitle('compra')">
              <label for="comprar" class="search-form__label">Comprar</label>
            </div>
            <div class="search-form__option">
              <input type="radio" id="codigo" name="tipo" v-model="tipo" value="codigo" class="search-form__radio" @change="changeTitle('codigo')">
              <label for="codigo" class="search-form__label">Encontre pelo código</label>
            </div>
          </div>
          <div class="search-bar">
            <input type="hidden" v-model="finalidade">
            <select name="tipoImovel" class="search-bar__combo" id="tipoImovel" v-model="tipoImovel">
              <option value="">Tipo do imóvel</option>
              <option v-for="tipo in listTipos" :key="tipo" :value="tipo">{{ tipo }}</option>
            </select>
            <div class="search-bar__separator"></div>
            <autocomplete
                :search="search"
                v-if="!showCode"
                placeholder="Digite a região onde quer morar"
                aria-label="Digite a região onde quer morar"
                class="search-bar__input"
              ></autocomplete>
              <autocomplete
                v-if="showCode"
                :search="search"
                placeholder="Digite o código do imóvel"
                aria-label="Digite o código do imóvel"
                class="search-bar__input"
              ></autocomplete>
            <button v-on:click.prevent="getImoveis" class="button button--primary">
              Buscar
            </button>
          </div>
        </form>
        <form class="search-form__form" v-if="1 === 2">
          <div class="search-bar">
            <input type="hidden" v-model="finalidade">
            <autocomplete
                style="padding: 0 10px"
                :search="search"
                placeholder="Digite o código do imóvel"
                aria-label="Digite o código do imóvel"
                class="search-bar__input"
              ></autocomplete>
            <button v-on:click.prevent="getImoveis" class="button button--primary">
              Buscar
            </button>
          </div>
        </form>
        <!--a href="javascript:void(0)" style="margin-top: 10px;display: block" class="a-change-input" v-on:click="showInputCode()" v-if="!showCode">Encontre pelo código</a>
        <a href="javascript:void(0)" style="margin-top: 10px;display: block" class="a-change-input" v-on:click="showInputCode()" v-if="showCode">Voltar aos filtros</a -->
      </div>
    </div>
    <button type="button" class="cta-business" @click="downToBusiness()">
      <p class="cta-business__text">Para o seu negócio</p>
    </button>
    <section class="business" id="business">
      <img src="/images/marmore.png" alt="Fundo mármore" class="business__marble">
      <h2 class="business__title">
        <span>A porta</span>
        <span>de entrada</span>
        <span>do seu</span>
        <span>negócio</span>
      </h2>
      <div class="business-thais">
        <div class="business-thais__title">
          <span></span>
          <h3>Vamos ajudar você a encontrar o lugar ideal para sua ideia</h3>
        </div>
        <img src="/images/thais-negocios.svg" alt="Fundo Thaís Negócios" class="business-thais__image">
      </div>
      <div class="business__options">
        <!--<a href="#" class="business-button">
          <span class="business-button__text">Ainda não sei o que preciso</span>
          <span class="business-button__arrow"></span>
        </a>-->
        <a href="#" class="business-button" v-on:click.prevent="$router.push({ path: '/imoveis-comerciais', query: { tipo: 'aluguel', finalidadeImovel: 'Comercial' } })">
          <span class="business-button__text">Encontre o imóvel para seu negócio</span>
          <span class="business-button__arrow"></span>
        </a>
      </div>
    </section>
    <section class="about">
      <img src="/images/experiencia.svg" alt="É mais fácil contar com a experiência" class="about__image">
      <div v-if="this.windowWidth > 768" class="doubts__list">
        <div class="doubt-box">
          <img src="~assets/images/logo_rede.png" alt="Thaís Imobiliária" class="doubt-box__icon doubt-box__icon--big">
        </div>

        <div class="doubt-box">
          <img src="/images/mais40.svg" alt="Ícone 40 anos" class="doubt-box__icon">
          <p class="doubt-box__text">A união entre experiência e modernidade</p>
        </div>

        <div class="doubt-box">
          <img src="/images/respeito.svg" alt="Ícone respeito" class="doubt-box__icon">
          <p class="doubt-box__text">Respeito pelo o que você procura</p>
        </div>

        <div class="doubt-box">
          <img src="/images/equipe.svg" alt="Ícone equipe" class="doubt-box__icon">
          <p class="doubt-box__text">Uma equipe que oferece o seu melhor</p>
        </div>
      </div>
      <div v-else class="mobile-about">
        <img src="/images/logo-thais.svg" alt="Thaís Imobiliária" class="doubt-box__icon doubt-box__icon--big">
        <carousel-3d :width="200" :height="200" :autoplay="true" :autoplayTimeout="5000">
          <slide :index="0">
            <div class="doubt-box">
              <img src="/images/mais40.svg" alt="Ícone 40 anos" class="doubt-box__icon">
              <p class="doubt-box__text">A união entre experiência e modernidade</p>
            </div>
          </slide>
          <slide :index="1">
            <div class="doubt-box">
              <img src="/images/respeito.svg" alt="Ícone respeito" class="doubt-box__icon">
              <p class="doubt-box__text">Respeito pelo o que você procura</p>
            </div>
          </slide>
          <slide :index="2">
            <div class="doubt-box">
              <img src="/images/equipe.svg" alt="Ícone equipe" class="doubt-box__icon">
              <p class="doubt-box__text">Uma equipe que oferece o seu melhor</p>
            </div>
          </slide>
        </carousel-3d>
      </div>
    </section>
    <div style="display:none">
      <img src="/images/novo-site.svg" alt="">
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'


export default {
  name: 'home',
  components: {
    //Carousel3d,
    //Slide,
    Autocomplete,
    Header,
    Footer
  },
  computed: {
      ...mapState(['windowWidth']),
  },
  data(){
    return {
      textoBusca: '',
      tipo: 'aluguel',
      finalidade: 'Residencial',
      tipoImovel: '',
      listTipos: [
        'Apartamento',
        'Apartamento Duplex',
        'Casa',
        'Cobertura',
        'Flat',
        'Kitnet'
      ],
      bairro: '',
      showCode: false,
      listBairros: [],
      allBairros: [
          {
              "bairro": "Águas Claras",
              "bairros": [
                  "Águas Claras",
                  "Águas Claras Norte",
                  "Águas Claras Sul",
                  "Areal",
                  "Norte",
                  "Sul",
                  "Setor Habitacional Arniqueiras"
              ]
          },
          {
              "bairro": "Ceilândia",
              "bairros": [
                  "Ceilândia",
                  "Ceilândia Centro",
                  "Ceilândia Norte",
                  "Ceilândia Sul"
              ]
          },
          {
              "bairro": "Samambaia",
              "bairros": [
                  "Samambaia",
                  "Samambaia Norte",
                  "Samambaia Sul"
              ]
          },
          {
              "bairro": "Taguatinga",
              "bairros": [
                  "Taguatinga",
                  "Taguatinga Norte",
                  "Taguatinga Sul"
              ]
          },
          {
              "bairro": "Plano Piloto",
              "bairros": [
                  "Asa Norte",
                  "Asa Sul"
              ]
          },
          {
              "bairro": "Asa Norte",
              "bairros": [
                  "Asa Norte"
              ]
          },
          {
              "bairro": "Asa Sul",
              "bairros": [
                  "Asa Sul"
              ]
          },
          {
              "bairro": "Planaltina",
              "bairros": [
                  "Planaltina"
              ]
          },
          {
              "bairro": "Recanto das Emas",
              "bairros": [
                  "Recanto das Emas"
              ]
          },
          {
              "bairro": "Guará",
              "bairros": [
                  "Guará",
                  "Guará I",
                  "Guará II",
                  "Polo de Modas",
                  "Zona Industrial",
                  "Quadras Econômicas Lúcio Costa"
              ]
          },
          {
              "bairro": "Cruzeiro",
              "bairros": [
                  "Cruzeiro",
                  "Cruzeiro Novo",
                  "Cruzeiro Velho"
              ]
          },
          {
              "bairro": "Vicente Pires",
              "bairros": [
                  "Vicente Pires"
              ]
          },
          {
              "bairro": "Sudoeste",
              "bairros": [
                  "Sudoeste"
              ]
          },
          {
              "bairro": "Octogonal",
              "bairros": [
                  "Octogonal"
              ]
          },
          {
              "bairro": "Riacho Fundo",
              "bairros": [
                  "Riacho Fundo"
              ]
          },
          {
              "bairro": "Riacho Fundo II",
              "bairros": [
                  "Riacho Fundo II"
              ]
          },
          {
              "bairro": "Jardins Mangueiral",
              "bairros": [
                  "Jardins Mangueiral"
              ]
          },
          {
              "bairro": "Candangolândia",
              "bairros": [
                  "Candangolândia"
              ]
          },
          {
              "bairro": "Paranoá",
              "bairros": [
                  "Paranoá"
              ]
          },
          {
              "bairro": "Lago Norte",
              "bairros": [
                  "Lago Norte",
                  "Setor de Habitações Individuais Norte"
              ]
          },
          {
              "bairro": "Lago Sul",
              "bairros": [
                  "Lago Sul",
                  "Setor de Habitações Individuais Sul"
              ]
          },
          {
              "bairro": "Jardim Botânico",
              "bairros": [
                  "Jardim Botânico",
                  "Setor Habitacional Jardim Botânico"
              ]
          },
          {
              "bairro": "Park Way",
              "bairros": [
                  "Park Way"
              ]
          },
          {
              "bairro": "Park Sul",
              "bairros": [
                  "Park Sul"
              ]
          },
          {
              "bairro": "Noroeste",
              "bairros": [
                  "Noroeste"
              ]
          },
          {
              "bairro": "Gama",
              "bairros": [
                  "Gama",
                  "Setor Industrial",
                  "Setor Leste",
                  "Setor Oeste"
              ]
          },
          {
              "bairro": "Sobradinho",
              "bairros": [
                  "Sobradinho",
                  "Sobradinho II",
                  "Setor Hab. Contagem"
              ]
          }
      ],
    }
  },
  methods: {
    getImoveis() {
      let params = {
        finalidadeImovel: this.finalidade,
        tipo: this.tipo
      }
      if(this.tipoImovel) {
        params.tipoImovel = this.tipoImovel;
      }
      let bairros = this.getBairrosList();
      if(bairros.length >= 1) {
        params.bairroImovel = bairros;
      }

      if (this.showCode) {
        let input = document.querySelector('.search-bar__input').querySelector('input');
        let value = input.value;
        params = {
          codigoImovel: value
        }
      }

      this.$router.push({ name: 'imoveis', query: params })
    },
    showInputCode(){
      this.showCode = !this.showCode;
    },
    hideHints() {
      const el = document.getElementById('hints');
      const style = window.getComputedStyle(el);
      if(style.display != 'none'){
        el.style.display = 'none';
      }
    },
    addPlaceholder() {
      document.getElementById('search').placeholder = 'Encontre seu imóvel';
    },
    changeTitle(type){
      var id1;
      var id2;
      var id3;
      if(type === 'aluguel' && document.getElementById('alugar').checked) {
        // id1 = 'search-title-compra';
        // id2 = 'search-title-aluguel';
        this.showCode = false;
        document.getElementById('search-title-compra').classList.add("search-form__title--hidden")
        document.getElementById('search-title-codigo').classList.add("search-form__title--hidden")
        setTimeout(function(){
          document.getElementById('search-title-aluguel').classList.remove("search-form__title--hidden");
        },500);
      } else if(type === 'compra' && document.getElementById('comprar').checked) {
        // id1 = 'search-title-aluguel';
        // id2 = 'search-title-compra';
        document.getElementById('search-title-aluguel').classList.add("search-form__title--hidden")
        document.getElementById('search-title-codigo').classList.add("search-form__title--hidden")
        setTimeout(function(){
          document.getElementById('search-title-compra').classList.remove("search-form__title--hidden");
        },500);
        this.showCode = false;
      } else if(type === 'codigo' && document.getElementById('codigo').checked) {
        // id1 = 'search-title-aluguel';
        // id2 = 'search-title-compra';
        document.getElementById('search-title-compra').classList.add("search-form__title--hidden")
        document.getElementById('search-title-aluguel').classList.add("search-form__title--hidden")
        setTimeout(function(){
          document.getElementById('search-title-codigo').classList.remove("search-form__title--hidden");
        },500);
        this.showCode = true;
      }
      // document.getElementById(id1).classList.add("search-form__title--hidden");
      // setTimeout(function(){
      //   document.getElementById(id2).classList.remove("search-form__title--hidden");
      // },500);
    },
    downToBusiness(){
      document.getElementById("business").scrollIntoView({
        behavior: 'smooth'
      });
    },
    search(input) {
      if (input.length < 1) { return [] }
      return this.listBairros.filter(bairro => {
        return this.replaceSpecialChars(bairro)
          .toLowerCase()
          .startsWith(this.replaceSpecialChars(input).toLowerCase())
      })
    },
    replaceSpecialChars(str){
        str = str.replace(/[ÀÁÂÃÄÅ]/,"A");
        str = str.replace(/[àáâãäå]/,"a");
        str = str.replace(/[ÈÉÊË]/,"E");
        str = str.replace(/[Ç]/,"C");
        str = str.replace(/[ç]/,"c");
        return str.replace(/[^a-z0-9]/gi,'');
    },
    getBairrosList() {
      let input = document.querySelector('.search-bar__input').querySelector('input');
      let value = input.value;
      let bairros = [];
      if(value) {
        let bairro = this.allBairros.filter((i => {
          return i.bairro === value;
        }));
        if(bairro[0]) {
          bairros = bairro[0].bairros;
        }
      }
      return bairros;
    }
  },
  mounted(){
    if(!document.getElementById('main-home').classList.contains('animated')){
      document.getElementById('main-home').classList.add('animated');
    }
    this.allBairros.forEach(element => {
      this.listBairros.push(element.bairro)
    });
    this.listBairros.sort(function (a, b) {
      return a.localeCompare(b);
    });
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/css/_variables.scss';

  .a-change-input {
    cursor: pointer;

  }

  .a-change-input:hover {
    text-decoration: underline;
  }

  .search-box {
    perspective: 1px;
    overflow: hidden;
    position: relative;
    height: 95vh;
    width: 100%;
    background-color: #e7e4de;
    //REMOVER ESTE APÓS VOLTA DAS SESSÕES
    margin-bottom: 90px;
    @include sm {
    }
  }

  .search-box__bg {
    transform: translateZ(-1px) translateX(-50%) translateY(-50%) scale(2);
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    height: 95vh;
    width: 100%;
    background-image: url('/images/header-home.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: center;
    transition: transform 1s ease-out;
    @include md {
      background-position: bottom center;
    }
    @include sm {
    background-size: auto 100%;
    }
  }

  #main-home.animated .search-box__bg {
    transform:  translateZ(-1px) translateX(-50%) translateY(-50%) scale(2.1);
  }

  .shape {
    z-index: 1;
    width: 200vw;
    height: 300vh;
    border-radius: 50%;
    border: solid 200px white;
    display: block;
    position: absolute;
    bottom: -200px;
    left: 50%;
    transform: translateX(-50%) translateZ(0);
    transition: bottom 1s ease-out;
    @include md {
      width: 300vw;
    }
    @include sm {
      width: 450vw;
    }
  }

  #main-home.animated .shape{
    bottom: -190px;
  }

  .search-form {
    position: absolute;
    top: 200px;
    left: 0;
    width: 100%;
    text-align: center;
    z-index: 5;
    @include sm {
      top: 12vh;
    }
  }

    .search-form__title-container {
      position: relative;
      min-height: 60px;
      @include sm {
        min-height: 100px;
      }
    }

    .search-form__title {
      font-size: 3vw;
      letter-spacing: -0.010em;
      font-weight: 100;
      opacity: 0;
      transition: all 0.5s ease-out 0.3s;
      position: absolute;
      text-align: center;
      width: 100%;
      @include sm {
        top: 50%;
        transform: translateY(-50%);
        font-size: 2.375rem;
        color: $alt-red;
      }
    }

    .search-form__title--hidden {
      opacity: 0;
      transform: translateY(-5%);
    }

    .search-form__subtitle {
      font-size: 1.25rem;
      font-weight: 400;
      margin: 30px 0 10px;
      opacity: 0;
      transition: opacity 0.5s ease-out 0.5s;
    }

    .search-form__form {
      margin-top: 55px;
    }

    .search-form__options {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      opacity: 0;
      transition: opacity 0.5s ease-out 0.9s;
    }

    .search-form__option {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin: 0 15px;
    }

    .search-form__radio {
      display:none;
    }

    .search-form__custom-radio {
      width: 24px;
      height: 24px;
      border-radius: 12px;
      border: 2px solid #{$font-color};
      margin-right: 10px;
      position: relative;
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

    .search-form__label {
      font-size: 0.75rem;
      letter-spacing: 0.080em;
      font-weight: 400;
      text-transform: uppercase;
      cursor: pointer;
      padding: 4px 18px;
      margin: 0;
      border-radius: 8px 8px 0 0;
    }

    .search-form__radio:checked ~ .search-form__label {
      font-weight: 900;
      background-color: #FFF;
    }

  .search-bar {
    background-color: #FFF;
    border: none;
    padding: 10px 6px;
    width: 90%;
    max-width: 730px;
    height: 44px;
    margin: 0 auto;
    border-radius: 22px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.3s ease-in-out,
                border-color 0.3s ease-in-out,
                opacity 0.5s ease-out 0.7s;
    opacity: 0;
    position: relative;
    @include sm {
      width: 90%;
      flex-flow: column nowrap;
      height: auto;
      padding: 10px 10px;
    }
    .button  {
      @include sm {
        width: 100%;
      }
    }
  }
    .search-bar__separator {
      height: 100%;
      width: 1px;
      background: #707070;
      margin: 0 15px 0 15px;
      @include sm {
        display: none;
      }
    }

    .search-bar__combo {
      height: 33px;
      border-radius: 17px 0 0 17px;
      padding-left: 20px;
      font-weight: 600;
      background: #EDEDED;
      border: none;
      @include sm {
        width: 100%;
        border-radius:  17px 17px 0 0;
        margin-bottom: 20px;
      }
    }

    .search-bar__input {
      background: none;
      border: none;
      font-size: 1.25rem;
      font-weight: 400;
      color: #FFF;
      width: 380px;
      z-index: 3;
      transition: all 0.3s ease-in-out;
      @include sm {
        width: 100%;
        margin-bottom: 20px;
      }
      .autocomplete {
        border: none;
      }
    }

    .search-bar__input::placeholder {
      opacity: 0.8;
      color: #fff;
    }

    .search-bar__hints {
      opacity: 0.8;
      position: absolute;
      z-index: 2;
      text-align: left;
      overflow: hidden;
      top: 50%;
      transform: translateY(-50%);
      @include sm {
        width: 80%;
      }
    }

    .search-bar__button {
      background: none;
      border: none;
    }

      .search-bar__button svg {
        width: 16px;
      }
        .search-bar__button svg path{
          transition: all 0.3s ease-in-out;
        }

  .search-bar:focus-within {
    background-color: #FFF;
    border-color: #707070;
    .search-bar__input {
      color: $font-color;
    }
    .search-bar__button svg path{
      fill: $font-color;
    }
  }

  #main-home.animated {
    .search-form__title:not(.search-form__title--hidden),
    .search-form__subtitle,
    .search-bar,
    .search-form__options {
      opacity: 1;
    }
  }
  .cta-business {
    background-color: $alt-red;
    border: none;
    cursor: pointer;
    padding: 8px 20px;
    display: block;
    position: absolute;
    top: 95vh;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    transition: top 1s ease-out;
    @include sm {
      width: 190px;
    }
  }

  #main-home.animated .cta-business {
    top: calc(95vh - 10px);
  }

  .cta-business__text {
    color: #FFF;
    font-size: 0.875rem;
    letter-spacing: 0.020em;
    font-weight: 600;
    margin: 0;
  }

  .doubts {
    padding: 55px 175px 180px;
    @include sm {
      padding: 55px 15px 100px;
    }
  }

    .doubts__title {
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.080em;
      color: #{$sec-font-color};
      margin-bottom: 50px;
      text-align: center;
    }

    .doubts__list {
      display: flex;
      flex-flow: row wrap;
      align-items: flex-start;
      justify-content: space-between;
    }

  .doubt-box {
    width: 170px;
    @include md {
      margin-bottom: 30px;
    }
    @include sp {
      width: 45%;
      padding: 0 10%;
    }
    @include sm {
      width: 200px;
      padding: 0 15px;
      margin-bottom: 0;
    }
  }

    .doubt-box__icon {
      height: 50px;
      width: auto;
    }

      .doubt-box__icon--big{
        height: 76px;
        @include sm {
          display: block;
          width: 60%;
          height: auto;
          margin: 0 auto;
          margin-bottom: 30px;
        }
      }

    .doubt-box__text {
      width: 100%;
      font-size: 1.25rem;
      line-height: 1.5rem;
      margin: 21px 0 8px;
    }

  .doubt-cta {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

    .doubt-cta__text {
      font-size: 0.75rem;
      letter-spacing: 0.040em;
      text-transform: uppercase;
      margin: 0 16px 0 0;
    }

    .doubt-cta__arrow-right {
      display: block;
      height: 1px;
      position: relative;
      width: 1px;
      background-color: $color-yellow;
      transition: width 0.2s ease-out 0.1s;
    }

      .doubt-cta__arrow-right:before,
      .doubt-cta__arrow-right:after {
        content: '';
        background-color: $color-yellow;
        width: 8px;
        height: 1px;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transition: transform 0.2s ease-out, width 0.2s ease-out 0.1s;

      }

      .doubt-cta__arrow-right:before{
        transform: rotate(40deg);
        transform-origin: top right;
      }

      .doubt-cta__arrow-right:after{
        transform: rotate(-40deg);
        transform-origin: bottom right;
      }

      .doubt-cta:hover,
      .doubt-cta:focus{
        .doubt-cta__arrow-right {
          width: 0;
        }
          .doubt-cta__arrow-right:before,
          .doubt-cta__arrow-right:after {
            transform: rotate(0);
            width: 0;
          }
      }

    .doubt-cta__arrow-left {
      display: block;
      height: 1px;
      position: relative;
      width: 0px;
      background-color: $color-yellow;
      transition: all 0.3s ease-out 0.4s;
      margin-right: 0;
    }

      .doubt-cta__arrow-left:before,
      .doubt-cta__arrow-left:after {
        content: '';
        background-color: $color-yellow;
        width: 0px;
        height: 1px;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transition: transform 0.2s ease-out 0.7s, width 0.2s ease-out 0.8s;

      }

      .doubt-cta__arrow-left:before,
      .doubt-cta__arrow-left:after {
        transform: rotate(0);
      }

      .doubt-cta__arrow-left:before{
        transform-origin: top right;
      }

      .doubt-cta__arrow-left:after{
        transform-origin: bottom right;
      }

      .doubt-cta:hover,
      .doubt-cta:focus{
        .doubt-cta__arrow-left {
          width: 60px;
          margin-right: 16px;
        }
          .doubt-cta__arrow-left:before,
          .doubt-cta__arrow-left:after {
            width: 8px;
          }

          .doubt-cta__arrow-left:before{
            transform: rotate(40deg);
          }

          .doubt-cta__arrow-left:after{
            transform: rotate(-40deg);
          }
      }

  .business {
    display: flex;
    flex-direction: column;
    background-image: url('/images/pattern.svg');
    background-size: 35% auto;
    background-repeat: repeat-y;
    position: relative;
    overflow-x: hidden;
    padding-bottom: 215px;
    @include sm {
      background-size: 60% auto;
    padding-bottom: 115px;
    }
  }

    .business__marble {
      width: 35%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      @include sm {
        width: 100%;
      }
    }

    .business__title {
      margin-left: calc(35% + 30px);
      z-index: 2;
      @include sm {
        margin-left: 0;
        padding: 15px 20px;
      }
    }

      .business__title span {
        display: block;
        font-size: 3.125rem;
        letter-spacing: -0.010em;
        font-weight: 100;
        line-height: 3.125rem;
        color: $alt-red;
      }

  .business-thais {
    width: 103%;
    align-self: center;
    z-index: 2;
    position: relative;
    margin-bottom: 60px;
  }

    .business-thais__title {
      position: absolute;
      top: 25px;
      left: 20%;
      width: 60%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      @include md {
        left: calc(35% + 30px);
        width: 40%;
        flex-direction: column;
      }
      @include sm {
        width: 100%;
        position: initial;
        padding: 15px 20px;
      }
    }

      .business-thais__title h3 {
          color: $alt-red;
          font-size: 1.125rem;
          font-weight: 400;
          margin-left: 15px;
          @include md {
            margin: 0;
          }
      }

      .business-thais__title span {
          height: 2px;
          flex-grow: 1;
          background-color: $alt-yellow;
          @include md {
            width: 30%;
            align-self: flex-start;
            margin-bottom: 10px;
          }
      }

    .business-thais__image {
      width: 100%;
    }

    .business__options{
      display: flex;
      flex-flow: row nowrap;
      margin-left: 23%;
      @include sm {
        margin: 0;
        flex-direction: column;
        align-items: center;
      }
    }


  .business-button {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    padding: 10px 20px;
    border: 1px solid $alt-yellow;
    transition: all 0.2s ease-in-out;
    margin: 0 37.5px;
    @include sm {
      width: 80%;
      margin: 0 0 20px 0;
    }
  }

    .business-button__text {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 16px 0 0;
    }

    .business-button__arrow {
      display: block;
      height: 1px;
      position: relative;
      width: 36px;
      background-color: $alt-red;
      transition: all 0.2s ease-out;
    }

      .business-button__arrow:before,
      .business-button__arrow:after {
        content: '';
        background-color: $alt-red;
        width: 8px;
        height: 1px;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transition: transform 0.2s ease-out;
        transform: rotate(0);
      }

      .business-button__arrow:before{
        transform-origin: top right;
        @include sm {
          transform: rotate(40deg);
        }
      }

      .business-button__arrow:after{
        transform-origin: bottom right;
        @include sm {
          transform: rotate(-40deg);
        }
      }

      .business-button:hover,
      .business-button:focus {
        border-color: $alt-red;
        background-color: $alt-red;

        .business-button__text {
          color: #FFF;
        }

        .business-button__arrow,
        .business-button__arrow:before,
        .business-button__arrow:after {
          background-color: $alt-yellow;
        }

        .business-button__arrow:before{
          transform: rotate(40deg);
        }

        .business-button__arrow:after{
          transform: rotate(-40deg);
        }
      }

      .about {
        padding: 0 9% 20px 16%;
        transform: translateY(-40px);
        @include sm {
          padding: 0 5% 20px;
        }
      }

      .about__image{
        margin-bottom: 100px;
        max-width: 100%;
      }


/*CARROSSEL*/
.carousel-3d-container {
    height: 260px!important;
    padding: 30px 0;
}

.carousel-3d-slide {
  padding: 10px 0;
  border-radius: 10px;
  border: none;
  background-color: #FFF;
  -webkit-box-shadow: 0px 0px 15px 4px rgba(0,0,0,0.3);
  -moz-box-shadow: 0px 0px 15px 4px rgba(0,0,0,0.3);
  box-shadow: 0px 0px 15px 4px rgba(0,0,0,0.3);
}

.carousel-3d-slide:not(.current){
  -webkit-box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.1);
  box-shadow: 0px 0px 5px 2px rgba(0,0,0,0.1);
}
</style>
