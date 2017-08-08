/**
 * Created by shuc on 17/8/8.
 */
class Service {
    constructor() {
        // interceptor
        return new Proxy(this, {
            set: (target, name, value, receiver) => {
                return Reflect.set(target, name, value, receiver);
            },
            get: (target, name) => {
                if (typeof target[name] != 'function') {
                    return Reflect.get(target, name);
                }
                return (...args) => {
                    // todo 此处判断不严谨
                    if (Reflect.has(args[0], 'req') && Reflect.has(args[0], 'res')) {
                        Reflect.set(target, 'ctx', args[0]);
                    }
                    return Reflect.apply(target[name], target, args);
                };
            }
        });
    }
}

export default Service;
