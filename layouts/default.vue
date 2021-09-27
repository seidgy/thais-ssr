<template>
    <main>
        <Header />
        <Nuxt />
        <Footer logo="false" />
    </main>
</template>

<script>
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      windowWidth: 0
    }
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    }
  },
  mounted(){
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
      this.onResize()
    })
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  }
}
</script>

<style lang="scss" src="../assets/css/main.scss">
.grecaptcha-badge { visibility: hidden; }  /* Oculta o recaptcha */
</style>

