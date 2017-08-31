/**
 * Created by shuc on 17/8/30.
 */
import bluebird from 'bluebird';

const Statics = {
    // 创建
    create(merchant, user) {
        return (new this({
            type       : merchant.type,
            creator    : user,
            owner      : user,
            information: merchant.information
        })).save().then(doc => {
            return doc;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 下属商户
    own(user) {
        const schema = this;
        return schema.find({
            owner  : user,
            deleted: null
        }, 'type review information').then(docs => {
            return docs.map(item => {
                return {
                    type       : item.type,
                    review     : item.review,
                    information: item.information
                };
            });
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 通过
    adopt(id, user) {
        return this.findByIdAndUpdate(id, {
            $set: {
                review: {
                    status   : true,
                    timestamp: new Date,
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
                    status   : false,
                    timestamp: new Date,
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

    // 编辑
    edit(merchant, user) {
        return this.findByIdAndUpdate(merchant._id, {
            $set: {
                review     : null,
                type       : merchant.type,
                editor     : user,
                information: merchant.information
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