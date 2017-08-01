/**
 * Created by shuc on 17/8/1.
 */
import squelize from 'sequelize';

const User = {
    created : squelize.DATE,
    modified: squelize.DATE
};

export default squelize.define('user', User);
