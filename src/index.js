import './style/index.css'
import './style/app.css'
import './style/index.scss'
import './style/index.postcss'

import { cube, square } from './treeShaking'

setTimeout(() => {
    // 动态加载
    import('./async.js')
        .then((res) => {
            const tt = res.default('Page 2')

            console.log('async:', tt)
            document.body.append(tt)
        })
        .catch((error) => {
            console.error(error)
        })
}, 3000)
