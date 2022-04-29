<template>
  <section class="head-nav">
    <nav id="desk-nav" v-if="this.$parent.windowWidth > 1270" class="top-nav">
      <ul class="outstanding-nav">
        <li><a href="https://athaiscuida.thaisimobiliaria.com.br/" target="_blank" class="outstanding-nav__link">Anuncie seu imóvel</a></li>
      </ul>
      <ul class="main-nav">
        <li class="main-nav__li"><a href="https://clienteonline.thaisimobiliaria.com.br/skw/login/?next=/" class="main-nav__link">Área do cliente</a></li>
        <li class="main-nav__li main-nav__li--logo"><a href="/" class="main-nav__link main-nav__link--logo"><logo-thais /></a></li>
        <li class="main-nav__li"><a href="https://b24-dgbqx2.bitrix24.site/Fale%20Conosco/" class="main-nav__link">Fale conosco</a></li>
      </ul>
      <ul class="personal-nav">
        <li><a href="/compare" class="personal-nav__link personal-nav__link--margin">Compare</a></li>
        <li><a href="/favoritos" class="personal-nav__link">Favoritos <div class="fav-heart"><span class="fav-heart__number">{{ favoritos && favoritos.length ? favoritos.length : 0 }}</span></div></a></li>
      </ul>
    </nav>
    <div v-if="this.$parent.windowWidth <= 1270" class="mobile-nav" id="mobile-nav">
      <button class="nav-trigger" @click="toggleMenu()">
        <span class="nav-trigger__bar nav-trigger__bar--top"></span>
        <span class="nav-trigger__bar nav-trigger__bar--mid"></span>
        <span class="nav-trigger__bar nav-trigger__bar--bot"></span>
      </button>
      <a href="/" class="logo-mobile">
        <logo-thais />
      </a>
      <nav class="mobile-nav__container">
        <ul class="mobile-nav__menu">
          <li><a href="https://athaiscuida.thaisimobiliaria.com.br/" class="mobile-nav__link mobile-nav__link--outstanding" target="_blank">Anuncie seu imóvel</a></li>
          <li><a href="https://clienteonline.thaisimobiliaria.com.br/skw/login/?next=/" class="mobile-nav__link">Área do cliente</a></li>
          <li><a href="https://b24-dgbqx2.bitrix24.site/Fale%20Conosco/" class="mobile-nav__link">Fale conosco</a></li>
        </ul>
      </nav>
      <div class="mobile-right">
        <a href="/compare" class="personal-nav__link">Compare</a>
        <button class="fav-heart fav-heart--mobile">
          <svg xmlns="http://www.w3.org/2000/svg" class="fav-heart__icon" viewBox="0 0 21.287 20.125"><path id="Caminho_82" data-name="Caminho 82" d="M969.217,532.616a5.728,5.728,0,0,0-4.786-2.576h-.008a5.85,5.85,0,0,0-4.922,2.75,5.847,5.847,0,0,0-4.922-2.75,5.733,5.733,0,0,0-5.732,5.733,7.326,7.326,0,0,0,.808,3.053,22.839,22.839,0,0,0,5.35,6.452,56.507,56.507,0,0,0,4.5,3.762,56.151,56.151,0,0,0,4.5-3.762" transform="translate(-948.347 -529.54)" fill="none" stroke="#383838" stroke-width="1"/></svg>
          <span class="fav-heart__number fav-heart__number--mobile">{{ favoritos && favoritos.length ? favoritos.length : 0 }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'
import logoThais from '@/components/logoThais.vue'

export default {
  name: 'Header',
  components: {
    logoThais,
  },
  computed: {
    ...mapState(['favoritos'])
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleMenu() {
      document.getElementById('mobile-nav').classList.toggle('open');
    },
    handleScroll() {
      const scrollY = window.scrollY;
      const deskNav = document.getElementById('desk-nav');
      const mobNav = document.getElementById('mobile-nav');
      if(scrollY > 0) {
        if(deskNav && !deskNav.classList.contains('fixed')){
          deskNav.classList.add('fixed');
        }
        if(mobNav && !mobNav.classList.contains('fixed')){
          mobNav.classList.add('fixed');
        }
      } else {
        if(deskNav && deskNav.classList.contains('fixed')){
          deskNav.classList.remove('fixed');
        }
        if(mobNav && mobNav.classList.contains('fixed')){
          mobNav.classList.remove('fixed');
        }
      }
    }
  },
}
</script>