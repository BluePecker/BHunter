/**
 * Created by shuc on 17/8/5.
 */
import Koa from 'koa';
import Dir from 'node-dir';
import Config from 'config';
import Mount from 'koa-mount';
import Logger from 'koa-logger';
import Connect from './connect';
import Router from '../router/router';

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
        // get db config
        const database = Config.get('Database');
        // connect db by config defined
        this.connector(database);

        // load router
        this.router();

        // get server port
        const port = Config.get('Server.port');
        // start to listen
        this.app.listen(port, () => {
            // todo print start info
        });
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
            if (!Reflect.has(Connect, name)) {
                throw new Error(`connector ${name} not defined`);
            }
            // instantiate the connection
            this.app.context[name] = Connect[name](opt);
        });
    }

    /**
     * load router
     */
    router() {
        // check is router
        const val = (route) => {
            return Reflect.getPrototypeOf(route) == Router.prototype;
        };
        // dispatcher router
        const dispatcher = (routes) => {
            Object.keys(routes).forEach(name => {
                const route = routes[name];
                if (typeof route === 'object' && val(route)) {
                    name = name.toLowerCase();
                    if (name === 'default' || name == 'route') {
                        // for default/route route
                        this.app.use(route.routes());
                    } else {
                        // for version
                        this.app.use(Mount(`/${name}`, route.middleware()));
                    }
                }
            });
        };
        // get project root path
        const root = process.cwd();
        // traverse the router directory
        Dir.subdirs(`${root}/router`, (err, dirs) => {
            dirs.forEach(dir => {
                const routes = require(dir);
                dispatcher(routes);
            });
        }, 'dir');
    }
}

export default new Bootstrap();