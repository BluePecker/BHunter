/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';

const V1 = new Router('task', {
    post: {
        '/create': 'create',
        '/detail': 'detail'
    }
});

export default V1;
