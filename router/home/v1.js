/**
 * Created by shuc on 17/9/26.
 */
import Router from '../router';

const V1 = new Router('home', {
    get: {
        '/outcome': 'outcome'
    }
});

export default V1;