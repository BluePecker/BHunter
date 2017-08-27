/**
 * Created by shuc on 17/8/17.
 */
import bluebird from 'bluebird';
import mongoose from '../index';

const Schema = new mongoose.Schema({
    // 审核
    review     : {
        status   : Boolean,
        user     : {
            _id: mongoose.Schema.Types.ObjectId
        },
        timestamp: Date
    },
    // 类型 0: 企业 1: 个人
    type       : {type: Number, default: 0},
    // 删除时间
    deleted    : {type: Date, default: null},
    // 创建者
    creator    : {
        _id: mongoose.Schema.Types.ObjectId
    },
    // 拥有者
    owner      : {
        _id: mongoose.Schema.Types.ObjectId
    },
    // 商户资料
    information: {
        // 全称
        fullName: String,
        // 昵称
        nickname: String,
        // 公司地址
        address : String,
        // 手机号
        phone   : String,
        // 网址
        website : String,
        picture : {
            // 真人照片
            live  : {
                _id     : mongoose.Schema.Types.ObjectId,
                describe: String
            },
            // 身份证
            IDCard: {
                // 正面照
                positive: {
                    _id     : mongoose.Schema.Types.ObjectId,
                    describe: String
                },
                // 背面照
                negative: {
                    _id     : mongoose.Schema.Types.ObjectId,
                    describe: String
                }
            }
        },
        // 企业执照
        license : {
            // 描述
            describe: String,
            // 执照文件id
            _id     : mongoose.Schema.Types.ObjectId,
            // 营业执照注册号
            number  : String
        }
    }
}, {
    versionKey: false,
    timestamps: {createdAt: 'created', updatedAt: 'modified'}
});

Schema.statics = {
    // 创建
    create(merchant, user) {
        return (new this({
            type       : merchant.type,
            creator    : user,
            owner      : user,
            information: merchant.information
        })).save().then(doc => {
            return doc;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 下属商户
    own(user) {
        console.log({
            'owner'  : user,
            'deleted': null
        });
        return this.find({
            'owner'  : user,
            'deleted': null
        }, 'review type information').then(docs => {
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
    },

    // 编辑
    edit(merchant, user) {
        return this.findByIdAndUpdate(merchant._id, {
            $set: {
                review     : {
                    status   : false,
                    timestamp: new Date,
                    user     : user
                },
                type       : merchant.type,
                information: merchant.information
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

export default mongoose.model('merchant', Schema);