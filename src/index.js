import './style/index.css';
import './style/app.css';
import './style/index.less';
import './style/index.scss';
import './style/index.postcss';

import './option-chain';
import 'vue';
import 'react';

import { cube, square } from './treeShaking';

console.log(cube(2));

// import TS from './ts/index.ts';
import('./ts/index.ts').then((res) => {
    console.log(new res.default('123'));
});

setTimeout(() => {
    //动态加载
    import('./async.js')
        .then((result) => {
            console.log('async:', result.default);
            document.body.append(result.default);
        })
        .catch((error) => {
            console.error(error);
        });
}, 3000);
