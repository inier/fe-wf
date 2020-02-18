import B from '@src/ts/importTsTest.ts';

new B();

export default class A {
    // 字段
    public a: string;
    // 构造函数
    constructor(a: string) {
        this.a = a;
    }
}
