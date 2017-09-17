/**
 * Created by shuc on 17/8/6.
 */
import JSON from 'JSON';
import Promise from 'bluebird';
import Service from '../index';
// import User from '../../model/mysql/user';
import Reward from '../../model/mongo/reward';
import Merchant from '../../model/mongo/merchant';
import Industry from '../../model/mongo/industry';

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
            delete reward.deleted;
            delete reward.review;
            this.response(Service.SUCCESS, reward);
        }).catch(err => {
            this.response(Service.FAILURE, err.message);
        });
    };

    list = (ctx) => {
        return Promise.resolve().then(() => {
            return ctx.request.body;
        }).then(req => {
            switch (req.sort) {
            case 'S001':
                req.sort = {
                    'tactics.reward.univalent': -1
                };
                break;
            case 'S002':
                req.sort = {
                    created: -1
                };
                break;
            case 'S003':
                req.sort = {
                    deadline: -1
                };
                break;
            default:
                req.sort = {};
            }
            return req;
        }).then(req => {
            return Reward.paginate({
                'deleted'      : null,
                'review.status': true,
                'location'     : {
                    $near: {
                        $geometry   : {
                            type       : 'Point',
                            coordinates: [
                                req.longitude,
                                req.latitude
                            ]
                        },
                        $maxDistance: req.distance
                    }
                }
            }, {
                page  : ctx.params.page || 1,
                sort  : req.sort || {},
                select: 'describe headline contact tactics detail deadline location'
            });
        }).then(paginate => {
            this.success(paginate);
        }).catch(err => {
            this.failure(err.message);
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
