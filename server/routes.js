const express = require('express');
const router = express.Router();

router.get('/where', (req,res) => {
    res.send("{des moines}");

});

module.exports = router;
