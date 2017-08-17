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
        status   : {type: Boolean, default: false},
        timestamp: Date
    },
    // 删除时间
    deleted: Date,
    // 行业名
    name   : {type: String, index: {unique: true}},
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

// 添加内建方法
BusinessSchema.statics = {
    // 新建行业
    create: (business) => {
        return (new Business({
            parent : business.parent || '',
            name   : business.name || '',
            creator: business.creator || ''
        })).save().then(business => {
            return business;
        }).catch(err => {
            return bluebird.reject(err);
        });
    }
};

const Business = mongoose.model('business', BusinessSchema);

export default Business;