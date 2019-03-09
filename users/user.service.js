const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const User = db.User;

module.exports = {
    authenticate,
    getUserFromToken,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        console.log(user.toObject());
        const { hash, ...userWithoutHash } = user.toObject();
        console.log(hash);
        console.log(userWithoutHash);
        const token = jwt.sign({ sub: user.id }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getUserFromToken(req) {
    const usertoken = req.headers.authorization;
    const token = usertoken.split(' ');
    const decoded = jwt.verify(token[1], config.secret);
    const user = await this.getById(decoded.sub);
    return {
        user
    }
    // const user = await User.findOne({ username });
    // if (user && bcrypt.compareSync(password, user.hash)) {
    //     console.log(user.toObject());
    //     const { hash, ...userWithoutHash } = user.toObject();
    //     console.log(hash);
    //     console.log(userWithoutHash);
    //     const token = jwt.sign({ sub: user.id }, config.secret);
    //     return {
    //         ...userWithoutHash,
    //         token
    //     };
    // }
}

async function getAll() {
    return await User.find().select('-hash');
}

async function getById(id) {
    return await User.findById(id).select('-hash');
}

async function create(userParam) {
    // validate
    console.log(userParam);
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    console.log("asdasd");

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, userParam) {
   
    const user = await User.findById(id);
    console.log(userParam);
    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        return 'Username "' + userParam.username + '" is already taken';
    }
    

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    let userNew = Object.assign(user, userParam);
    
    console.log("userNew", user);
    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}