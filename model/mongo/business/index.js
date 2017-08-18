/**
 * Created by shuc on 17/8/17.
 */
import bluebird from 'bluebird';
import mongoose from 'mongoose';

/**
 * The complete bluebird, or one or more components of the bluebird.
 * @typedef {object} bluebird
 * @property {function} reject - Indicates whether the Courage component is reject.
 */
const BusinessSchema = new mongoose.Schema({
    // 审核状态
    review : {
        // 审核人
        user     : {
            _id: mongoose.Schema.Types.ObjectId
        },
        // 状态
        status   : {type: Boolean, default: false},
        // 审核时间
        timestamp: Date
    },
    // 删除时间
    deleted: {type: Date, default: null},
    // 行业名
    name   : {type: String, unique: true},
    // 创建者
    creator: {
        _id: mongoose.Schema.Types.ObjectId
    },
    // 所属父行业
    parent : {
        // 父行业ID
        _id: mongoose.Schema.Types.ObjectId
    }
}, {
    versionKey: false,
    timestamps: {createdAt: 'created', updatedAt: 'modified'}
});

BusinessSchema.index({
    name: 'unique'
});

BusinessSchema.statics = {
    // 创建行业
    create(business) {
        return (new this({
            parent : business.parent || '',
            name   : business.name || '',
            creator: business.creator || ''
        })).save().then(business => {
            return business;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 行业列表
    list() {
        return this.findOne({
            'deleted'      : null,
            'review.status': true
        }, '_id name').then(docs => {
            return docs;
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
        }).catch(err => {
            return bluebird.reject(err);
        });
    }
};

const Business = mongoose.model('business', BusinessSchema);

export default Business;