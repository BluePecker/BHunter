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
        const pass = '/v1/storage/view/';
        if (this.ctx.path.match(pass)) {
            return true;
        }
        return super.auth();
    }

    view(ctx) {
        return Storage.findById(ctx.params._id).then(object => {
            if (!object) {
                throw new Error('object not exists.');
            }
            ctx.redirect(object.address.route);
        }).catch(() => {
            ctx.throw(404);
        });
    }
}

export default new StorageService();