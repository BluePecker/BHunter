/**
 * Created by shuc on 17/8/17.
 */
import Service from '../index';
import Business from '../../model/mongo/business';

class BusinessService extends Service {
    /**
     * @typedef {{errmsg: string}} err
     */
    create = (ctx) => {
        const params = ctx.request.body;
        return Business.create(params).then(business => {
            this.response(Service.SUCCESS, business);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };

    list = () => {
        return Business.list().then(businesses => {
            this.response(Service.SUCCESS, businesses);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };

    adopt = (ctx) => {
        const params = ctx.request.body;
        return Business.adopt(params.business, params.user).then(() => {
            this.response(Service.SUCCESS);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };

    reject = (ctx) => {
        const params = ctx.request.body;
        return Business.reject(params.business, params.user).then(() => {
            this.response(Service.SUCCESS);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };
}

export default new BusinessService();