/**
 * Created by shuc on 17/8/5.
 */
import Koa from 'koa';
import Config from 'config';
import Logger from 'koa-logger';

/**
 * @class Bootstrap
 * @property {object} app
 */
class Bootstrap {
    constructor() {
        // new app
        this.app = new Koa();
        // use log middleware
        this.app.use(Logger());
    }

    start() {
        // just for test
        this.app.use(ctx => {
            ctx.body = 'Hello Koa';
        });
        // get server port
        const port = Config.get('Server.port');
        // start to listen
        this.app.listen(port);
    }
}

export default new Bootstrap();
