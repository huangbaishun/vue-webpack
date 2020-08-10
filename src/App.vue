<template>
  <div class="div">
    <p class="div">hellow Vue</p>
    <p @click="tap">{{ title }}</p>
    <span>1111</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'app实例'
    }
  },
  methods: {
    tap(){
      this.title = this.title.split('').reverse().join('')
    }
  },
}
</script>
<style lang="less">
.div {
  display: flex;
  font-size: 20px;
  color: red;
  text-align: center;
}
</style>