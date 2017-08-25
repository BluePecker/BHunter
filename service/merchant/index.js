/**
 * Created by shuc on 17/8/24.
 */
import Service from '../index';
import Merchant from '../../model/mongo/merchant';

class MerchantService extends Service {
    create = (ctx) => {
        const params = ctx.request.body;
        return Merchant.create(params, ctx.user).then(merchant => {
            this.success({
                _id: merchant._id
            });
        }).catch(err => {
            this.failure(err.message);
        });
    };

    edit = (ctx) => {
        ctx.request.body._id = ctx.params._id;
        return Merchant.edit(ctx.request.body, ctx.user).then(() => {
            this.success();
        }).catch(err => {
            this.failure(err.message);
        });
    };

    adopt = (ctx) => {
        return Merchant.adopt(ctx.params._id, ctx.user).then(() => {
            this.success();
        }).catch(err => {
            this.failure(err.message);
        });
    };

    reject = (ctx) => {
        return Merchant.reject(ctx.params._id, ctx.user).then(() => {
            this.success();
        }).catch(err => {
            this.failure(err.message);
        });
    };

    own = (ctx) => {
        return Merchant.own(ctx.user).then(docs => {
            this.success(docs);
        }).catch(err => {
            this.failure(err.message);
        });
    };
}

export default new MerchantService();