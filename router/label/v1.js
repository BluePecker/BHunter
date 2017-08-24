/**
 * Created by shuc on 17/8/20.
 */
import Router from '../router';

const V1 = new Router('label', {
    patch: {
        '/adopt/:_id' : 'adopt',
        '/reject/:_id': 'reject'
    },
    get  : {
        '/list': 'list'
    },
    post : {
        '/create': 'create'
    }
});

export default V1;