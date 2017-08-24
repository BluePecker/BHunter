/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';

const V1 = new Router('merchant', {
    post: {
        '/create': 'create'
    }
});

export default V1;
