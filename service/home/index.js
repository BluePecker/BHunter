/**
 * Created by shuc on 17/9/26.
 */
import Service from '../index';
import Reward from '../../model/mongo/reward';

class HomeService extends Service {
    outcome = () => {
        return Promise.resolve().then(() => {
            return Promise.all([
                Promise.resolve().then(() => {
                    return '59a7cefef8a8e949d4c962ff';
                }).then(id => {
                    // todo 从mysql查出已领人数与完成人数
                    return Reward.findById(id).then(doc => {
                        return doc || {};
                    });
                }),
                Reward.new(),
                Reward.guide()
            ]);
        }).then(values => {
            return this.success({
                new  : values[0],
                guide: values[1]
            });
        }).catch(err => {
            return this.failure(err.message);
        });
    };
}

export default new HomeService();