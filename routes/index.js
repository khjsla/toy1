const express = require('express');
const router = express.Router();
//add modules and

//localhost:3000/test/first
router.get('/first', async (req, res, next) => {
    res.status(200).json({
        hello: "hello"
    });
});

router.post('/second', async (req, res, next) => {

    console.log('what is req.body: ', req.body);
    let { input } = req.body;

    if (input = "blahblah") {
        res.status(200).json({
            same: "YES"
        });
    } else {
        res.status(200).json({
            same: "NO"
        });
    }

});

module.exports = router;