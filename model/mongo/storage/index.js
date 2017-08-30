/**
 * Created by shuc on 17/8/18.
 */
import bluebird from 'bluebird';
import mongoose from '../index';

const Schema = new mongoose.Schema({
    // 删除时间
    deleted: {type: Date, default: null},
    // 创建者
    creator: {
        _id: mongoose.Schema.Types.ObjectId
    },
    // 数据保存地址
    address: {
        // 路径
        route   : String,
        // 数据储存位置
        location: {type: String, default: 'qiniu'}
    }
}, {
    versionKey: false,
    timestamps: {createdAt: 'created', updatedAt: 'modified'}
});

Schema.statics = {
    // 批量写入数据
    addBatch(arr, user) {
        return this.insertMany(arr.map(item => {
            item.creator = user;
            return item;
        })).then(docs => {
            return docs;
        }).catch(err => {
            return bluebird.reject(err);
        });
    },

    // 获取存储路径
    getAddrByIds(id) {
        const schema = this;
        return schema.find({
            deleted: null,
            _id    : {
                $in: Array.isArray(id) ? id : [id]
            }
        }).then(docs => {
            docs.__proto__.toObject = () => {
                var container = {};
                docs.forEach(item => {
                    container[item._id] = item;
                });
                return container;
            };
            return docs;
        }).catch(err => {
            return bluebird.reject(err);
        });
    }
};

export default mongoose.model('storage', Schema);