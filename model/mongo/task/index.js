/**
 * Created by shuc on 17/8/1.
 */
import bluebird from 'bluebird';
import mongoose from '../index';
/**
 * The complete bluebird, or one or more components of the bluebird.
 * @typedef {object} bluebird
 * @property {function} reject - Indicates whether the Courage component is reject.
 */
const TaskSchema = new mongoose.Schema({
    // 描述
    describe: String,
    // 标题
    headline: String,
    // 联系方式
    contact : String,
    // 审核
    review  : {
        // 状态 (r1: 发布待审, r2: 审核通过)
        status   : String,
        timestamp: {type: Date}
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
    tags    : [String],
    // 详情
    detail  : String,
    // 附件
    annex   : [{
        // 描述
        describe: String,
        // 文件id
        _id     : mongoose.Schema.Types.ObjectId
    }],
    // 截止日期
    deadline: {
        type: Date
    },
    // 位置
    location: {
        type       : {type: String},
        coordinates: {type: [Number]}
    },
    // 发布者
    creator : {
        _id: mongoose.Schema.Types.ObjectId
    },
    // 行业
    business: {
        _id: mongoose.Schema.Types.ObjectId
    },
    // 商户
    merchant: {
        _id: mongoose.Schema.Types.ObjectId
    }
}, {versionKey: false, timestamps: {createdAt: 'created', updatedAt: 'modified'}});

// 添加索引
TaskSchema.index({
    // 位置索引
    location: "2dsphere"
});

/**
 * 新增或修改任务
 */
TaskSchema.write = {
    // insert: (task) => {
    //
    // },


    // 审核任务
    review: (id) => {
        return this.findByIdAndUpdate(id, {
            $set: {
                review: {
                    timestamp: new Date,
                    status   : 'r2'
                }
            }
        }).exec().then(res => {
            return res;
        }).catch(err => {
            return bluebird.reject(err);
        });
    }
};

const Task = mongoose.model('task', TaskSchema);

Task.schema.path('describe').validate(val => {
    return val.length;
}, '描述为必填字段');
Task.schema.path('headline').validate(val => {
    return val.length;
}, '标题为必填字段');
Task.schema.path('detail').validate(val => {
    return val.length;
}, '详情为必填字段');
Task.schema.path('tags').validate(val => {
    return val.every(item => {
        return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(item);
    });
}, '标签必填字段');
Task.schema.path('contact').validate(val => {
    return !val || /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(val);
}, '联系方式格式错误');
Task.schema.path('review.status').validate(val => {
    return ['r1', 'r2'].indexOf(val) >= 0;
}, '审核状态有误');
Task.schema.path('creator._id').validate(val => {
    return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(val);
}, '发布者ID有误');
Task.schema.path('business._id').validate(val => {
    return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(val);
}, '行业ID有误');
Task.schema.path('merchant._id').validate(val => {
    return /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(val);
}, '商户ID有误');

export default Task;
