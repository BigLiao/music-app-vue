<template>
  <div class="loading">
    <img src="./loading.gif" width="40" height="40">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>


