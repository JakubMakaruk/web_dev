const thinkagain = require('thinkagain')();

let User = thinkagain.createModel('User', {
    type: 'object',
    properties: {
        id: {type: 'string'},
        login: {type: 'string'},
        password: {type: 'string'},
        firstname: {type: 'string'},
        lastname: {type: 'string'},
        role: {type: 'string'}
    }
})

exports.User = User;





