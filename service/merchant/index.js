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
}

export default new MerchantService();