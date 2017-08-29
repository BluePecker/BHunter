/**
 * Created by shuc on 17/8/17.
 */
import statics from './static';
import mongoose from '../index';
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

Schema.index({name: 'unique'});

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

const Industry = mongoose.model('industry', Schema);

export default Industry;