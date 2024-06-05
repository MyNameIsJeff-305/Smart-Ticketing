const router = require('express').Router();

const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

//Routes________________________________________________________
router.post('/test', (req, res) => {
    res.json({ requestBody: req.body })
});

router.get('/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        "_csrf": csrfToken
    });
});

module.exports = router;
