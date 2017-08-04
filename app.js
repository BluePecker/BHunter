/**
 * Created by shuc on 17/8/1.
 */
import Koa from 'koa';
import Logger from 'koa-logger';
import Config from 'config';

const app = new Koa();

app.use(Logger());

app.use(ctx => {
    ctx.body = 'Hello Koa';
});

app.listen(Config.get('Server.port'));
