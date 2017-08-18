/**
 * Created by shuc on 17/8/18.
 */
import Router from '../router';
import Qiniu from '../../service/qiniu';

const V1 = new Router({prefix: '/qiniu'});

V1.get('/token', Qiniu.token);

export default V1;