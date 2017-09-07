/**
 * Created by shuc on 17/9/7.
 */
import Log4js from 'log4js';
import mongoose from 'mongoose';

class Boot {

    authentication = async(ctx, next) => {
        if (!ctx.headers['json-web-token']) {
            ctx.throw(403, 'auth failed.');
        } else {
            ctx.user = {_id: mongoose.Types.ObjectId(ctx.header['json-web-token'])};
            const test = await next();
            Log4js.getLogger('koa').info(test);
        }
    };

    header = async(ctx, next) => {
        const start = Date.now();
        await next();
        ctx.set('Charset', 'utf-8');
        ctx.set('Content-Type', 'application/json');
        ctx.set('X-Response-Time', `${Date.now() - start}ms`);
    };

    logger = async(ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        Log4js.getLogger('koa').info('%s %s %s - %sms', ctx.status, ctx.method, ctx.url, ms);
    };
}

export default new Boot();