/**
 * Created by shuc on 17/8/5.
 */
import Koa from 'koa';
import Config from 'config';
import Logger from 'koa-logger';
import connect from './connect';

/**
 * @class Bootstrap
 * @property {object} app
 */
class Bootstrap {
    /**
     * construct func
     */
    constructor() {
        // new app
        this.app = new Koa();
        // use log middleware
        this.app.use(Logger());
        // x-response-time
        this.app.use(async(ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            ctx.set('X-Response-Time', `${ms}ms`);
        });
    }

    /**
     * starting program
     */
    start() {
        // todo just for test
        this.app.use(ctx => {
            ctx.body = 'Hello Koa';
        });

        // get db config
        const database = Config.get('Database');
        // connect db by config defined
        this.connector(database);

        // get server port
        const port = Config.get('Server.port');
        // start to listen
        this.app.listen(port);
    }

    /**
     * connector database
     * @param opt
     */
    connector(opt) {
        // connect db by opt
        Object.keys(opt).forEach((conn) => {
            // the first letter
            conn = conn.toLowerCase();
            const name = conn.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
            // check has connector
            if (!Reflect.has(connect, name)) {
                throw new Error(`connector ${name} not defined`);
            }
            // instantiate the connection
            this.app.context[name] = connect[name](opt);
        });
    }
}

export default new Bootstrap();
