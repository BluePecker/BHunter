/**
 * Created by shuc on 17/8/17.
 */
import Router from '../router';

const V1 = new Router('industry', {
    patch: {
        '/adopt/:_id' : 'adopt',
        '/reject/:_id': 'reject'
    },
    get  : {
        '/tree': 'tree'
    },
    post : {
        '/create': 'create'
    }
});

export default V1;