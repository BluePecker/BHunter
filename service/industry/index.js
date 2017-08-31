/**
 * Created by shuc on 17/8/17.
 */
import Service from '../index';
import IndustryCache from '../../model/redis/industry';
import Industry from '../../model/mongo/industry';

class IndustryService extends Service {

    create = (ctx) => {
        return Industry.create(ctx.request.body, ctx.user).then(industry => {
            this.success({
                _id: industry._id
            });
        }).catch(err => {
            this.failure(err.message);
        });
    };

    edit = (ctx) => {
        const params = ctx.request.body;
        return Industry.adopt({
            _id: ctx.params._id
        }, {
            name  : params.name,
            parent: params.parent
        }, ctx.user).then(() => {
            this.success();
        }).catch(err => {
            this.failure(err.message);
        });
    };

    tree = () => {
        return IndustryCache.tree().then(industry => {
            this.success(industry);
        }).catch(err => {
            this.failure(err.message);
        });
    };

    adopt = (ctx) => {
        return Industry.adopt({
            _id: ctx.params._id
        }, ctx.user).then(() => {
            this.success();
        }).catch(err => {
            this.failure(err.message);
        });
    };

    reject = (ctx) => {
        return Industry.reject({
            _id: ctx.params._id
        }, ctx.user).then(() => {
            this.success();
        }).catch(err => {
            this.failure(err.message);
        });
    };
}

export default new IndustryService();