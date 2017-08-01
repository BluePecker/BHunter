/**
 * Created by shuc on 17/8/1.
 */
import bluebird from 'bluebird';
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    created: {
        type   : Date,
        default: Date.now
    }
});

/**
 * statics
 */
TaskSchema.statics = {
    list(id) {
        return this.findById(id).exec().then((user) => {
            if (user) {
                return user;
            }
            return bluebird.reject('error');
        });
    }
};

export default mongoose.model('task', TaskSchema);
