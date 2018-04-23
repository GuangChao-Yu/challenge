<template>
  <div class="chart-room-warp">
    <div class="chart-content" ref="chatroom">
      <ul class="chat-ul">
        <li class="chat-list" v-for="(item,index) in chatList" :key="index">
          <span class="username">{{item.msg.user.username}}:</span>
          <span class="char-msg" v-html="item.msg.content"></span>
        </li>
      </ul>
    </div>
    <div class="chart-bottom">
      发送弹幕区域
    </div>
  </div>
</template>

<script>
import ws from '../../common/websocket/messagebus'
export default {
  name: 'chart-room',
  mounted() {
    ws(this.getStream)
  },
  data() {
    return {
      chatList: [],
      cacheList: []
    }
  },
  methods: {
    getStream(data) {
      data = JSON.parse(data)
      if (data['type'] === 'chat') {
        if (this.chatList && this.chatList.length < 100) {
          this.chatList.push(data)
        } else {
          this.chatList.shift()
          this.chatList.push(data)
        }
        this.$refs.chatroom.scrollTop = 9999
      }
    },
    addCacheList(data) {
      this.cacheList.push(data)
    }
  }
}
</script>

<style lang="stylus">
.chart-room-warp {
  width: 375px;
  position: absolute;
  top: 40px;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;

  .chart-content {
    width: 375px;
    box-sizing: border-box;
    padding: 12px;
    position: fixed;
    top: 40px;
    bottom: 40px;
    background: #f0f0f0;
    overflow: hidden;
    overflow-y: auto;
    z-index: 3;
  }

  .chart-bottom {
    width: 375px;
    height: 40px;
    position: fixed;
    bottom: 0;
    background: #ffffff;
    border-top: 1px solid #ccc;
    text-align: center;
    line-height: 40px;
    color: #d0d0d0;
  }

  .chat-list {
    margin-bottom: 12px;
  }

  .username {
    color: #a1a1a1;
  }
}
</style>
