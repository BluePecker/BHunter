/**
 * Created by shuc on 17/8/30.
 */
import bluebird from 'bluebird';

const Statics = {
    // 发布
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
            return reward;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 详情
    detail(id){
        return this.findOne({
            _id    : id,
            deleted: null
        }).then(reward => {
            if (!reward) {
                throw new Error('the data does not exist.');
            }
            return reward;
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
        }).then(reward => {
            if (!reward) {
                throw new Error('the data does not exist.');
            }
            return reward;
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
        }).then(reward => {
            if (!reward) {
                throw new Error('the data does not exist.');
            }
            return reward;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 新手任务
    guide(skip, limit) {
        return this.find({
            guide: true
        }).skip(skip || 0).limit(limit || 2).lean().then(docs => {
            return docs || [];
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 头条情报
    new(skip, limit) {
        return this.find({
            new: true
        }).skip(skip || 0).limit(limit || 8).lean().then(docs => {
            return docs || [];
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    overviewById(id) {
        return this.findById(id).then(doc => {
            return doc || {};
        }).catch(err => {
            return bluebird.reject(err);
        });
    }
};

export default Statics;