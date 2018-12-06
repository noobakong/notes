<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{name}}</h2>
    <h3>{{myage}}</h3>
    <button @click='$emit("addAge")'>快快长大</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      name: 'noobakong',
    }
  },
  props: {
    msg: String,
    myage: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
