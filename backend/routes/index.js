const express = require('express');
const router = express.Router();

// router.get('/hello/world', function (req, res) {
//     res.cookie('XSFR-TOKEN', req.csrfToken());
//     res.send('Hello World');
// });

router.get('/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        "_csrf": csrfToken
    });
});

module.exports = router;
