/**
 * Created by shuc on 17/8/20.
 */
import Router from '../router';

const V1 = new Router('label', {
    patch: {
        '/adopt' : 'adopt',
        '/reject': 'reject'
    },
    get  : {
        '/list': 'list'
    },
    post : {
        '/create': 'create'
    }
});

export default V1;