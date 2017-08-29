/**
 * Created by shuc on 17/8/29.
 */
import bluebird from 'bluebird';
import JSON from 'JSON';
import {redis, Cache} from '../index';
import Industry from '../../mongo/industry';

class IndustryCache extends Cache {
    tree() {
        const key = this.key('tree');
        return redis.get(key).then(cache => {
            return cache ? JSON.parse(cache) : [];
        }).then(cache => {
            return !cache.length ? Industry.tree().then(tree => {
                redis.set(key, JSON.stringify(tree));
                return tree;
            }) : cache;
        }).catch(err => {
            return bluebird.reject(err);
        });
    }
}

export default new IndustryCache();