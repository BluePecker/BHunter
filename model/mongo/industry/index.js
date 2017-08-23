/**
 * Created by shuc on 17/8/17.
 */
import JSON from 'JSON';
import bluebird from 'bluebird';
import mongoose from '../index';

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

Schema.index({
    name: 'unique'
});

Schema.statics = {
    // 创建
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

    // 列表
    list() {
        return this.find({
            'deleted'      : null,
            'review.status': true
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

    // 树形
    tree() {
        return this.find({
            'deleted'      : null,
            'review.status': true
        }, 'name parent').then(docs => {
            return JSON.parse(JSON.stringify(docs));
        }).then(docs => {
            let obj = {};
            docs.forEach(item => {
                item.son = [];
                obj[item._id] = item;
            });
            return obj;
        }).then(docs => {
            Object.keys(docs).forEach(key => {
                docs[key].parent = docs[key].parent || {};
                let pid = docs[key].parent._id;
                docs[pid] && docs[pid].son.push(docs[key]);
            });
            return docs;
        }).then(docs => {
            let container = [];
            Object.keys(docs).forEach(key => {
                !docs[key].parent._id && container.push(docs[key]);
            });
            return container;
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

const Industry = mongoose.model('industry', Schema);

export default Industry;