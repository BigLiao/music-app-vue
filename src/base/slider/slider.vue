<template>
  <div class="slider" ref="sliderRoot">
    <div class="slider-container" ref="container">
      <div v-for="(item,index) in sliders" :key="index" class="slider-wrapper">
      <a :href="item.linkUrl" class="item"><img :src="item.picUrl" @load="imgLoaded"></a>
      </div>
    </div>
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    sliders: {
      type: Array
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data () {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  methods: {
    imgLoaded (e) {
      this.$emit('imgLoaded', e)
    },
    _setSliderWidth (isResize) {
      let width = 0;
      let sliderWidth = this.$refs.sliderRoot.clientWidth;
      let sliderList = this.$refs.container.children;
      this.children = sliderList;
      for (let i = 0; i < sliderList.length; i++) {
        let item = sliderList[i];
        width += sliderWidth;
        item.style.width = sliderWidth + 'px';
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.container.style.width = width + 'px';
    },
    _initSlider () {
      this.scroll = new BScroll(this.$refs.sliderRoot, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      });
      this.scroll.on('scrollEnd', () => {
        let pageIndex = this.scroll.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
          this._play();
        }
      });
      this.scroll.on('touchend', () => {
        if (this.autoPlay) {
          this._play();
        }
      });
    },
    _initDots () {
      this.dots = new Array(this.children.length);
    },
    _play () {
      let nextPageIndex = this.currentPageIndex + 1;
      if (this.loop) {
        nextPageIndex += 1;
      }
      clearTimeout(this.timmer);
      this.timmer = setTimeout(() => {
        this.scroll.goToPage(nextPageIndex, 0, 400);
      }, this.interval)
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if (this.autoPlay) {
        this._play();
      }
    });
    window.addEventListener('resize', () => {
      if (!this.scroll) {
        return;
      }
      this._setSliderWidth(true);
      this.scroll.refresh();
    })
  },
  destroyed () {
    clearTimeout(this.timmer);
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable";

  .slider
    position relative
    overflow hidden
    .slider-container
      white-space nowrap
      .slider-wrapper
        display inline-block
        .item
          display block
          width 100%
          overflow hidden
          text-decoration none
          img
            width 100%
  .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      transform: translateZ(1px)
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>


