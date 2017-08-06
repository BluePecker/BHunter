/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';

const Route = new Router();

Route.get('/create', (ctx, next) => {
    ctx.body = 'create';
    next();
});

const V1 = new Router();

V1.get('/task', (ctx) => {
    ctx.body = 'task';
});

export {Route, V1};
