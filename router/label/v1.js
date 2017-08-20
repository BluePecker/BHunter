/**
 * Created by shuc on 17/8/20.
 */
import Router from '../router';

import Task from '../../service/business';

const V1 = new Router({
    prefix: '/label'
});

V1.post('/create', Task.create);
V1.post('/list', Task.list);
V1.post('/adopt', Task.adopt);
V1.post('/reject', Task.reject);

export default V1;