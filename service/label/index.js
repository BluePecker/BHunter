/**
 * Created by shuc on 17/8/20.
 */
import Service from '../index';
import Label from '../../model/mongo/label';

class LabelService extends Service {
    create = (ctx) => {
        const params = ctx.request.body;
        return Label.create(params).then(label => {
            this.response(Service.SUCCESS, label);
        }).catch(err => {
            this.response(Service.FAILURE, err.errmsg);
        });
    };
}

export default new LabelService();