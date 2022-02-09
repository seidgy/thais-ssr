<template>
  <section class="footer">
    <ul class="main-nav main-nav--footer">
      <li><a href="https://clienteonline.thaisimobiliaria.com.br/skw/login/?next=/" class="main-nav__link">Área do cliente</a></li>
      <li><a href="https://b24-dgbqx2.bitrix24.site/Fale%20Conosco/" class="main-nav__link">Fale conosco</a></li>
      <li><a href="https://b24-dgbqx2.bitrix24.site/ouvidoria/" class="main-nav__link">Ouvidoria</a></li>
      <li><a href="https://thasimobiliaria.bitrix24.site/manutencao_interno/" class="main-nav__link">Manutenção</a></li>
    </ul>
    <ul class="outstanding-nav">
      <li><a href="https://www.athaiscuida.thaisimobiliaria.com.br/" target="_blank" class="outstanding-nav__link outstanding-nav__link--dark">Anuncie seu imóvel</a></li>
    </ul>
    <div class="info">
      <div class="info__box">
        <div class="info__title">Horários Atendimento</div>
        <div class="info__text">Segunda à Sexta das 08:00h às 18:00h</div>
        <div class="info__text">Sábados das 08:00h às 13:00h</div>
      </div>
      <div class="info__box">
        <div class="info__title">Empréstimo de chaves de locação</div>
        <div class="info__text">Segunda à Sexta das 08:00h às 16:00h</div>
        <div class="info__text">Sábados das 08:00h às 11:00h</div>
      </div>
    </div>
    <div class="info info--big">
      <div class="info__box">
        <div class="info__title">Guará - Matriz</div>
        <div class="info__text">QE 7 Bloco C, 0 - salas 102 a 108 e 116 - Guará - Guará/DF - Central de Atendimento (61) 3031-2200</div>
      </div>
      <div class="info__box">
        <div class="info__title">Asa Sul</div>
        <div class="info__text">Quadra SGAS 902, 0 - Conjunto B, Salas 23, 24, 25 - Edifício Atenas - Brasília/DF</div>
      </div>
      <div class="info__box">
        <div class="info__title">Águas Claras</div>
        <div class="info__text">Rua 9, 0 - Lote 09 Sul, Loja 02 - Próximo Estação Arniqueiras - Águas Claras/DF</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Footer',
  props: ['logo']
}
</script>

<style lang="scss" scoped>
  @import '../../assets/css/_variables.scss';
  a {
    color: inherit;
  }
  
  .footer{
    width: 100%;
    padding: 0 24% 30px 16%;
    display: flex;
    flex-flow: row wrap;
    @include sm {
      padding: 0 5% 30px;
    }
  }

  li {
    list-style: none;
  }

  .main-nav {
    width: 70%;
    @include md {
      width: auto;
    }
    @include sm {
      width: 100%;
    }
  }

    .main-nav__link {
      margin-right: 40px;
    }
  .outstanding-nav{
    width: 30%;
    @include md {
      width: auto;
      margin-top: 15px;
    }
    @include sm {
      width: 100%;
    }
  }

    .outstanding-nav__link--dark {
      border: 1px solid #707070;
    }

  .info {
    width: 40%;
    margin-top: 60px;
  }

  .info--big {
    width: 60%;
    .info__title,
    .info__text {
      line-height: 1rem;
    }
  }

    .info__box{
      margin-bottom: 23px;
    }

    .info__title,
    .info__text {
      font-size: 0.75rem;
      letter-spacing: -0.030em;
      line-height: 1.43rem;
    }

    .info__title {
      font-weight: 800;
    }

    .info__text{
      font-weight: 500;
    }
</style>