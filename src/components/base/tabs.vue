<template>
  <div class="tabs-bar-warpper">
     <div class="tabs-bar" ref="nav">
      <div class="tabs_active-bar" :style="activeStyle"></div>
      <div :class="tabCls(item,index)" v-for="(item,index) in navList" :key="index" @click="handleChange(index)">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  props: {
    currentIndex: {
      type: Number
    },
    navList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      currentShow: this.currentIndex,
      activeStyle: {
        width: '0px',
        left: '0px'
      }
    }
  },
  mounted() {
    this.byStyle()
  },
  methods: {
    tabCls(item, index) {
      return ['tabs-tab', `tabs-${index}`]
    },
    byStyle(index) {
      this.$nextTick(() => {
        const dom = document.querySelector(`.tabs-${this.currentShow}`)
        this.activeStyle.width = dom.clientWidth + 'px'
        this.activeStyle.left = dom.offsetLeft + 'px'
      })
    },
    handleChange(index) {
      this.byStyle()
      this.currentShow = index
      this.$emit('changeTab', index)
    }
  }
}
</script>

<style lang="stylus">
.tabs-bar-warpper {
  width: 351px;
  margin: 0 auto;
}

.tabs-bar {
  transition: transform 0.3s;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 2px solid #e7e7e7 !important;

  .tabs-tab {
    height: 38px;
    font-size: 14px;
    color: #757575;
    text-align: center;
    flex: 1;
    line-height: 38px;
  }

  .tabs-tab-active {
    color: #FB7299;
  }

  .tabs_active-bar {
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 2px;
    background-color: #FB7299;
    z-index: 1;
    transition: all 0.2s ease;
    list-style: none;
  }
}
</style>
