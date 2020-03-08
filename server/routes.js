const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.send("<center>asdfasdfa<h1>x = (-b+-sqrt(b^2-4ac)/2a)</h1><br>🍑</center>");

});

module.exports = router;