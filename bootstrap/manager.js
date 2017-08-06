/**
 * Created by shuc on 17/8/5.
 */
import mongoose from 'mongoose';
import Log4js from 'log4js';
import DbUri from 'parse-dburi';
import UriBuilder from 'mongodb-uri';
import Sequelize from 'sequelize';
import Redis from 'ioredis';

const logger = Log4js.getLogger();

class Connect {
    //noinspection JSUnusedGlobalSymbols
    /**
     * @param {{mysql:object}} opts
     */
    Mysql(opts) {
        opts.mysql.protocol = 'mysql';
        const uri = DbUri.stringify(opts.mysql);
        const sequelize = new Sequelize(uri);
        sequelize.authenticate().then(() => {
            logger.info(`MYSQL: successfully connected to ${uri}`);
        }).catch(err => {
            logger.error(`MYSQL: Unable to connect to the database for error -> ${err}`);
        });
        return sequelize;
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * @param {{redis:object}} opts
     */
    Redis(opts) {
        const redis = new Redis(opts.redis);
        redis.connect().then(() => {
            logger.info('REDIS: successfully connected to ' + JSON.stringify(opts.redis));
        }).catch(err => {
            logger.error(`REDIS: Unable to connect to the redis for error -> ${err}`);
        });
        redis.on('error', err => {
            logger.error(`REDIS: Unable to connect to the redis for error -> ${err}`);
        });
        return redis;
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * @param {{mongodb:object}} opts
     */
    Mongodb(opts) {
        opts.mongodb.scheme = 'mongodb';
        const uri = UriBuilder.format(opts.mongodb);
        mongoose.connect(uri).then(() => {
            logger.info(`MONGODB: Successfully connected to ${uri}`);
        }, err => {
            logger.error(`MONGODB: Unable to connect to the database for error -> ${err}`);
        });
        // todo add emitter for mongoose.connection
    }
}

export default new Connect();
