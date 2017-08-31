/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';

const V1 = new Router('reward', {
    post: {
        '/create': 'create'
    },
    get : {
        '/detail': 'detail'
    }
});

export default V1;
