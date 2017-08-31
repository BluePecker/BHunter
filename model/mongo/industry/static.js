/**
 * Created by shuc on 17/8/30.
 */
import JSON from 'JSON';
import bluebird from 'bluebird';

const Statics = {
    // 创建
    create(industry, user) {
        return (new this({
            parent : industry.parent || '',
            creator: user,
            name   : industry.name || ''
        })).save().then(doc => {
            return doc;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 编辑
    edit(id, industry, user) {
        return this.findByIdAndUpdate(id, industry, user).then(doc => {
            if (!doc) {
                throw new Error('the data does not exist.');
            }
            return doc;
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

export default Statics;