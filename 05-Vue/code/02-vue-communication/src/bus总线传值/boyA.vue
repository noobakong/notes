<template>
  <div>
    <button @click="bus">按钮</button>
  </div>
</template>

<script>
import Bus from './bus.js'
export default {
  data() {
    return {
      msg: ''
    }
  },
  methods: {
    bus() {
      Bus.$emit('msg','给你发消息了 boy-B')
    }
  }
}
</script>

<style scoped>

</style>
