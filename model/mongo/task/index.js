/**
 * Created by shuc on 17/8/1.
 */
import bluebird from 'bluebird';
import mongoose from '../index';

const Task = new mongoose.Schema({
    created: {
        type   : Date,
        default: Date.now
    }
});

/**
 * statics
 */
Task.statics = {
    list(id) {
        return this.findById(id).exec().then((user) => {
            if (user) {
                return user;
            }
            return bluebird.reject('error');
        });
    }
};

export default mongoose.model('task', Task);
