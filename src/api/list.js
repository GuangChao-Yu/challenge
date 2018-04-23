import jsonp from './jsonp'
import { commonParams, options } from './config'

export function getVideoList(startNum) {
  const url = 'http://stark.longzhu.com/api/streams/search'

  const data = Object.assign({}, commonParams, {
    'start-index': startNum
  })

  return jsonp(url, data, options)
}
