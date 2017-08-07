/**
 * Created by shuc on 17/8/7.
 */
import Mongoose from 'mongoose';
import Config from 'config';
import Log4js from 'log4js';
import Builder from 'mongodb-uri';

const options = Config.get('Database.mongo') || {};
const auth = Builder.format(options);
const logger = Log4js.getLogger('koa');

const mongoose = Mongoose.connect(auth).then(() => {
    "use strict";
    logger.info(`MONGO: Successfully connected to ${auth}`);
}, err => {
    "use strict";
    logger.error(`MONGO: Unable to connected for err -> ${err}`);
});

export default mongoose;