/**
 * Created by shuc on 17/8/17.
 */
import Router from '../router';

import Task from '../../service/business';

const V1 = new Router({
    prefix: '/business'
});

V1.post('/create', Task.create);
V1.post('/list', Task.list);
V1.post('/adopt', Task.adopt);
V1.post('/reject', Task.reject);

export default V1;