/**
 * Created by shuc on 17/9/26.
 */
import Promise from 'bluebird';
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
                    return Reward.findOne({
                        'deleted'      : null,
                        '_id'          : id,
                        'review.status': true
                    }, 'describe headline tactics').then(doc => {
                        return doc || {};
                    });
                }),
                Reward.find({
                    'deleted'      : null,
                    'new'          : true,
                    'review.status': true
                }, 'describe headline tactics').skip(0).limit(8).lean().then(docs => {
                    return docs || [];
                }),
                Reward.find({
                    'deleted'      : null,
                    'guide'        : true,
                    'review.status': true
                }, 'describe headline tactics').skip(0).limit(2).lean().then(docs => {
                    return docs || [];
                })
            ]);
        }).then(values => {
            return this.success({
                overview: values[0],
                new     : values[1],
                guide   : values[2]
            });
        }).catch(err => {
            return this.failure(err.message);
        });
    };
}

export default new HomeService();