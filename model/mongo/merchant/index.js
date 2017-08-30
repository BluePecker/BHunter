/**
 * Created by shuc on 17/8/17.
 */
/**
 * @typedef {{$matches:function,$isURL:function,$isMobilePhone:function}} validator
 */
import validator from 'node-mongoose-validator';
import mongoose from '../index';
import statics from './static';

const Schema = new mongoose.Schema({
    // 审核
    review     : {
        status   : Boolean,
        user     : {
            _id: mongoose.Schema.Types.ObjectId
        },
        timestamp: Date
    },
    type       : {
        type    : String,
        default : '企业',
        validate: validator.$matches('(企业)|(个人)', 'ig')
    },
    // 删除时间
    deleted    : {
        type   : Date,
        default: null
    },
    // 创建者
    creator    : {
        _id: {
            type    : mongoose.Schema.Types.ObjectId,
            required: true
        }
    },
    // 拥有者
    owner      : {
        _id: {
            type    : mongoose.Schema.Types.ObjectId,
            required: true
        }
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
        phone   : {
            type    : String,
            required: true,
            validate: validator.$isMobilePhone('zh-CN')
        },
        // 网址
        website : {
            type    : String,
            validate: validator.$isURL()
        },
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

Schema.statics = statics;

export default mongoose.model('merchant', Schema);