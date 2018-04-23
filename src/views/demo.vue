<template>
  <div class="demo-warp">
    <tabs :navList="navList" :currentIndex="currentIndex" @changeTab="changeTab"></tabs>
      <div class="scroll-content" v-show="currentIndex===0">
        <video-list></video-list>
      </div>
      <div class="scroll-content" v-show="currentIndex===1">
        <chart-room></chart-room>
      </div>
  </div>
</template>

<script>
import tabs from '../components/base/tabs'
import chartRoom from '../components/biz/chart-room'
import videoList from '../components/biz/video-list'
export default {
  data() {
    return {
      navList: [{ name: '视频列表', index: 1 }, { name: '聊天室', index: 2 }],
      currentIndex: 0,
      starNum: 0
    }
  },
  methods: {
    changeTab(data) {
      this.currentIndex = data
    }
  },
  components: {
    [tabs.name]: tabs,
    [chartRoom.name]: chartRoom,
    [videoList.name]: videoList
  }
}
</script>

<style lang="stylus">
.scroll-content {
  height: 627px;
  position: relative;
}
</style>
