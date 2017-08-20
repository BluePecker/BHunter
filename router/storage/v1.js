/**
 * Created by shuc on 17/8/18.
 */
import Router from '../router';
import Storage from '../../service/storage';

const V1 = new Router({prefix: '/storage'});

V1.post('/save', Storage.save);

export default V1;