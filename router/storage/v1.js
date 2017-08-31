/**
 * Created by shuc on 17/8/18.
 */
import Router from '../router';

const V1 = new Router('storage', {
    post: {
        '/save': 'save'
    },
    get : {
        '/view/:_id': 'view'
    }
});

export default V1;