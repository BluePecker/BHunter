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
const Schema = new mongoose.Schema({
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
    name    : {type: String, unique: true},
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

Schema.index({
    name: 'unique'
});

Schema.statics = {
    // 创建标签
    create(label, user) {
        return (new this({
            parent : label.parent || '',
            name   : label.name || '',
            creator: user
        })).save().then(label => {
            return label;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 标签列表
    list() {
        return this.find({
            deleted: null,
            review : {
                status: true
            }
        }, 'name parent').then(docs => {
            return docs.map(item => {
                return {
                    _id   : item._id,
                    name  : item.name,
                    parent: item.parent
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
    }
};

export default mongoose.model('label', Schema);