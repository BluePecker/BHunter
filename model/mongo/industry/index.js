/**
 * Created by shuc on 17/8/17.
 */
import mongoose from '../index';
import statics from './static';
import IndustryCache from '../../redis/industry';

/**
 * The complete bluebird, or one or more components of the bluebird.
 * @typedef {object} bluebird
 * @property {function} reject - Indicates whether the Courage component is reject.
 */
const Schema = new mongoose.Schema({
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
    name   : {type: String, unique: true, required: true},
    // 创建者
    creator: {
        _id: {type: mongoose.Schema.Types.ObjectId, required: true}
    },
    // 所属父行业
    parent : {
        // 父行业ID
        _id: mongoose.Schema.Types.ObjectId
    }
}, {
    versionKey: false,
    timestamps: {createdAt: 'created', updatedAt: 'modified'}
}).index({name: 'unique'});

[
    'insertMany',
    'updateMany',
    'update',
    'remove',
    'save',
    'updateOne',
    'findOneAndRemove',
    'findOneAndUpdate'
].forEach(item => {
    Schema.post(item, () => {
        IndustryCache.clearTreeCache();
    });
});

Schema.statics = statics;

export default mongoose.model('industry', Schema);