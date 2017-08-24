/**
 * Created by shuc on 17/8/20.
 */
import Service from '../index';
import Label from '../../model/mongo/label';

class LabelService extends Service {
    create = (ctx) => {
        const params = ctx.request.body;
        return Label.create(params, ctx.user).then(label => {
            this.response(Service.SUCCESS, {
                _id: label._id
            });
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };

    list = () => {
        return Label.list().then(label => {
            this.response(Service.SUCCESS, label);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };

    adopt = (ctx) => {
        return Label.adopt({
            _id: ctx.params._id
        }, ctx.user).then(() => {
            this.response(Service.SUCCESS);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };

    reject = (ctx) => {
        return Label.reject({
            _id: ctx.params._id
        }, ctx.user).then(() => {
            this.response(Service.SUCCESS);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };
}

export default new LabelService();