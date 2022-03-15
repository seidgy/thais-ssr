<template>
    <main>
        <Header />
        <Nuxt />
        <Footer logo="false" />
        <modal tabindex="-1" adaptive="true" role="dialog" id="modal-cookies" name="modal-cookies" :clickToClose="false" :shiftX="0.1" :shiftY="0.9" :height="300" :width="240">
          <div class="modal-content">
            <div class="modal-body">
            <p class="default-text">Este site usa cookies para encontrar os melhores imóveis para você. Ao prosseguir, você concorda com nossas <nuxt-link :to="'/politica-de-cookies'" class="default-link">Políticas de Cookies e Privacidade</nuxt-link></p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="setCompliance">Ok, entendi</button>
            </div>
          </div>
        </modal>
    </main>
</template>

<script>
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import {mapState} from 'vuex'

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
      this.$store.commit('changeWindowWidth', window.innerWidth);
    },
    setCompliance() {
      this.$store.commit('setCompliance');
      this.$modal.hide('modal-cookies');
    }
  },
  mounted(){
    this.$store.commit('checkState');
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
      this.onResize()
    });
    if(!this.cookieCompliance){
      this.$modal.show('modal-cookies');
    } else{
      this.$modal.hide('modal-cookies');
    }
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
  computed: {
    ...mapState(['cookieCompliance']),
  }
}
</script>

<style lang="scss" src="../assets/css/main.scss">
.grecaptcha-badge { visibility: hidden; }  /* Oculta o recaptcha */
</style>

