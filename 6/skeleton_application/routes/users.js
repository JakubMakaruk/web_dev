const uniqid = require('uniqid');
const express = require('express');
const model = require('../model/user.model.js');
const router = express.Router(); // tool for creating routes in other file

// const users = [
//     {
//         firstname: 'Jan',
//         lastname: 'Kowalski',
//         email: 'jankowalski@przyklad.pl',
//         age: '23'
//     },
//     {
//         firstname: 'Mateusz',
//         lastname: 'Kwiatkowski',
//         email: 'mateuszkwiatkowski@przyklad.pl',
//         age: '23'
//     }
// ]

let users = [];

let tempUser = model.User({
    id: uniqid(),
    login: 'jakubmakaruk',
    password: '123456',
    firstname: 'Jakub',
    lastname: 'Makaruk',
    role: 'admin'
});

users.push(tempUser);

router.get('/', (req, res) => {
    res.send(users);
})

router.post('/', (req, res) => {
    let reqUser = req.body;
    reqUser.id = uniqid();

    let user = model.User(reqUser);

    users.push(user);
    res.send(users);
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((u) => u.id === id);
    res.send(user);
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find((u) => u.id === id);

    if (user) {
        user.login = req.body.login ? req.body.login : user.login;
        user.password = req.body.password ? req.body.password : user.password;
        user.firstname = req.body.firstname ? req.body.firstname : user.firstname;
        user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
        user.role = req.body.role ? req.body.role : user.role;
    }

    res.send(user);
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const userIndex = users.findIndex((u) => u.id === id);

    users.splice(userIndex, 1);

    res.send(users);
})

module.exports = router; // export module to link with other files
