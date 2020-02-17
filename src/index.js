import './style/index.css'
import './style/app.css'
import './style/index.less'
import './style/index.scss'
import './style/index.postcss'

import './option-chain'

import { cube, square } from './treeShaking'

console.log(cube(2))

// import TS from './ts/index.ts';
import('./ts/index.ts').then((res) => {
  console.log(new res.default('123'))
})

setTimeout(() => {
    // 动态加载
    import('./async.js')
      .then((res) => {
        const tt = res.default('Page 1')

        console.log('async:', tt)
        document.body.append(tt)
      })
      .catch((error) => {
        console.error(error)
      })
}, 3000)
