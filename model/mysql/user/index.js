/**
 * Created by shuc on 17/8/1.
 */
import Squelize from 'sequelize';

const squelize = new Squelize();

const User = {
    created : squelize.DATE,
    modified: squelize.DATE
};

export default squelize.define('user', User);
