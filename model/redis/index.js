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
const redis = new Redis(auth, options.options || {});

redis.connect(() => {
    "use strict";
    logger.info(`REDIS: Successfully connected to ${auth}`);
});

export default redis;