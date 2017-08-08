/**
 * Created by shuc on 17/8/5.
 */
import ReadDir from 'node-dir';
import Log4js from 'log4js';
import Koa from 'koa';
import Config from 'config';
import Path from 'path-exists';
import Mount from 'koa-mount';
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
        this.logger = Log4js.getLogger('koa');
        // get project root path
        this.root = process.cwd();
        // new app
        this.app = new Koa();
        this.app.use(async(ctx, next) => {
            const start = Date.now();
            await next();
            const ms = Date.now() - start;
            // write request log
            this.logger.info('%s %s %s - %sms', ctx.status, ctx.method, ctx.url, ms);
            // x-response-time
            ctx.set('X-Response-Time', `${ms}ms`);
        });
    }

    /**
     * todo 完善日志功能
     * logger
     */
    static logger() {
        Log4js.configure(Config.get('Logger') || {});
    }

    /**
     * starting program
     */
    start() {
        // load logger
        Bootstrap.logger();
        // init db connection by config defined
        this.initDatabase(Config.get('Database') || {});
        // load router
        this.router();
        // get server port
        const port = Config.get('Server.port');
        // start to listen
        this.app.listen(port, () => {
            this.logger.info(`Server is listening ${port}`);
        });
    }

    /**
     * init database
     * @param opts
     */
    initDatabase(opts) {
        Object.keys(opts).forEach((driver) => {
            const name = driver.toLowerCase();
            /**
             * @typedef {object} PathCheck
             * @property {function} then
             */
            const PathCheck = Path(`${this.root}/model/${name}`);
            PathCheck.then(() => {
                require(`${this.root}/model/${name}`);
            }).catch(err => {
                this.logger.error(`db model not exist, error -> ${err}`);
            });
        });
    }

    /**
     * auto load router
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

        // traverse the router directory
        ReadDir.subdirs(`${this.root}/router`, (err, dirs) => {
            dirs.forEach(dir => {
                const routes = require(dir);
                dispatcher(routes);
            });
        }, 'dir');
    }
}

export default new Bootstrap();
