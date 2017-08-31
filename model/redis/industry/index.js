/**
 * Created by shuc on 17/8/29.
 */
import bluebird from 'bluebird';
import JSON from 'JSON';
import {redis, Cache} from '../index';
import industry from '../../mongo/industry';

class IndustryCache extends Cache {

    clearTreeCache() {
        redis.del(this.key('tree'));
    }

    tree() {
        const key = this.key('tree');
        return redis.get(key).then(cache => {
            return cache ? JSON.parse(cache) : [];
        }).then(cache => {
            if (cache.length) {
                return cache;
            }
            return industry.tree().then(tree => {
                const json = JSON.stringify(tree);
                redis.set(key, json, 'EX', 60 * 15);
                return tree;
            });
        }).catch(err => {
            return bluebird.reject(err);
        });
    }
}

export default new IndustryCache();