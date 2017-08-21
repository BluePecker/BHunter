/**
 * Created by shuc on 17/8/1.
 */
import Router from '../router';

const Route = new Router('user');

Route.get('/user', (ctx, next) => {
    ctx.body = 'hi user';
    next();
});

const V1 = new Router('user');

V1.get('/user', (ctx) => {
    ctx.body = 'user';
});

export {Route, V1};
