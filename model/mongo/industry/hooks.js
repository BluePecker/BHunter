/**
 * Created by shuc on 17/8/30.
 */
import IndustryCache from '../../redis/industry';

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
            schema.post(item, () => {
                IndustryCache.clearTreeCache();
            });
        });
    }
}

export default Hooks;