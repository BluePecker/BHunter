/**
 * Created by shuc on 17/8/30.
 */
import bluebird from 'bluebird';

const Statics = {
    // 详情
    detail(id){
        return this.findOne({
            '_id'          : id,
            'review.status': true,
            'deleted'      : null
        }).then(task => {
            return task;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 通过
    adopt(id, user) {
        return this.findByIdAndUpdate(id, {
            $set: {
                review: {
                    timestamp: new Date,
                    status   : true,
                    user     : user
                }
            }
        }).then(doc => {
            if (!doc) {
                throw new Error('the data does not exist.');
            }
            return doc;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 驳回
    reject(id, user) {
        return this.findByIdAndUpdate(id, {
            $set: {
                review: {
                    timestamp: new Date,
                    status   : false,
                    user     : user
                }
            }
        }).then(doc => {
            if (!doc) {
                throw new Error('the data does not exist.');
            }
            return doc;
        }).catch(err => {
            return bluebird.reject(err);
        });
    }
};

export default Statics;