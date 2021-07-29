<template>
            <nav aria-label="Paginação">
              <ul class="paginacao">
                <li :class="['paginacao__item paginacao__item--step paginacao__item', isFirstPageSelected() ? '--disabled' : '']">
                    <a @click='paginaAnterior()' @keyup.enter='paginaAnterior()' :tabindex="isFirstPageSelected() ? -1 : 0" class="paginacao__link" href="#" aria-label="Anterior">
                        <svg xmlns="http://www.w3.org/2000/svg" width="10.451" height="17.902" viewBox="0 0 10.451 17.902" class="paginacao__icon paginacao__icon--disabled" aria-hidden="true">
                        <path id="Caminho_28" data-name="Caminho 28" d="M6.83,13.66,0,6.83,6.83,0" transform="translate(1.5 2.121)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                        </svg>
                    </a>
                </li>
                <li v-for='botaoPagina in botoesPagina' 
                    :key='"botao" + botaoPagina' 
                    tabindex="0"
                    :class='["paginacao__item", "botao-" + botaoPagina, isCurrentPage(botaoPagina) ? "paginacao__item--active" : ""]' 
                    @click='irParaPagina(botaoPagina)'>

                    <a href="#" :class='"paginacao__link paginacao__link-" + botaoPagina' tabindex="-1">
                        {{ botaoPagina }}
                    </a>

                </li>

                <!-- <li class="paginacao__item paginacao__item--ellipsis"><span class="paginacao__link">...</span></li> -->
                <li :class="['paginacao__item paginacao__item--step', isLastPageSelected() ? 'disabled' : '']">
                  <a class="paginacao__link" href="#" @click='proximaPagina()' @keyup.enter='proximaPagina()' :tabindex="isLastPageSelected() ? -1 : 0" aria-label="Próxima" aria-disable="false">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10.45" height="17.902" viewBox="0 0 10.45 17.902" class="paginacao__icon" aria-hidden="true">
                      <path id="Caminho_28" data-name="Caminho 28" d="M-7492.783,5308.659l-6.83,6.83,6.83,6.83" transform="translate(-7490.662 5324.439) rotate(180)" fill="none" stroke="#142038" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
</template>

<script>
export default {
    name: "Paginacao",
    props: {
        pagina: {
            type: Number
        },
        totalDeRegistros: {
            type: Number,
            required: true
        },
        itensPorPagina: {
            type: Number,
            required: true
        },        
        clickHandler: {
            type: Function,
            default: () => {}
        }
    }, 
    data() {
        return {
            innerValue: 1,
            botoesPagina: null,
            numeroDePaginas: 0,
            windowWidth: 0,
            numeroMaximoDeBotoesDePaginaParaExibir: 5
        }
    },
    computed: {
        paginaCorrente: {
            get: function () {
                return this.pagina || this.innerValue
            },
            set: function(newValue) {
                this.innerValue = newValue
            }
        },
        textoDaPaginacao() {
            if (!this.totalDeRegistros) return ''
            let itemInicial = this.paginaCorrente * this.itensPorPagina - this.itensPorPagina + 1
            let itemFinal = itemInicial + this.itensPorPagina - 1
            let totalItens = this.totalDeRegistros
            if (itemFinal > totalItens) itemFinal = totalItens
            return `De ${itemInicial} até ${itemFinal} de ${totalItens} itens`
        },
    },  
    watch: {
        totalDeRegistros: function() {
            this.inicio()
        }
    },
    methods: {
        montarListaDeBotoesDePagina(numeroPaginaClicada) {
            if (!this.numeroDePaginas) {
                return
            }

            if (this.numeroDePaginas <= this.numeroMaximoDeBotoesDePaginaParaExibir) {
                this.botoesPagina = [...Array(this.numeroDePaginas).keys()].map(i => i + 1)
                return 
            }

            let botoesPaginaAtual = this.botoesPagina || [...Array(this.numeroMaximoDeBotoesDePaginaParaExibir).keys()].map(i => i + 1)

            const indiceMeio = parseInt(this.numeroMaximoDeBotoesDePaginaParaExibir / 2)
            const delta = this.numeroMaximoDeBotoesDePaginaParaExibir - indiceMeio - 1

            const numeroPaginaMeio = botoesPaginaAtual[indiceMeio]
            // if (numeroPaginaClicada == numeroPaginaMeio) return

            // Funções de deslocamento dos botões
            const fnDeslocamentoParaTras = (novoNumeroPaginaMeio, delta, direcao) => novoNumeroPaginaMeio + (delta * direcao) < 1
            const fnDeslocamentoParaFrente = (novoNumeroPaginaMeio, delta, direcao, numeroDePaginas) => novoNumeroPaginaMeio + (delta * direcao) > numeroDePaginas

            // Define a direção de deslocamento e qual função será utilizada
            const direcao = numeroPaginaClicada < numeroPaginaMeio ? -1 : 1
            const fnDeslocamento = numeroPaginaClicada < numeroPaginaMeio ? fnDeslocamentoParaTras : fnDeslocamentoParaFrente
            
            // Calcula qual será o número da página do botão central
            let novoNumeroPaginaMeio = numeroPaginaClicada
            while (fnDeslocamento(novoNumeroPaginaMeio, delta, direcao, this.numeroDePaginas)) {
                novoNumeroPaginaMeio+=-direcao
            }

            // Monta array de botões com novos números de página
            const numeroPrimeiroBotao = novoNumeroPaginaMeio - delta
            let novoArrayBotoesPagina = [...Array(this.numeroMaximoDeBotoesDePaginaParaExibir).keys()].map(i => i + numeroPrimeiroBotao)
            this.botoesPagina = novoArrayBotoesPagina
        },
        irParaPagina(pagina) {
            if (this.paginaCorrente == pagina) return
            this.innerValue = pagina
            this.montarListaDeBotoesDePagina(pagina)
            this.$emit('input', pagina)
            this.clickHandler(pagina) // chama função de callback
        },
        paginaAnterior() {
            if (this.paginaCorrente<=1) return
            this.irParaPagina(this.paginaCorrente - 1)
        },
        proximaPagina() {
            if (this.paginaCorrente >= this.numeroDePaginas) return
            this.irParaPagina(this.paginaCorrente + 1)
        },
        isFirstPageSelected() {
            return this.paginaCorrente === 1
        },
        isLastPageSelected() {
            return (this.paginaCorrente == this.numeroDePaginas)
        },
        isCurrentPage(pagina) {
            return this.paginaCorrente == pagina
        },
        inicio() {
            // DEFINE A QUANTIDADE MÁXIMA DE BOTOES
            this.windowWidth = document.documentElement.clientWidth;
            if(this.windowWidth !== 0 && this.windowWidth <= 767){
                this.numeroMaximoDeBotoesDePaginaParaExibir = 3
            }else{
                this.numeroMaximoDeBotoesDePaginaParaExibir = 5
            }
            this.numeroDePaginas = parseInt((this.totalDeRegistros + this.itensPorPagina - 1) / this.itensPorPagina)

            this.montarListaDeBotoesDePagina(this.pagina)
        }
    },
    mounted() {
        this.inicio()
    }
}
</script>