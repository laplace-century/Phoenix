export default class Observable {
        constructor(obj) {
                if (isTypeOf(obj, "object")) {
                    return this.walk(obj);
                } else {
                    console.log('不存在数据直接是一个值');
                }
        }

        walk(obj) {
                const keys = Object.keys(obj);
                keys.forEach(key => {
                        this.defineReactive(obj, key, obj[key]);
                });
                return obj;
        }

        defineReactive(obj, key, val) {
                const dep = new Dep();
                Object.defineProperty(obj, key, {
                        get() {
                                dep.depend();
                                return val;
                        },
                        set(newVal) {
                                val = newVal;
                                dep.notify();
                        }
                });
        }
}
