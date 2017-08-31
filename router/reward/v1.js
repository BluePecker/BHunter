/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';

const V1 = new Router('reward', {
    post: {
        '/create': 'create'
    },
    get : {
        '/detail/:_id': 'detail'
    }
});

export default V1;
