/**
 * Created by shuc on 17/8/18.
 */
import Qiniu from 'qiniu';
import Config from 'config';
import Service from '../index';

class QiniuService extends Service {

    token = () => {
        /**
         * @typedef {{key:{access: string, secret: string}}} qiniu
         */
        const qiniu = Config.get('Qiniu') || {};
        const mac = new Qiniu.auth.digest.Mac(qiniu.key.access, qiniu.key.secret);
        this.response(Service.SUCCESS, {
            token: new Qiniu.rs.PutPolicy({
                // 上传凭证有效期30分钟
                expires: 30 * 60,
                scope  : qiniu.bucket
            }).uploadToken(mac)
        });
    }
}

export default new QiniuService();