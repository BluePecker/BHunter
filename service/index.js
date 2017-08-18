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
        return new Proxy(this, {
            get: (target, name) => {
                if (typeof target[name] != 'function') {
                    return Reflect.get(target, name);
                }
                return (...args) => {
                    if (typeof args[0] == 'object' && Reflect.has(args[0], 'body')) {
                        Reflect.set(target, 'ctx', args[0]);
                        // for auth
                        if (!Reflect.apply(target['auth'], target, [])) {
                            return this.failure('auth failed');
                        }
                    }
                    return Reflect.apply(target[name], target, args);
                };
            },
            set: (target, name, value, receiver) => {
                return Reflect.set(target, name, value, receiver);
            }
        });
    }

    /**
     * 权限验证
     * @returns {boolean}
     */
    auth() {
        const header = this.ctx.headers;
        this.ctx.user = {
            _id: header['json-web-token']
        };
        return header['json-web-token'] ? true : false;
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
            data   : data || {},
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
            data   : data || {},
            message: message
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
            data   : data || {},
            message: message
        };
    }
}

export default Service;
