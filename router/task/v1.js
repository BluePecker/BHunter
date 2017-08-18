/**
 * Created by shuc on 17/8/6.
 */
import Router from '../router';
import Task from '../../service/task';

const V1 = new Router({prefix: '/task'});

V1.post('/create', Task.create);
V1.post('/detail', Task.detail);

export default V1;
