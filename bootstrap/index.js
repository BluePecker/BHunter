/**
 * Created by shuc on 17/8/5.
 */
import Koa from 'koa';
import Dir from 'node-dir';
import Config from 'config';
import Mount from 'koa-mount';
import Log4js from 'log4js';
import Connect from './manager';
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
        // x-response-time
        this.app.use(async(ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            ctx.set('X-Response-Time', `${ms}ms`);
        });
    }

    /**
     * todo 完善日志功能
     * logger
     */
    static logger() {
        const Logger = Config.has('Logger') ? Config.get('Logger') : {};

        Log4js.configure({
            appenders: Logger.appenders || {},
            categories: Logger.categories || {}
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
        // load logger
        Bootstrap.logger();
        // get server port
        const port = Config.get('Server.port');
        // start to listen
        this.app.listen(port, () => {
            const logger = Log4js.getLogger();
            logger.info(`listening ${port}`);
        });
    }

    /**
     * connector database
     * @param opts
     */
    connector(opts) {
        // connect db by opt
        Object.keys(opts).forEach((driver) => {
            // the first letter
            driver = driver.toLowerCase();
            const name = driver.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
            // check has connector
            if (!Reflect.has(Connect, name)) {
                throw new Error(`connector ${name} not defined`);
            }
            // instantiate the connection
            const conn = Connect[name](opts);
            conn && (this.app.context[name] = conn);
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
