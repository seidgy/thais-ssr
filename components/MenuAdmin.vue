<template>
    <ul class="menu-admin">
        <li class="menu-admin__item" v-for='item in menu' :key='item.name'>
            <nuxt-link :to="{ name: item.name}" class="menu-admin__link" v-bind:class="{ active: currentRouteName == item.name }">{{ item.text }}</nuxt-link>
        </li>
    </ul>
</template>
<script>
export default {
  name: 'MenuAdmin',
  data() {
    return {
      menu: [
          {
              name: 'GerenciaIntegracao',
              text: 'Gerenciar integração'
          },
          {
              name: 'DeleteImovel',
              text: 'Excluir de imóvel'
          },
          {
              name: 'bairros',
              text: 'Descrição dos Bairros'
          },
      ]
    }
  },
  computed: {
    currentRouteName() {
        return this.$route.name;
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/_variables.scss';

.menu-admin {
  padding-top: 70px;
}

  .menu-admin__item {
    width: 100%;
    padding: 10px 20px;
    border-bottom: 1px solid #CCCCCC;
    list-style: none;
  }

  .menu-admin__link {
    text-decoration: none;
    &:hover,&:active,&:focus{
      color: #{$main-color};
      &.active {
        color: #{$main-color};
      }
    }
    &.active {
      color: #{$main-color};
      font-weight: 600;
    }
  }

</style>