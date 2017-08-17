/**
 * Created by shuc on 17/8/16.
 */
// import bluebird from 'bluebird';
import mongoose from 'mongoose';

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
    deleted : Date,
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
}, {versionKey: false, timestamps: {createdAt: 'created', updatedAt: 'modified'}});

const Label = mongoose.model('label', LabelSchema);

export default Label;