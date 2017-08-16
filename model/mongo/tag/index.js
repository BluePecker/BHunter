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
const TagSchema = new mongoose.Schema({
    // 标签名
    name    : String,
    // 审核
    review  : {
        // 审核状态
        status   : Boolean,
        // 审核时间
        timestamp: Date
    },
    // 删除时间
    deleted : Date,
    // 标签描述
    describe: String
}, {versionKey: false, timestamps: {createdAt: 'created', updatedAt: 'modified'}});

const Tag = mongoose.model('Tag', TagSchema);

export default Tag;