/**
 * Created by shuc on 17/8/20.
 */
import Router from '../router';

// import Label from '../../service/label';

const V1 = new Router('label', {
    put : {
        '/adopt' : 'adopt',
        '/reject': 'reject'
    },
    get : {
        '/list': 'list'
    },
    post: {
        '/create': 'create'
    }
});

// V1.put('/test', ctx => {
//     ctx.body = 'xxx';
// });

export default V1;