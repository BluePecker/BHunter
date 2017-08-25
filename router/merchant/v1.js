/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';

const V1 = new Router('merchant', {
    patch: {
        '/edit/:_id'  : 'edit',
        '/reject/:_id': 'reject',
        '/adopt/:_id' : 'adopt'
    },
    post : {
        '/create': 'create'
    },
    get  : {
        '/own': 'own'
    }
});

export default V1;
