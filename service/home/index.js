/**
 * Created by shuc on 17/9/26.
 */
import Service from '../index';
import Reward from '../../model/mongo/reward';

class HomeService extends Service {
    outcome = () => {
        return Promise.all([
            Reward.new(),
            Reward.guide()
        ]).then(values => {
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