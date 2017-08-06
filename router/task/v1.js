/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';

const V1 = new Router({prefix: '/task'});

V1.get('/create', (ctx) => {
    ctx.body = 'v1-task';
});

export default V1;
