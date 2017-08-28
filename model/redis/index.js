/**
 * Created by shuc on 17/8/7.
 */
import Config from 'config';
import Redis from 'ioredis';
import Log4js from 'log4js';
import Builder from 'parse-dburi';

const logger = Log4js.getLogger('koa');
const options = Config.get('Database.redis') || {};
const auth = Builder.stringify(options);

// retry strategy
const redis = new Redis(auth, options.options || {}, {
    retryStrategy: (times) => {
        "use strict";
        if (times < ((options.options || {}).retries || 3)) {
            // 500 ms
            return 500;
        }
    }
});

redis.on('connect', () => {
    "use strict";
    logger.info(`REDIS: Successfully connected to ${auth}`);
});

redis.on('error', (err) => {
    "use strict";
    logger.info(`REDIS: Unable to connected for err -> ${err}`);
});

export default redis;