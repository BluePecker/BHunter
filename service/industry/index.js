/**
 * Created by shuc on 17/8/17.
 */
import Service from '../index';
import Industry from '../../model/mongo/industry';

class IndustryService extends Service {
    /**
     * @typedef {{errmsg: string}} err
     */
    create = (ctx) => {
        const params = ctx.request.body;
        return Industry.create(params).then(industry => {
            this.response(Service.SUCCESS, industry);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };

    list = () => {
        return Industry.list().then(industry => {
            this.response(Service.SUCCESS, industry);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };

    adopt = (ctx) => {
        const params = ctx.request.body;
        return Industry.adopt(params, ctx.user).then(() => {
            this.response(Service.SUCCESS);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };

    reject = (ctx) => {
        const params = ctx.request.body;
        return Industry.reject(params, ctx.user).then(() => {
            this.response(Service.SUCCESS);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };
}

export default new IndustryService();