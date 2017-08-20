/**
 * Created by shuc on 17/8/18.
 */
import Service from '../index';
import Storage from '../../model/mongo/storage';

class StorageService extends Service {
    /**
     * 对角存储
     * @param ctx
     * @returns {*|Promise|Promise.<T>}
     */
    save = (ctx) => {
        return Storage.addBatch(ctx.request.body, ctx.user).then(objects => {
            this.success(objects.map(item => {
                return {
                    _id    : item._id,
                    address: item.address || {
                        route   : '',
                        location: ''
                    }
                };
            }));
        }).catch(err => {
            this.failure(err.errmsg);
        });
    }
}

export default new StorageService();