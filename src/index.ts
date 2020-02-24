import './style/index.css';
import './style/app.css';
import './style/index.less';
import './style/index.scss';
import './style/index.postcss';

import './option-chain';

import { cube } from './treeShaking';

console.log(cube(2));

// import TS from './ts/index.ts';
import('./ts/index').then((res) => {
    const Tt = res.default;
    console.log(new Tt('123'));
});

if (process.env.NODE_ENV === 'production') {
    alert(`Welcome to production:${process.env.BASE_URL}`);
}

setTimeout(() => {
    // 动态加载
    import('./async.js')
        .then((res) => {
            const tt = res.default('Page 1');

            console.log('async:', tt);
            document.body.append(tt);
        })
        .catch((error) => {
            console.error(error);
        });
}, 3000);
