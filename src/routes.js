const express = require('express');

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController')
const DislikeController = require('./controllers/DislikeController')

const router = express.Router();

router.get('/', (req, res) => {
    name = req.query.name;
    return res.json( {message: `Hello, ${name}`})

});

router.get('/devs', DevController.index);

router.post('/devs', DevController.store);
router.post('/devs/:devId/likes', LikeController.store);
router.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = router;