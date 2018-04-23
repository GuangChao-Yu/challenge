<template>
  <div ref="wrapper" class="socrll-warppper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    /**
     * 是否开启横向滚动
     */
    scrollX: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    /**
     * 是否派发滚动事件
     */
    listenScroll: {
      type: Boolean,
      default: true
    },
    // 是否开启上拉刷新
    pullup: {
      type: Boolean,
      default: true
    },
    // 是否开启下拉刷新
    pulldown: {
      type: Boolean,
      default: true
    },
    // 是否监听开始滚动
    beforeScroll: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  },
  mounted() {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        fade: true
      })
      if (this.listenScroll) {
        this.scroll.on('scroll', pos => {
          // 发送滚动的位置事件
          this.$emit('scroll', pos)
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToBottom', this.scroll)
          }
        })
      }
      // 上拉加载抛出事件
      if (this.pullup) {
        this.scroll.on('scrollEnd', pos => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd', this.scroll)
          } else {
            // 滚动停止事件
            this.$emit('scrollEnd', pos)
          }
        })
      }
      // 下拉刷新抛出事件
      if (this.pulldown) {
        this.scroll.on('touchEnd', pos => {
          if (pos.y > 50) {
            this.$emit('scrollToTop')
          }
        })
      }
      // 滚动结束抛出事件
      this.scroll.on('touchEnd', pos => {
        this.$emit('touchend', pos)
      })
      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }
    },
    enable() {
      this.scroll && this.scroll.enable()
    },
    disable() {
      this.scroll && this.scroll.disable()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      // 滚动到相应位置
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  }
}
</script>

<style scoped>
.socrll-warppper {
  height: 100%;
  overflow: hidden;
}
</style>
