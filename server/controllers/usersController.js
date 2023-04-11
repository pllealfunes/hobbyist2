const User = require('../models/userSchema')


class UserService {
    //  list
    static list() {
        return User.find({})
            .then((users) => {
                return users
            })
    }

    //  find
    static find(obj) {
        return User.findOne(obj)
            .then((user) => {
                return user
            })
    }
    //  create
    static create(obj) {
        let user = new User(obj)
        return user.save()
    }

    //  update
    static update(id, data) {
        return User.findById(id)
            .then((user) => {
                user.set(data)
                user.save()
                return user
            });
    }

    //  delete
    static delete(id) {
        return User.deleteOne({ _id: id })
            .then((obj) => {
                return obj
            })
    }
}


module.exports.UserService = UserService;