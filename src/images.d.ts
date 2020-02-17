/**
 * ts就可以识别svg、png、jpg等等图片类型文件
 * js中引入本地静态资源图片时使用import img from './img/bd_logo1.png'
 * typscript中无法识别非代码资源，所以会报错TS2307: cannot find module '.png'。需要主动声明这个module。
 * 该只能放置在tsconfig.json中include属性所配置的文件夹下
 */

declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
