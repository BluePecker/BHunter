/**
 * Created by shuc on 17/8/20.
 */
import Router from '../router';

import Label from '../../service/label';

const V1 = new Router({
    prefix: '/label'
});

V1.post('/create', Label.create);
V1.post('/list', Label.list);
V1.post('/adopt', Label.adopt);
V1.post('/reject', Label.reject);

export default V1;