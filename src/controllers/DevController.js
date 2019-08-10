const axios = require('axios');

const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        try {
            const { username } = req.body;

            const userExists = await Dev.findOne({user: username});
    
            if(userExists) {
                return res.json(userExists);
            }
    
            const response = await axios.get(`https://api.github.com/users/${username}`);
            const { name, bio, avatar_url: avatar } = response.data;

            if(!name) {
                name = username;
            }
    
            const dev = await Dev.create({
                name: name,
                user: username,
                bio: bio,
                avatar: avatar
            })
    
            res.json(dev)
        } catch(err) {
            res.status(500).json(err);

        }

    },
    async index(req, res) {
        const { user } = req.headers;

        const loggedUser = await Dev.findById(user);
        const users = await Dev.find({
            $and: [
                { _id: { 
                    $ne: user
                }
            }, {
                _id: { 
                    $nin: loggedUser.likes
                }
            }, {
                _id: {
                    $nin: loggedUser.dislikes
                }
            }
            ]
        })

        return res.json(users);
    }
}