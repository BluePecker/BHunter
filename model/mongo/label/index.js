/**
 * Created by shuc on 17/8/16.
 */
import bluebird from 'bluebird';
import mongoose from '../index';

/**
 * The complete bluebird, or one or more components of the bluebird.
 * @typedef {object} bluebird
 * @property {function} reject - Indicates whether the Courage component is reject.
 */
const LabelSchema = new mongoose.Schema({
    // 审核
    review  : {
        // 审核状态
        status   : Boolean,
        // 审核人
        user     : {
            _id: mongoose.Schema.Types.ObjectId
        },
        // 审核时间
        timestamp: Date
    },
    // 标签名
    name    : String,
    // 删除时间
    deleted : {type: Date, default: null},
    // 标签描述
    describe: String,
    // 创建者
    creator : {
        _id: mongoose.Schema.Types.ObjectId
    },
    // 父级标签
    parent  : {
        _id: mongoose.Schema.Types.ObjectId
    }
}, {
    versionKey: false,
    timestamps: {createdAt: 'created', updatedAt: 'modified'}
});

LabelSchema.statics = {
    // 创建标签
    create(label) {
        return (new this({
            parent : label.parent || '',
            name   : label.name || '',
            creator: label.creator || ''
        })).save().then(business => {
            return business;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 标签列表
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

export default mongoose.model('label', LabelSchema);