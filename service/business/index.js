/**
 * Created by shuc on 17/8/17.
 */
import Service from '../index';
import Business from '../../model/mongo/business';

class BusinessService extends Service {
    create = (ctx) => {
        const params = ctx.request.body;
        return Business.create(params).then(business => {
            this.response(Service.SUCCESS, business);
        }).catch(err => {
            this.response(Service.FAILURE, err);
        });
    }
}

export default new BusinessService();