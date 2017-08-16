/**
 * Created by shuc on 17/8/6.
 */
import Service from '../index';
// import User from '../../model/mysql/user';
import Task from '../../model/mongo/task';

class TaskService extends Service {
    create = (ctx) => {
        return (new Task(ctx.request.body)).save().then(res => {
            this.response(Service.SUCCESS, res);
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
}

export default new TaskService();
