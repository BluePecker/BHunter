/**
 * Created by shuc on 17/8/20.
 */
import Router from '../router';

// import Label from '../../service/label';

const V1 = new Router('label', {
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