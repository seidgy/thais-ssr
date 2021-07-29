<template>
  <div class="">     
    <center>
      <h4 v-if="message">{{ message }}</h4>
      <img src="../../assets/loading.gif"/>
    </center>
  </div>
</template>

<script>
export default {
    name: "loading",
    props: ['message']
}
</script>
<style scoped lang="scss">


</style>