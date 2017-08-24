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
        return Industry.create(params, ctx.user).then(industry => {
            this.response(Service.SUCCESS, {
                _id: industry._id
            });
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

    tree = () => {
        return Industry.tree().then(industry => {
            this.response(Service.SUCCESS, industry);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };

    adopt = (ctx) => {
        return Industry.adopt({
            _id: ctx.params._id
        }, ctx.user).then(() => {
            this.response(Service.SUCCESS);
        }).catch(err => {
            this.response(Service.FAILURE, err.message);
        });
    };

    reject = (ctx) => {
        return Industry.reject({
            _id: ctx.params._id
        }, ctx.user).then(() => {
            this.response(Service.SUCCESS);
        }).catch(err => {
            this.response(Service.FAILURE, err.message);
        });
    };
}

export default new IndustryService();