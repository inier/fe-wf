import _ from 'lodash-es'

export function square(x) {
  console.log('我是一个 square')
  console.log(_)
  const tt = _.max([1, 2, 9])
  console.log(tt)
  return x * x
}

export function cube(x) {
  console.log('我是一个 cube')
  return x * x * x
}
