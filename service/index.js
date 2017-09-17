/**
 * Created by shuc on 17/8/8.
 */

class ResponseCode {
    static SUCCESS = 200;
    static FAILURE = 400;
}

class Service extends ResponseCode {

    constructor() {
        super();
        // interceptor
        const interceptor = {
            get: (target, name) => {
                if (typeof target[name] != 'function') {
                    return Reflect.get(target, name);
                }
                return (...args) => {
                    if (typeof args[0] == 'object' && Reflect.has(args[0], 'body')) {
                        Reflect.set(target, 'ctx', args[0]);
                    }
                    return Reflect.apply(target[name], target, args);
                };
            },
            set: (target, name, value, receiver) => {
                return Reflect.set(target, name, value, receiver);
            }
        };
        return new Proxy(this, interceptor);
    }

    /**
     * 应答
     * @param code
     * @param data
     * @param message
     */
    response(code, data, message) {
        if (typeof data == 'string') {
            message = data;
            data = null;
        }
        this.ctx.body = {
            code   : code,
            data   : (Array.isArray(data) ? {docs: data} : data) || {},
            message: message
        };
    }

    /**
     * 成功
     * @param data
     * @param message
     */
    success(data, message) {
        if (typeof data == 'string') {
            message = data;
            data = null;
        }
        this.ctx.body = {
            code   : ResponseCode.SUCCESS,
            data   : (Array.isArray(data) ? {docs: data} : data) || {},
            message: message || 'winner winner,chicken dinner.'
        };
    }

    /**
     * 失败
     * @param data
     * @param message
     */
    failure(data, message) {
        if (typeof data == 'string') {
            message = data;
            data = null;
        }
        this.ctx.body = {
            code   : ResponseCode.FAILURE,
            data   : (Array.isArray(data) ? {docs: data} : data) || {},
            message: message
        };
    }
}

export default Service;
