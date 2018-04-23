export const commonParams = {
  // 配置一些公用参数
  game: '',
  tag: '',
  device: 6,
  packageId: 1,
  'sort-by': 'views',
  'max-result': 30,
  version: 3.93
}

export const options = {
  // 和后端约定好的callback方法名
  param: 'callback',
  prefix: `__yu${new Date().getTime()}`
}

// 后端返回接口成功的默认返回值
export const ERR_OK = 0
