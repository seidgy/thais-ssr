<template>
  <div class="main row d-flex justify-content-center">
    <div class="small-container">
      <div class="container container-fluid">
          <h1 class="form-title">Login</h1>
          <div class="row">
            <div class="col-md-12" :class="{'form-default__filled': login}">
              <input type="text" :disabled="loading" id="login" class="form-default__input" v-model="login">
              <label for="login" class="form-default__label">Usuário</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12" :class="{'form-default__filled': password}">
              <input type="password" :disabled="loading" id="password" class="form-default__input" v-model="password">
              <label for="password" class="form-default__label">Senha</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <button :disabled="loading" v-on:click.prevent="!loading?logar():false" class="button button--primary form-default__button form-default__button--margin">
                {{loading?"Entrando...":"Entrar"}}
              </button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      login: "",
      password: "",
      loading: false
    }
  },
  methods: {
    async logar(){
      if (process.client) {
        this.loading = true
        await this.$recaptchaLoaded()
        const token = await this.$recaptcha('login')
        this.$axios.post(process.env.VUE_APP_SERVER_URI+'/admin/login', {
            params:{
              user: this.login,
              pass: this.password
            },
            headers:{
                authorization: token
            }
        }).then(ret=>{
          localStorage.setItem('token_admin',ret.data.token)
          this.$router.push('/admin/GerenciaIntegracao')
        }).catch(err=>{
          this.$toast("Usuario ou senha incorretos. Verifique os dados informados e tente novamente!",{
            timeout: 5000,
            type: "error"
          });
        }).finally(()=>{
          this.loading = false
        })
      }
    }
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
</style>