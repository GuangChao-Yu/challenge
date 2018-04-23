import Vue from 'vue'
import 'vw-layout'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import './common/style/index.styl'

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  error:
    window.devicePixelRatio === 3
      ? require('./assets/loading@3x.png')
      : require('./assets/loading@2x.png'), // 这个是请求失败后显示的图片
  loading:
    window.devicePixelRatio === 3
      ? require('./assets/loading@3x.png')
      : require('./assets/loading@2x.png'), // 这个是加载的loading过渡效果
  try: 1 // 这个是加载图片数量
})

if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
  Vue.config.performance = true
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
