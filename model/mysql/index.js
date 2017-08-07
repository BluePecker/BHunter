/**
 * Created by shuc on 17/8/7.
 */
import Builder from 'parse-dburi';
import Config from 'config';
import Sequelize from 'sequelize';
import Log4js from 'log4js';

const options = Config.get('Database.mysql') || {};
const auth = Builder.stringify(options);
const sequelize = new Sequelize(auth);
const logger = Log4js.getLogger('koa');

sequelize.authenticate().then(() => {
    "use strict";
    logger.info(`MYSQL: Successfully connected to ${auth}`);
}).catch(err => {
    "use strict";
    logger.error(`MYSQL: Unable to connected for err -> ${err}`);
});

export default sequelize;
