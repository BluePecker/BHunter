/**
 * Created by shuc on 17/8/5.
 */
import mongoose from 'mongoose';
import Log4js from 'log4js';
import Sequelize from 'sequelize';

class Connect {
    constructor() {
        this.logger = Log4js.getLogger();
    }

    //noinspection JSUnusedGlobalSymbols
    Mysql(opt) {
        opt = opt.mysql || {};
        const sequelize = new Sequelize(opt.database, opt.username, opt.password, {
            host: opt.host,
            dialect: 'mysql',
            pool: {
                max: 50,
                min: 1,
                idle: 30000
            }
        });
        sequelize.authenticate().then(() => {
            this.logger.info(`Connection has been established successfully.`);
        }).catch(err => {
            this.logger.error(`Unable to connect to the database: ${err}`);
        });
        return sequelize;
    }

    // todo connect redis
    //noinspection JSUnusedGlobalSymbols
    Redis(opt) {
    }

    //noinspection JSUnusedGlobalSymbols
    Mongodb(opt) {
        opt = opt.mongodb || {};
        const conn = mongoose.createConnection(opt.host, opt.database, opt.port, {
            user: opt.username,
            pass: opt.password,
            server: {
                auto_reconnect: true,
                keepAlive: true,
                reconnectTries: 30,
                poolSize: 50
            }
        });
        conn.on('error', err => {
            this.logger.error(`MongoDB: ERROR connecting ${err}`);
        });
        conn.on('close', () => {
            this.logger.info(`MongoDB: Connection Closed`);
        });
        conn.on('connected', () => {
            this.logger.info(`MongoDB: Successfully connected to ${opt}`);
        });
        conn.on('disconnected', () => {
            this.logger.info(`MongoDB: The connection was ended on: ${opt}`);
        });
        conn.on('reconnected', () => {
            this.logger.info(`MongoDB: Database link was reconnected`);
        });
        return conn;
    }
}

export default new Connect();
