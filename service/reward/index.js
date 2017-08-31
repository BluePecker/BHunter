/**
 * Created by shuc on 17/8/6.
 */
import mongoose from 'mongoose';
import JSON from 'JSON';
import Promise from 'bluebird';
import Service from '../index';
// import User from '../../model/mysql/user';
import Reward from '../../model/mongo/reward';
import Merchant from '../../model/mongo/merchant';
import Industry from '../../model/mongo/industry';
import Storage from '../../model/mongo/storage';

class RewardService extends Service {
    create = (ctx) => {
        return Promise.resolve().then(() => {
            return ctx.request.body;
        }).then(reward => {
            return Merchant.checkAudit(reward.merchant, ctx.user).then(audit => {
                if (!audit) {
                    throw new Error('merchant has not been reviewed.');
                }
                return reward;
            });
        }).then(reward => {
            return Industry.checkAudit(reward.industry).then(audit => {
                if (!audit) {
                    throw new Error('industry has not been reviewed.');
                }
                return reward;
            });
        }).then(reward => {
            return Reward.create(reward, ctx.user);
        }).then(reward => {
            if (reward._id) {
                this.success();
            } else {
                this.failure('save failed.');
            }
        }).catch(err => {
            this.failure(err.message);
        });

        // User.sync({force: true}).then(() => {
        //     // Table created
        //     return User.create({
        //         created: new Date(Date.UTC(2016, 0, 1)),
        //         modified: new Date(Date.UTC(2016, 0, 1))
        //     });
        // });
    };

    detail = (ctx) => {
        return Reward.detail(ctx.params._id).then(reward => {
            // 判断悬赏是否经过审核
            if (!reward.review || !reward.review.status) {
                throw new Error('reward has not been reviewed.');
            }
            return JSON.parse(JSON.stringify(reward));
        }).then(reward => {
            return Merchant.findOne({
                _id: reward.merchant
            }, 'information type review').then(merchant => {
                if (!merchant) {
                    throw new Error('merchant has been removed.');
                }
                if (!merchant.review || !merchant.review.status) {
                    throw new Error('merchant has not been reviewed.');
                }
                reward.merchant = {
                    _id        : merchant._id,
                    type       : merchant.type,
                    information: merchant.information
                };
                return reward;
            });
        }).then(reward => {
            return Industry.findOne({
                _id: reward.industry
            }, 'name review').then(industry => {
                if (!industry) {
                    throw new Error('industry has been removed.');
                }
                if (!industry.review || !industry.review.status) {
                    throw new Error('industry has not been reviewed.');
                }
                reward.industry = {
                    _id : industry._id,
                    name: industry.name
                };
                return reward;
            });
        }).then(reward => {
            return Storage.getAddrByIds(reward.annex.map(item => {
                return mongoose.Types.ObjectId(item);
            })).then(map => {
                reward.annex = reward.annex.map(item => {
                    const object = map[item._id];
                    item.address = object ? object.address : {};
                    return item;
                });
                return reward;
            });
        }).then(reward => {
            delete reward.review;
            this.response(Service.SUCCESS, reward);
        }).catch(err => {
            this.response(Service.FAILURE, err.message);
        });
    };

    adopt = (ctx) => {
        return Reward.adopt({
            _id: ctx.params._id
        }, ctx.user).then(() => {
            this.success();
        }).catch(err => {
            this.failure(err.message);
        });
    };

    reject = (ctx) => {
        return Reward.reject({
            _id: ctx.params._id
        }, ctx.user).then(() => {
            this.success();
        }).catch(err => {
            this.failure(err.message);
        });
    };
}

export default new RewardService();
