import TS from './ts/index.ts';

const tDom = (str = 'test') => {
    const tDom = document.createElement('div');
    tDom.className = 'test';
    tDom.innerText = new TS(str).a;
    return tDom;
};

export default tDom;
