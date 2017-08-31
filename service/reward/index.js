/**
 * Created by shuc on 17/8/6.
 */
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
                    throw new Error('merchant have not been reviewed.');
                }
                return reward;
            });
        }).then(reward => {
            return Industry.checkAudit(reward.industry).then(audit => {
                if (!audit) {
                    throw new Error('industry have not been reviewed.');
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
            return reward;
        }).then(reward => {
            this.response(Service.SUCCESS, reward);
        }).catch(err => {
            this.response(Service.FAILURE, err.message);
        });
    }
}

export default new RewardService();
