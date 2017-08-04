/**
 * Created by shuc on 17/8/1.
 */
import Koa from 'koa';
import Config from 'config';
import Logger from 'koa-logger';

const app = new Koa();

app.use(Logger());

app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(Config.get('Server.port'));
