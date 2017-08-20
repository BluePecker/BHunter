/**
 * Created by shuc on 17/8/17.
 */
import Router from '../router';

import Business from '../../service/business';

const V1 = new Router({
    prefix: '/business'
});

V1.post('/create', Business.create);
V1.post('/list', Business.list);
V1.post('/adopt', Business.adopt);
V1.post('/reject', Business.reject);

export default V1;