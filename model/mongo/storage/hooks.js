/**
 * Created by shuc on 17/8/30.
 */
import StorageCache from '../../redis/storage';

class Hooks {
    constructor(schema) {
        [
            'insertMany',
            'updateMany',
            'update',
            'remove',
            'save',
            'updateOne',
            'findOneAndRemove',
            'findOneAndUpdate'
        ].forEach(item => {
            schema.post(item, (doc) => {
                StorageCache.clearById(doc._id);
            });
        });
    }
}

export default Hooks;