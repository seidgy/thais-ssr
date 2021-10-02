<template>
<div>
  <div class="imovel__carrossel">      
        <div class="carousel">
            <splide :options="splideOptions" ref="slider">
            <splide-slide v-for="foto in imovel.fotos" v-bind:key="foto._id" >
                <img :src="foto.url_arquivo" :alt="foto.foto_titulo" />
            </splide-slide>
            </splide>
        </div>
        <span class="imovel__bairro">{{imovel.imovel.bairro}}</span>
        <!--v-bind:click="{utils}.addAttribute(imovel.imovel.id, 'fav', true)"-->
        <button @click.prevent="setFavorito()" class="imovel__fav" :class="favorito?'imovel__fav--faved':''" >
            <svg xmlns="http://www.w3.org/2000/svg" width="27.917" height="25.125" viewBox="0 0 27.917 25.125">
            <path id="Caminho_141" data-name="Caminho 141" d="M19.675,4.876a7.39,7.39,0,0,0-6.217,3.473A7.39,7.39,0,0,0,7.241,4.876,7.242,7.242,0,0,0,0,12.117a9.23,9.23,0,0,0,1.021,3.856c1.5,3.156,4.23,5.806,6.758,8.15a70.913,70.913,0,0,0,5.679,4.752,70.98,70.98,0,0,0,5.679-4.753c2.528-2.344,5.257-4.994,6.758-8.15a9.225,9.225,0,0,0,1.021-3.856A7.242,7.242,0,0,0,19.675,4.876Z" transform="translate(0.5 -4.376)" fill="none" stroke="#fff" stroke-width="1"/>
            </svg>
        </button>
        <div class="imovel__top-data">
            <p class="imovel__transacao">{{imovel.ofertas[0].tipo_oferta==1?'Aluguel':'Venda'}}</p>
            <h3 class="imovel__valor">R${{imovel.ofertas[0].preco_oferta.toLocaleString('pt-BR')}}</h3>
            <p class="imovel__periodo" v-if="imovel.ofertas[0].tipo_oferta==1">/mês*</p>
        </div>
    </div>
    <div class="imovel__data">
        <h3 class="imovel__title">
            <nuxt-link :to="'/imovel/'+imovel.codigo_imovel" class="link-imovel"><b>{{imovel.imovel.endereco}}</b>, {{imovel.imovel.titulo_imovel}}</nuxt-link>
        </h3>
        <div class="imovel__bottom-content">
            <div class="numbers">
                <div class="numbers__item">
                    <img src="/images/quartos.svg" alt="Quantidade de quartos" class="numbers__icon">
                    <p class="numbers__text">Quartos</p>
                    <p class="numbers__number">{{imovel.imovel.qtd_dormitorios?imovel.imovel.qtd_dormitorios:'-'}}</p>
                </div>
                <div class="numbers__item">
                    <img src="/images/vagas.svg" alt="Quantidade de quartos" class="numbers__icon">
                    <p class="numbers__text">Vagas</p>
                    <p class="numbers__number">{{imovel.imovel.qtd_vagas?imovel.imovel.qtd_vagas:'-'}}</p>
                </div>
                <div class="numbers__item">
                    <img src="/images/banheiros.svg" alt="Quantidade de quartos" class="numbers__icon">
                    <p class="numbers__text">Banheiros</p>
                    <p class="numbers__number">{{imovel.imovel.qtd_banheiros?imovel.imovel.qtd_banheiros:'-'}}</p>
                </div>
                <div class="numbers__item">
                    <img src="/images/area.svg" alt="Quantidade de quartos" class="numbers__icon">
                    <p class="numbers__text">{{imovel.imovel.unidade_metrica}}</p>
                    <p class="numbers__number">{{imovel.imovel.area_total}}</p>
                </div>
            </div>
            <div class="imovel__buttons">
                <a href="#" @click.prevent="setCompare()" class="button button--secondary" :class="{'button--check':isCompare}">Compare</a>
                <nuxt-link :to="{ name: 'imovel', params: {id: imovel.codigo_imovel}}" class="button button--primary">DETALHES</nuxt-link>
            </div>
            <div class="imovel__buttons">
                <a href="" @click.prevent="share"><span class="imovel__share" :id="'share-'+imovel.codigo_imovel">Compartilhe</span></a>
                <span class="imovel__codigo">CÓD. #{{imovel.codigo_imovel}}</span>
            </div>
        </div>
    </div>



    <!-- MODAL ALERT -->
    <div class="modal" tabindex="-1" role="dialog" :id="'mdl-comparativo-'+imovel.codigo_imovel">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Comparativo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
            <p v-if="!maisDe3imoveisNaListaCompare || imovelNaListaCompare">Imovel {{isCompare?'incluído no':'excluído do'}} comparativo.</p>
            <p v-else>Você já possui 3 imoveis no comparativo. Para incluir um novo remova um destes.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Continuar Navegando</button>
                <button type="button" class="btn btn-primary" @click="irComparativo()">Ir para comparativo</button>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
