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
            "use strict";
            return doc;
        }).catch(err => {
            "use strict";
            return bluebird.reject(err);
        });
    },

    // 是否经过审核
    checkAuditById(id) {
        return this.findById(id).then(merchant => {
            "use strict";
            if (!merchant || !merchant.review) {
                return false;
            }
            return merchant.review.status;
        }).catch(err => {
            "use strict";
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
            "use strict";
            return docs.map(item => {
                return {
                    type       : item.type,
                    review     : item.review,
                    information: item.information
                };
            });
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
                    status   : true,
                    timestamp: new Date,
                    user     : user
                }
            }
        }).then(doc => {
            "use strict";
            if (!doc) {
                throw new Error('the data does not exist.');
            }
            return doc;
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
                    status   : false,
                    timestamp: new Date,
                    user     : user
                }
            }
        }).then(doc => {
            "use strict";
            if (!doc) {
                throw new Error('the data does not exist.');
            }
            return doc;
        }).catch(err => {
            "use strict";
            return bluebird.reject(err);
        });
    },

    // 编辑
    edit(merchant, user) {
        return this.findByIdAndUpdate(merchant._id, {
            $set  : {
                type       : merchant.type,
                editor     : user,
                information: merchant.information
            },
            $unset: {
                review: true
            }
        }).then(doc => {
            "use strict";
            if (!doc) {
                throw new Error('the data does not exist.');
            }
            return doc;
        }).catch(err => {
            "use strict";
            return bluebird.reject(err);
        });

    }
};

export default Statics;