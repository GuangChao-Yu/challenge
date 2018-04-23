<template>
  <div class="video-list-warp">
    <div class="video-list-content">
      <scroll :data="data" @scrollToEnd="scrollToEnd" @scrollEnd="scrollEnd"
      @scrollToTop="scrollToTop">
       <div class="video-list-box">
         <a class="video-list-item" href="" v-for="(item,index) in data" :key="index">
           <span class="video-list-img">
             <img v-lazy="item.snapshot" class="fade-in"/>
           </span>
           <span class="video-list-txt">{{item.room.name}}:{{item.room.title}}</span>
         </a>
       </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import scroll from '../base/scroll'
import { getVideoList } from '../../api/list'
export default {
  name: 'video-list',
  data() {
    return {
      data: [],
      Preload: [],
      cacheData: [],
      showLoading: false,
      starNum: 0,
      pagesize: 30
    }
  },
  created() {
    this.init_()
  },
  mounted() {
    this.timmer = setTimeout(() => {
      this.starNum += this.pagesize
      this.getPreData_()
    }, 0)
  },
  methods: {
    async init_() {
      if (this.data.length >= 120) {
        this.cacheData = this.cacheData.concat(this.data.slice(0, 30))
        this.data.splice(0, 30)
      }
      await getVideoList(this.starNum).then(res => {
        if (this.data.length > 0) {
          this.data = this.data.concat(this.Preload)
        } else {
          this.data = this.data.concat(res.data.items[0].streams)
        }
      })
    },
    async getPreData_() {
      await getVideoList(this.starNum).then(res => {
        if (res.data.items[0].streams.length > 0) {
          this.Preload = res.data.items[0].streams
        } else {
          this.Preload = []
        }
      })
    },
    scrollToEnd() {
      this.starNum += this.pagesize
      this.getPreData_()
      this.init_()
    },
    scrollEnd(data) {
      // 停止滚动事件
      console.log(data)
    },
    scrollToTop() {
      if (this.cacheData.length) {
        // 缓存数据存在,添加数据
        let pushData = this.cacheData.slice(
          this.cacheData.length - 30,
          this.cacheData.length
        )
        pushData = pushData.reverse()
        pushData.forEach((item, index) => {
          this.data.unshift(item)
        })
        console.log(this.data.length)
        this.cacheData = this.cacheData.splice(0, 30)
      } else {
        // 无缓存数据，顶部更新api
        this.starNum = 0
        this.scrollToEnd()
      }
    }
  },
  components: {
    scroll
  },
  beforeDestroy() {
    if (this.timmer) {
      clearTimeout(this.timmer)
    }
  }
}
</script>

<style lang="stylus">
.video-list-warp {
  width: 375px;
  position: absolute;
  top: 40px;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
}

.video-list-content {
  width: 375px;
  box-sizing: border-box;
  padding: 12px 12px 0 12px;
  position: fixed;
  top: 40px;
  left: 0;
  bottom: 0px;
  background: #fff;
  overflow: hidden;
  z-index: 3;
}

.video-list-box {
  widows: 375px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  .video-list-item {
    position: relative;
    display: inline-block;
    width: 170px;
    height: 140px;
    background: #f0f0f0;
    margin-bottom: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
  }

  .video-list-img {
    position: relative;
    border-radius: 4px;
    display: block;
    width: 100%;
    height: 96px;
    overflow: hidden;
  }

  .video-list-img img {
    width: 100%;
    height: auto;
  }

  .video-list-img img[lazy='loading'], .video-list-img img[lazy='error'] {
    width: 60px;
    height: 60px;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .video-list-txt {
    margin: 5px 0;
    padding: 0 5px;
    font-size: 13px;
    line-height: 16px;
    color: #212121;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .loading {
    font-size: 14px;
    text-align: center;
    width: 375px;
    padding: 10px 0;
    background: #f0f0f0;
  }
}

.top-style {
  text-align: center;
  color: #d0d0d0;
  padding-bottom: 10px;
}

.fade-in {
  animation: opacity 0.25s ease-in-out;
}

@keyframes opacity {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
