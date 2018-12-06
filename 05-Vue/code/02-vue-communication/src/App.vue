<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <BoyA></BoyA>
    <BoyB></BoyB>
    <!-- <Son
      :msg="msg"
      :myage="age"
      @addAge="add"
    /> -->
  </div>
</template>

<script>
// import Son from './components/Son.vue'
import BoyA from './bus总线传值/boyA'
import BoyB from './bus总线传值/boyB' 
export default {
  // name: 'app',
  // data() {
  //   return {
  //     msg: 'Vue父子组件的传值哦~',
  //     age: 20
  //   }
  // },
  components: {
    // Son
    BoyA,
    BoyB

  },
  // methods: {
  //   add() {
  //     this.age ++
  //   }
  // }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
