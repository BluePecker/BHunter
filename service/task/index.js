/**
 * Created by shuc on 17/8/6.
 */

class Task {
    add = (ctx) => {
        ctx.body = 'v1';
    };

    insert = (ctx) => {
        ctx.body = 'v2';
    };
}

export default new Task();
