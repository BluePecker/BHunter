/**
 * Created by shuc on 17/8/1.
 */
import mongoose from '../index';
import statics from './static';

const Schema = new mongoose.Schema({
    // 描述
    describe: String,
    // 标题
    headline: String,
    // 联系方式
    contact : String,
    // 审核
    review  : {
        // 审核人
        user     : {
            _id: mongoose.Schema.Types.ObjectId
        },
        // 状态
        status   : Boolean,
        // 审核时间
        timestamp: Date
    },
    // 策略
    tactics : {
        // 领赏方案(c1: 固定金额, c2: 提成比例*成单价)
        case     : String,
        // 限额
        quota    : Number,
        // 可供支付金钱(元)
        cash     : Number,
        // 领取条件
        condition: String,
        // 描述
        describe : String,
        // 奖赏
        reward   : {
            // 单价
            univalent: Number,
            // 比例
            percent  : Number,
            // 建议出售价
            suggest  : Number
        }
    },
    // 标签
    labels  : [String],
    // 详情
    detail  : String,
    // 附件
    annex   : [{
        // 描述
        describe: String,
        // 文件id
        _id     : mongoose.Schema.Types.ObjectId
    }],
    // 删除时间
    deleted : {type: Date, default: null},
    // 截止日期
    deadline: {
        type: Date
    },
    // 位置
    location: {
        // 类型
        type       : {type: String, default: 'Point'},
        // 经纬度
        coordinates: {type: [Number]}
    },
    // 发布者
    creator : {
        _id: mongoose.Schema.Types.ObjectId
    },
    // 行业
    industry: {
        _id: mongoose.Schema.Types.ObjectId
    },
    // 商户
    merchant: {
        _id: mongoose.Schema.Types.ObjectId
    }
}, {
    versionKey: false,
    timestamps: {createdAt: 'created', updatedAt: 'modified'}
}).index({
    // 位置索引
    location: "2dsphere"
});

Schema.statics = statics;

export default mongoose.model('task', Schema);
