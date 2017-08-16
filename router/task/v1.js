/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';

import Task from '../../service/task';

const V1 = new Router({prefix: '/task'});

V1.post('/create', Task.create);

export default V1;
