const express = require('express');
const router = express.Router();
const overviewHandler = require('../controllers/overview');
const {CONST} = require('../utils/constants');

router.get('/', async (req, res) => {

    try {
        const data = await overviewHandler.getOverview(1);
        res.status(200).send(data);
    } catch(error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
});

module.exports = router;