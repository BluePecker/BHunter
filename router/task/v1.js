/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';

import Task from '../../service/task';

const V1 = new Router({prefix: '/task'});

V1.get('/create', Task.add);

export default V1;
