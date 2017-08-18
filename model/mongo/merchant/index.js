/**
 * Created by shuc on 17/8/17.
 */
import mongoose from '../index';

const MerchantSchema = new mongoose.Schema({
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
                positive: {
                    _id     : mongoose.Schema.Types.ObjectId,
                    describe: String
                },
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

MerchantSchema.statics = {

};

export default mongoose.model('merchant', MerchantSchema);