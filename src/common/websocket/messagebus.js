import webScoket from './websocket'

export default function(fn) {
  let ip_ = 'mbgows.plu.cn'
  let port_ = 8805
  let roomid = '2277239'
  let group = 0
  let url =
    'ws://' + ip_ + ':' + port_ + '/?room_id=' + roomid + '&group=' + group
  let ws
  ws = webScoket(url)
  ws.onmessage = evt => {
    let item = evt.data
    fn(item)
  }
}

// 2241164
