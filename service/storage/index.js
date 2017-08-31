/**
 * Created by shuc on 17/8/18.
 */
import Service from '../index';
import Storage from '../../model/mongo/storage';

class StorageService extends Service {
    /**
     * 对象存储
     * @param ctx
     * @returns {*|Promise|Promise.<array>}
     */
    save(ctx) {
        const params = ctx.request.body;
        return Storage.addBatch(params, ctx.user)
            .then(objects => {
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
                this.failure(err.message);
            });
    }

    auth() {
        return true;
    }

    view(ctx) {
        return Storage.findById(ctx.params._id).then(object => {
            if (!object) {
                throw new Error('object not exists.');
            }
            ctx.redirect(object.address.route);
        }).catch(err => {
            ctx.throw(err.message, 404);
        });
    }
}

export default new StorageService();