import utils from '../utils/functions.js'
export default {
    name: "cardImoveis",
    props: ['imovel', 'tipoVisualizacao'],
    computed: {
        ...mapState(['favoritos','compare']),
        maisDe3imoveisNaListaCompare: function(){
             return this.compare.length == 3 ? true:false
        },
        imovelNaListaCompare : function(){
             return (this.compare.find(com => com == this.imovel.codigo_imovel)) ? true:false
        }
    },
    data() {
        return {
            favorito: false,
            isCompare: false,
            splideOptions: {
                rewind : true,
                width  : '100%',
                fixedWidth: '100%',
                cover: true,
                perPage: 1,
                pauseOnHover: true,
                lazyload: true
            },
        }
    },
    watch: { 
        tipoVisualizacao: function(newVal, oldVal) { // watch it
            this.$refs.slider.sync();
        }
    },
    methods: {
        setFavorito(){
            this.$store.commit('toggleFav', this.imovel.codigo_imovel);
            this.favorito = !this.favorito;
            this.$emit('afterClickFavorito');
        },
        setCompare(){
            if(!this.maisDe3imoveisNaListaCompare || this.imovelNaListaCompare){
                this.$store.commit('toggleCompare', this.imovel.codigo_imovel);
                this.isCompare = this.imovelNaListaCompare;
            }
            $('#mdl-comparativo-'+this.imovel.codigo_imovel).modal();
        },
        irComparativo() {
            $('#mdl-comparativo-'+this.imovel.codigo_imovel).modal('hide');
            this.$router.push('/compare');
        },
        share() {
            utils.shareButton(this.imovel.codigo_imovel, this.imovel.imovel.titulo_imovel, document.location.origin+'/imovel?codImovel='+this.imovel.codigo_imovel+'&title='+this.imovel.imovel.titulo_imovel);
        }
    },
    mounted() {
        if(this.imovel){
            this.favorito = this.favoritos.find(fav => fav == this.imovel.codigo_imovel)? true: false
            this.isCompare = this.imovelNaListaCompare
        }
    }
}
</script>
<style scoped lang="scss">
    .carousel {
        width: 100%;
        height: 100%;
    }

    .imovel__carrossel:after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(64,64,64,0.15);
    }
    .link-imovel{
        text-decoration: none;
        color: #404040;
    }
    .link-imovel:hover{
        text-decoration: underline;
        color: #101010;
    }

    

    .imovel--lista {        
        .imovel__carrossel {
            width: 255px;
            border-right: 4px solid #E4262B;
            border-radius: 10px 0 0 10px;
            border-bottom: none;
        }
        
        .imovel__data {
            padding: 20px;
            width: calc(100% - 255px);
            height: 190px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .imovel__title {
            min-height: 0;
        }

        .imovel__bottom-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: end;
            .numbers {
                grid-row: span 2;
                margin-bottom: 0;
                .numbers__number {
                    margin-bottom: 0;
                }
            }
            .imovel__buttons {
                justify-content: flex-end;
                a:first-child {
                    margin-right: 18px;
                }
            }
            .imovel__share,
            .imovel__codigo {
                margin-top: 0;
            }
        }
    }

    .imovel--comercial{
        .imovel__carrossel {
            border-color: #740024;
            border-radius: 0;
        }
    }
</style>