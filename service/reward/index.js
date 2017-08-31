/**
 * Created by shuc on 17/8/6.
 */
import Service from '../index';
// import User from '../../model/mysql/user';
import Reward from '../../model/mongo/reward';
import Merchant from '../../model/mongo/merchant';

class RewardService extends Service {
    create = (ctx) => {
        return Promise.resolve().then(() => {
            return ctx.request.body;
        }).then(reward => {
            return Merchant.checkAuditById(reward.merchant).then(audit => {
                if (!audit) {
                    throw new Error('merchants have not been reviewed.');
                }
                return reward;
            });
        }).then(reward => {
            return Reward.create(reward);
        }).then(reward => {
            console.log(reward);
            if (reward._id) {
                this.success();
            } else {
                this.failure('save failed.');
            }
        }).catch(err => {
            this.failure(err.message);
        });

        // return (new Reward(ctx.request.body)).save().then(doc => {
        //     this.response(Service.SUCCESS, {
        //         _id: doc._id
        //     });
        // }).catch(err => {
        //     this.response(Service.FAILURE, err.message);
        // });
        // User.sync({force: true}).then(() => {
        //     // Table created
        //     return User.create({
        //         created: new Date(Date.UTC(2016, 0, 1)),
        //         modified: new Date(Date.UTC(2016, 0, 1))
        //     });
        // });
    };

    detail = (ctx) => {
        return Reward.detail(ctx.request.body).then(doc => {
            return doc;
        }).then(doc => {
            this.response(Service.SUCCESS, doc);
        }).catch(err => {
            this.response(Service.FAILURE, err.message);
        });
    }
}

export default new RewardService();
