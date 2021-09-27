import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
new Vuex.Store({
  state: () => ({
    favoritos: process.browser && localStorage.getItem('favoritos')?JSON.parse(localStorage.getItem('favoritos')):[],
    compare: process.browser && localStorage.getItem('compare')?JSON.parse(localStorage.getItem('compare')):[]
  }),
  mutations: {
    toggleFav: (state,codigo_imovel) => {
      if(state.favoritos.find(aux => aux==codigo_imovel)){
        state.favoritos.splice(state.favoritos.indexOf(codigo_imovel),1);
      }else{
        state.favoritos.push(codigo_imovel);
      }
      // armazena na sessão
      if(process.browser){
        localStorage.setItem("favoritos",JSON.stringify(state.favoritos))
      }
    },
    toggleCompare: (state,codigo_imovel) => {
      console.log(state.compare,codigo_imovel)
      if(state.compare.find(aux => aux==codigo_imovel)){
        state.compare.splice(state.compare.indexOf(codigo_imovel),1);
      }else if(state.compare.length < 3){
        state.compare.push(codigo_imovel);
      }
      // armazena na sessão
      if(process.browser){
        localStorage.setItem("compare",JSON.stringify(state.compare))
      }
    },
  }
});
