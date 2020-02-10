import TS from './ts/index.ts';

const h2 = document.createElement('h2');
h2.className = 'test';
h2.innerText = new TS('tttt').a;

export default h2;
