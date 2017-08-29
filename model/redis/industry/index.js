/**
 * Created by shuc on 17/8/29.
 */
import bluebird from 'bluebird';
import JSON from 'JSON';
import {redis, Cache} from '../index';
import Industry from '../../mongo/industry';

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
            return Industry.tree().then(tree => {
                redis.set(key, JSON.stringify(tree), 'EX', 60);
                return tree;
            });
        }).catch(err => {
            return bluebird.reject(err);
        });
    }
}

export default new IndustryCache();