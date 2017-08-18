/**
 * Created by shuc on 17/8/18.
 */
import mongoose from '../index';

const StorageSchema = new mongoose.Schema({
    // 删除时间
    deleted : {type: Date, default: null},
    // 标签描述
    describe: String,
    // 创建者
    creator : {
        _id: mongoose.Schema.Types.ObjectId
    },
    // 数据保存地址
    address : {
        // 路径
        route   : String,
        // 数据储存位置
        location: {type: String, default: 'qiniu'}
    }
}, {
    versionKey: false,
    timestamps: {createdAt: 'created', updatedAt: 'modified'}
});

export default mongoose.model('storage', StorageSchema);