/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';

const V1 = new Router('reward', {
    post : {
        '/create': 'create'
    },
    get  : {
        '/list/:page' : 'list',
        '/detail/:_id': 'detail'
    },
    patch: {
        '/adopt/:_id' : 'adopt',
        '/reject/:_id': 'reject'
    }
});

export default V1;
