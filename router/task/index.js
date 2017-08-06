/**
 * Created by shuc on 17/8/6.
 */
import V1 from './v1';
import Router from '../router';

const Route = new Router();

Route.get('/create', (ctx, next) => {
    ctx.body = 'create';
    next();
});

export {Route, V1};
