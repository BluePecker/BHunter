/**
 * Created by shuc on 17/8/30.
 */
import bluebird from 'bluebird';

const Statics = {
    create(reward, user) {
        return (new this({
            describe: reward.describe,
            headline: reward.headline,
            contact : reward.contact,
            tactics : reward.tactics,
            detail  : reward.detail,
            annex   : reward.annex,
            deadline: reward.deadline,
            location: reward.location,
            creator : user,
            industry: reward.industry,
            merchant: reward.merchant
        })).save().then(reward => {
            "use strict";
            return reward;
        }).catch(err => {
            "use strict";
            return bluebird.reject(err);
        });
    },

    // 详情
    detail(id){
        return this.findOne({
            _id    : id,
            deleted: null
        }).then(reward => {
            "use strict";
            if (!reward) {
                throw new Error('the data does not exist.');
            }
            return reward;
        }).catch(err => {
            "use strict";
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
        }).then(reward => {
            "use strict";
            if (!reward) {
                throw new Error('the data does not exist.');
            }
            return reward;
        }).catch(err => {
            "use strict";
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
        }).then(reward => {
            "use strict";
            if (!reward) {
                throw new Error('the data does not exist.');
            }
            return reward;
        }).catch(err => {
            "use strict";
            return bluebird.reject(err);
        });
    }
};

export default Statics;