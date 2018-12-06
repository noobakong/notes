<template>
  <div id="on">
      <p>{{msg}}</p>
  </div>
</template>

<script>
import Bus from './bus.js'
export default {
  data() {
    return {
      msg:  ''
    }
  },
  mounted() {
      let self = this
      Bus.$on('msg', (e) => {
      self.msg = e
      window.console.log(`传来的数据是：${e}`)
    })
  }
}
</script>

<style scoped>

</style>
