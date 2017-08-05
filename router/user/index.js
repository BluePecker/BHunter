/**
 * Created by shuc on 17/8/1.
 */
import Router from '../router';

const Route = new Router();

Route.get('/user', (ctx, next) => {
    ctx.body = 'hi user';
    next();
});

const V1 = new Router();

V1.get('/user', (ctx) => {
    ctx.body = 'v1';
});

export {Route, V1};

// export default Route;
