<template>
  <section class="head-nav">
    <nav id="desk-nav" v-if="this.$parent.windowWidth > 1270" class="top-nav">
      <ul class="outstanding-nav">
        <li><a href="https://www.athaiscuida.thaisimobiliaria.com.br/" target="_blank" class="outstanding-nav__link">Anuncie seu imóvel</a></li>
      </ul>
      <ul class="main-nav">
        <li class="main-nav__li"><a href="https://clienteonline.thaisimobiliaria.com.br/skw/login/?next=/" class="main-nav__link">Área do cliente</a></li>
        <li class="main-nav__li main-nav__li--logo"><a href="/" class="main-nav__link main-nav__link--logo"><img alt="Thaís Imobiliária" src="/images/logo-thais.svg" /></a></li>
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
        <svg class="logo-mobile__image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 244.4"><path d="M49.4 209.6V244h-2.7v-34.3h2.7zM90.8 225.6l13-16h2.7V244h-2.7v-30.5l-13.1 16.1-13.1-16.1V244H75v-34.3h2.7l13.1 15.9zM149 209.2c5.1 0 9.4 1.7 12.9 5.1 3.5 3.4 5.3 7.6 5.3 12.5s-1.8 9.1-5.3 12.5c-3.5 3.4-7.8 5.1-12.9 5.1-5.1 0-9.4-1.7-12.9-5.1-3.5-3.4-5.3-7.6-5.3-12.5s1.8-9.1 5.3-12.5c3.6-3.4 7.9-5.1 12.9-5.1zm.1 32.8c4.3 0 7.9-1.5 10.8-4.4 2.9-2.9 4.4-6.5 4.4-10.8 0-4.3-1.5-7.9-4.4-10.8-2.9-2.9-6.6-4.4-10.8-4.4-4.3 0-7.9 1.5-10.9 4.4-3 2.9-4.5 6.5-4.5 10.8 0 4.2 1.5 7.8 4.5 10.8 3 2.9 6.6 4.4 10.9 4.4zM191.7 209.6h7.2c3.8 0 6.6.8 8.5 2.4 1.9 1.6 2.9 3.7 2.9 6.5 0 3.3-1.6 5.9-4.9 7.6 5.3 1.1 7.9 4 7.9 8.7 0 2.8-1 5-3.1 6.7-2.1 1.6-4.9 2.5-8.4 2.5h-10.1v-34.4zm2.6 2.3v13.7h3.7c6.2 0 9.4-2.3 9.4-6.8 0-4.6-3.2-6.9-9.5-6.9h-3.6zm0 15.9v14h7.1c2.9 0 5.2-.6 6.7-1.9 1.5-1.3 2.3-3 2.3-5.1 0-4.7-3.4-7-10.1-7h-6zM238.8 209.6V244h-2.7v-34.3h2.7zM267.2 209.6v32.1h17v2.2h-19.6v-34.3h2.6zM308.7 209.6V244H306v-34.3h2.7zM348 209.4l15.9 34.6h-2.8l-5.4-11.9h-16.8l-5.4 11.9h-2.8l15.9-34.6h1.4zm6.6 20.5l-7.4-16.2-7.4 16.2h14.8zm-.3-31l-7.6 7.8H345l5.2-7.8h4.1zM385.9 209.6h8.8c3.7 0 6.5.8 8.5 2.4 2 1.6 2.9 3.8 2.9 6.5 0 4-2.2 6.8-6.5 8.4 1.1.5 2.7 2.3 4.6 5.2L412 244h-3.1l-6-9.4c-2-3.1-3.6-5.1-4.7-5.9-1.1-.8-2.7-1.2-4.9-1.2h-4.6V244H386v-34.4zm2.6 2.3v13.4h5.7c2.9 0 5.1-.6 6.7-1.8 1.5-1.2 2.3-2.8 2.3-5 0-2.1-.8-3.8-2.3-4.9-1.6-1.2-3.8-1.8-6.7-1.8h-5.7zM435.2 209.6V244h-2.7v-34.3h2.7zM474.5 209.4l15.9 34.6h-2.8l-5.4-11.9h-16.8L460 244h-2.8l15.9-34.6h1.4zm6.7 20.5l-7.4-16.2-7.4 16.2h14.8z"/><g><path d="M35 180.4h-7.6c-4.4 0-7.1-1.4-7.1-6.2 0-4.5 2.5-5.9 6.1-5.9h1.8v4.2h-2c-1.5 0-2.8.1-2.8 1.7 0 1.7 1.4 1.9 3 1.9H36c1.8 0 3-.3 3-1.9 0-1.6-1.4-1.7-3-1.7h-2.1v-4.2h1.7c3.7 0 6.3 1.3 6.3 5.9.1 4.8-2.7 6.2-6.9 6.2zM39.2 167.1c0-2-.4-2.6-2.4-2.6H20.6v-4.3H37c3.5 0 5.2 1.1 5.2 4.9v2.1h-3zM31.5 157.1v-6.6h2.6v6.6h-2.6zM24.7 145.4c.3.6.8 2.4 1.1 3.1h-3c-.3-.8-1.5-3.2-2.3-3.9v-3.2h21.1v4H24.7zM23.7 132.7v5.7h-3.1v-9.7h2.6l18.5 4.5v3.9l-18-4.4zM36 126.6h-9.5c-3.7 0-6.2-1.8-6.2-5.7 0-3.9 2.5-5.6 6.2-5.6H36c3.6 0 6.1 1.9 6.1 5.6 0 3.8-2.5 5.7-6.1 5.7zm-.1-7.2h-9.3c-1.1 0-2.7.1-2.7 1.5 0 1.5 1.6 1.6 2.7 1.6h9.3c1 0 2.6-.2 2.6-1.6 0-1.4-1.6-1.5-2.6-1.5zM36.8 106.8v6.4h-3.1l-13.1-5.5V103h13.1v-2h3.1v2.1h5v3.8h-5zm-3.1 0h-9l9 3.2v-3.2z"/></g><path d="M124.7 2.6C122.4.5 118.9.1 114 0 86.1-.1 25.3.1 7.3.1 3.2.1 0 3.4 0 7.5v12.3c0 4.1 3.3 7.3 7.3 7.3h42.1v141.2c0 .9 0 1.9-.1 2.9-.1 2.7-.2 5.4.4 8.1.6 2.4 2.6 6.9 5.9 8.5 2.9 1.4 6 2.2 9.2 2.2 2.7 0 5.4-.7 7.7-2.1 4.5-2.8 7.1-8.2 7.3-15.2v-5.5V26.8c6.5-.1 25.4-.3 34.4-.5 5.2-.1 8.8-.7 11.1-3.1 2.2-2.4 2.5-5.8 2.4-10.8-.2-4.5-.7-7.7-3-9.8zm119.2 172.3v-16.3c0-22.7 0-46.1-.3-69.2-.1-6.4-1.3-12.7-3.5-18.7-4.1-10.6-11.9-16.9-23.2-18.6-11.5-1.7-22.8.4-35.6 6.7-4.8 2.4-9.3 5.1-14.6 8.3-1.5.9-3.1 1.9-4.8 2.9V55.5 15.6c0-6-.3-10.4-2.9-12.9S152.2 0 146.1 0c-1.7 0-3.5 0-5.4.1-5.8.2-9.3 3.7-9.8 9.4-.2 2.6-.2 5.2-.2 7.7V170.1c0 .8 0 1.6-.1 2.5-.1 2.4-.2 4.9.5 7.3.9 3 3.1 6.9 6.2 8.2 3.7 1.5 6.9 2.1 9.5 2.1 2.9 0 5.7-.7 8.1-2.3 4.5-3 6.9-8.5 6.9-15.9 0-5.5.1-11.1.2-16.5.2-14 .5-28.6-.6-42.9-.9-12.4 3.9-20.5 16.1-27.1 5.2-2.8 10.7-5.6 16.3-7.3 5.8-1.7 10.2-1.7 13.1.3 2.9 2 4.7 6.2 5.2 12.6.4 5.7.4 11.6.4 17.4V133.2c0 13.3 0 27.1.2 40.6 0 1.9.4 11.6 4.4 12.7 6.5 1.8 13.3 2.3 19.9 1.5 6.9-.9 6.8-7.7 6.7-11.8.2-.5.2-.9.2-1.3zm115.5 6.4c0-2.1 0-4.5-.8-6.7-5-13.5-5.2-27.6-4.9-42 .2-10.5.3-21.7-.1-32.9-.2-6.3-1.1-12.5-2.6-18.6-2.9-11.1-10.3-18.7-20.7-21.5-16.9-4.5-35.3-4-58.2 1.6-3 .7-5.6 2.6-7.1 5.3-1.9 3.4-2.2 8-.9 12.5 2.4 7.9 8.4 6.9 12.9 6.2.4-.1.9-.2 1.3-.2 8.6-1.3 18.6-2.7 28.4-3.2 8.2-.4 12.9 1.6 15 6.1 4.3 9.7 4.8 17.5 1.7 25.4h-5c-4.8 0-9.8-.1-14.6.1-1.1 0-2.2.1-3.3.1-5.9.2-12 .4-17.9 1.5-23.2 4.4-33.6 19.4-29.5 42.3 1.3 7.5 4.6 15.4 9.2 22.4 6.1 9.4 15.9 13.1 27.6 10.5 10.6-2.4 20.5-7.3 31.1-15.7 1.7-1.4 3.4-2.8 5.4-4.3l.7-.6c.1.2.2.4.2.7.7 2.2 1.3 4 1.9 5.8 2.4 8.1 4.4 12.9 8.4 14.9 1.4.6 2.9 1 4.4 1 3.2 0 7.2-1.2 12.3-3.2 1.1-.4 2-1.1 2.9-1.9.4-.4.9-.7 1.4-1.1l1-.7-.1-1.3c-.1-.8-.1-1.7-.1-2.5zm-38.5-32.7c-6.7 4.9-15.6 11-25.1 15.7-3.1 1.5-5.5 1.9-7.2 1.1-1.8-.8-3.3-3.2-4.3-6.9-1-4-1.3-8.1-1-12.2.5-6.8 3-9.5 9.2-10.3 7.4-1 14.8-1.3 22.6-1.7 2.8-.1 5.6-.2 8.4-.4 2.6 7 1.7 11.6-2.6 14.7zM483 123.3c-4.1-2.7-8.5-5-12.8-7.2-3-1.5-6.2-3.2-9.1-4.9-.4-.3-.9-.5-1.4-.8-4.3-2.5-8.7-5.1-11.9-8.5-3-3.2-4.2-7.2-3.3-10.8.9-3.5 3.7-6.3 7.7-7.6 5.4-1.7 11.7-1.6 17.2-1.2 4.3.3 8.6 1.2 13.1 2.2 2.1.4 4.2.9 6.5 1.3l2 .4.5-2c2.4-9.1 3.2-14.9.7-18.9-2.3-3.5-6.8-5-12.9-6.1-7.9-1.4-16.6-1.9-26.7-1.3-17.6.9-30.2 10.3-34.6 25.6-5.1 17.9.4 33.5 15.6 43.8 4.2 2.8 8.7 5.1 13.1 7.3 2.2 1.1 4.5 2.3 6.7 3.4 1.3.7 2.6 1.4 3.9 2 3.4 1.7 6.6 3.4 9.3 5.6 3.5 2.8 5.3 6.8 4.8 10.8-.4 4-2.9 7.4-6.9 9.4-3.6 1.7-7.5 2.6-11.5 2.4-5.4-.2-11-1-16.3-1.8-2.7-.4-5.5-.8-8.3-1.1-3.3-.4-7.5-.5-10.1 1.9-2.5 2.4-2.7 6.3-2.5 9.4.4 6.8 3.6 10.9 9.9 12.4 8.4 2 18 3.9 28.1 3.9 5.3 0 10.6-.5 15.8-1.7 16.1-3.5 25.8-12.5 29.1-26.7 4.1-17.4-1.4-31.7-15.7-41.2zm-97-67.2c-5.4 0-9.6.4-12.4 2.9-3.1 2.8-3.5 7.3-3.6 11.8-.1 12-.1 24.2-.1 36v28.8c0 12.9 0 26.2.1 39.3 0 2.1.2 4.2.4 6.2.4 2.4 1 5 3.1 5.5 5.2 1.5 10.6 2.3 16 2.3 1.3 0 2.5 0 3.7-.2 7.7-.6 7.7-8.7 7.7-12.6v-25.8c0-26 0-53-.1-79.4 0-11.1-3.6-14.6-14.8-14.8zm25.5-26c-1.1-3.4-4.9-5.3-8.4-4.2-.2.1-.5.2-.8.3-1.6.8-3.2 1.5-4.8 2.3-8.5 4-15.9 7.5-23.2 11.5-2.8 1.5-4.2 7.5-3 10.5 1 2.6 5.2 5.5 8.3 5.5.4 0 .7 0 1.1-.1 8.1-2.2 16-4.7 24.5-7.5 1.6-.5 3.2-1.1 4.8-1.6 3.4-1.1 5.4-4.9 4.3-8.3l-2.8-8.4z" fill-rule="evenodd" clip-rule="evenodd" fill="#fff"/></svg>
      </a>
      <nav class="mobile-nav__container">
        <ul class="mobile-nav__menu">
          <li><a href="https://www.athaiscuida.thaisimobiliaria.com.br/" class="mobile-nav__link mobile-nav__link--outstanding" target="_blank">Anuncie seu imóvel</a></li>
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

export default {
  name: 'Header',
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