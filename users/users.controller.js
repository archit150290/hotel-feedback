const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);
router.post('/userfromtoken', userfromtoken);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json({ "success": 1, "data": user, "msg": "User Logged In Successfully" }) : res.status(200).json({ "success": 0, "msg": 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function userfromtoken(req, res, next) {
    userService.getUserFromToken(req)
        .then(user => user ? res.json({ "success": 1, "data": user }) : res.status(200).json({ "success": 0 }))
        .catch(err => next(err));
}

function register(req, res, next) {
    console.log("Create Users");
    userService.create(req.body)
        .then(() => res.json({ "success": 1, "msg": "User Created" }))
        .catch(err => res.json({ "success": 0, "msg": err }));
}

function getAll(req, res, next) {

    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {

    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    console.log(req.params.id, req.body);
    userService.update(req.params.id, req.body)
        .then(() => res.json({"success" : 1, "msg" : "User Updated succesfully"}))
        .catch(err => res.json({"success" : 0, "msg" : "Something went wrong"}));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
