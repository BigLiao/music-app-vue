<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <div class="slider-content">
            <slider @imgLoaded="imgLoaded" :sliders="recommends"></slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <div class="loading-container" v-show="!discList.length">
      <loading></loading>    
    </div>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider';
  import {getRecommend, getAjaxData, getPlayList} from 'api/recommend';
  import Scroll from 'base/scroll/scroll';
  import Loading from 'base/loading/loading';

  export default {
    data () {
      return {
        recommends: [],
        discList: []
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    methods: {
      imgLoaded (e) {
        this.$refs.scroll.refresh();
      }
    },
    created () {
      getAjaxData().then((res) => {
        res = JSON.parse(res);
        // console.log(res);
        if (res.code === 0) {
          this.recommends = res.data.slider;
        }
      }).catch((e) => {
        console.log(e);
      });
      getPlayList().then((res) => {
        this.discList = res.data.list;
      }).catch((e) => {
        console.log(e)
      });
    }
  }
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable";

.recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 0
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
