/**
 * Created by shuc on 17/8/1.
 */
import validator from 'node-mongoose-validator';
import mongoose from '../index';
import statics from './static';

const Schema = new mongoose.Schema({
    // 描述
    describe: {
        type    : String,
        required: true
    },
    // 标题
    headline: {
        type    : String,
        required: true
    },
    // 联系方式
    contact : {
        type    : String,
        required: true
    },
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
        // 领赏方案
        case     : {
            type    : String,
            default : '固定金额',
            validate: validator.$matches('(固定金额)|(固定比例)', 'ig')
        },
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
    deleted : {
        type   : Date,
        default: null
    },
    // 截止日期
    deadline: {
        type: Date
    },
    // 位置
    location: {
        // 类型
        type       : {
            type   : String,
            default: 'Point'
        },
        // 经纬度
        coordinates: {
            type    : [Number],
            required: true
        }
    },
    // 发布者
    creator : {
        _id: {
            type    : mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    // 编辑者
    editor  : {
        _id: {
            type: mongoose.Schema.Types.ObjectId
        }
    },
    // 行业
    industry: {
        _id: {
            type    : mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    // 商户
    merchant: {
        _id: {
            type    : mongoose.Schema.Types.ObjectId,
            required: true
        }
    }
}, {
    versionKey: false,
    timestamps: {createdAt: 'created', updatedAt: 'modified'}
}).index({
    // 位置索引
    location: "2dsphere"
});

Schema.statics = statics;

export default mongoose.model('reward', Schema);
