/**
 * Created by shuc on 17/8/18.
 */
import Router from '../router';
import Storage from '../../service/storage';

const V1 = new Router('storage', {
    post: {
        '/save': 'save'
    }
});

V1.get('/scan/:_id', async(ctx, next) => {
    ctx.allow = true;
    await next();
}, Storage.scan);

export default V1;