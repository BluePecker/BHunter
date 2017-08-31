/**
 * Created by shuc on 17/8/31.
 */
import bluebird from 'bluebird';
import JSON from 'JSON';
import {redis, Cache} from '../index';
import storage from '../../mongo/storage';

class StorageCache extends Cache {
    clearById(id) {
        redis.del(this.key(id));
    }

    getById(id) {
        const key = this.key(id);
        return redis.get(key).then(cache => {
            return cache ? JSON.parse(cache) : null;
        }).then(cache => {
            if (cache) {
                return cache;
            }
            return storage.findOne({
                _id    : id,
                deleted: null
            }, '_id address').then(object => {
                if (!object) {
                    throw new Error('object not exists.');
                }
                return object;
            }).then(object => {
                const json = JSON.stringify(object);
                redis.set(key, json, 'EX', 15 * 60);
                return object;
            });
        }).catch(err => {
            return bluebird.reject(err);
        });
    }
}

export default new StorageCache();