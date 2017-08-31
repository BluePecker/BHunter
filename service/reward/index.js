/**
 * Created by shuc on 17/8/6.
 */
import Service from '../index';
// import User from '../../model/mysql/user';
import Reward from '../../model/mongo/reward';

class TaskService extends Service {
    create = (ctx) => {
        return (new Reward(ctx.request.body)).save().then(doc => {
            this.response(Service.SUCCESS, {
                _id: doc._id
            });
        }).catch(err => {
            this.response(Service.FAILURE, err.message);
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
        return Reward.detail(ctx.request.body).then(doc => {
            return doc;
        }).then(doc => {
            this.response(Service.SUCCESS, doc);
        }).catch(err => {
            this.response(Service.FAILURE, err.message);
        });
    }
}

export default new TaskService();
