import Vue from 'vue';
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';


Vue.use( VueSplide );
new Vue( {
    render: h => h( App ),
} );