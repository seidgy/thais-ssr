export const state = () => ({
  favoritos: process.browser && localStorage.getItem('favoritos')?JSON.parse(localStorage.getItem('favoritos')):[],
  compare: process.browser && localStorage.getItem('compare')?JSON.parse(localStorage.getItem('compare')):[],
  windowWidth: 0,
  cookieCompliance: false
})

export const mutations = {
  checkState: (state) => {
    state.favoritos = localStorage.getItem('favoritos')?JSON.parse(localStorage.getItem('favoritos')):[]
    state.compare = localStorage.getItem('compare')?JSON.parse(localStorage.getItem('compare')):[]
    state.windowWidth = 0
    state.cookieCompliance = localStorage.getItem('compDate') && localStorage.getItem('compDate') == new Date().toISOString().slice(0,10).replace(/-/g,"")?true:false
  },
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
  changeWindowWidth: (state, payload) => {
    state.windowWidth = payload
  },
  setCompliance: (state) => {
    localStorage.setItem("compDate", new Date().toISOString().slice(0,10).replace(/-/g,""))
    state.cookieCompliance = true;
  }
}
