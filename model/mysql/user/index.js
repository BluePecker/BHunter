/**
 * Created by shuc on 17/8/1.
 */
import sequelize from 'sequelize';
import mysql from '../mysql';

export default mysql.define('user', {
    created: sequelize.DATE,
    modified: sequelize.DATE
}, {
    timestamps: false
});
