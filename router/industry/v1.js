/**
 * Created by shuc on 17/8/17.
 */
import Router from '../router';

const V1 = new Router('industry', {
    get : {
        '/list': 'list'
    },
    post: {
        '/create': 'create',
        '/adopt' : 'adopt',
        '/reject': 'reject'
    }
});

export default V1;