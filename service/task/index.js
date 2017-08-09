/**
 * Created by shuc on 17/8/6.
 */
import Service from '../index';
import User from '../../model/mysql/user';
import Task from '../../model/mongo/task';

class TaskService extends Service {
    add = () => {
        User.sync({force: true}).then(() => {
            // Table created
            return User.create({
                created: new Date(Date.UTC(2016, 0, 1)),
                modified: new Date(Date.UTC(2016, 0, 1))
            });
        });

        (new Task({})).save();
        this.response(Service.SUCCESS, 'add success');
    };
}

export default new TaskService();
