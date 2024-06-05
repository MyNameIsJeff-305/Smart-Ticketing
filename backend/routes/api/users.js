const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateSignup} = require('../../utils/validations');

const router = express.Router();

//Routes___________________________________
//Signup
router.post('/', validateSignup, async(req, res) => {
    const { email, password, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({ email, username, hashedPassword });

    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username
    };

    await setTokenCookie(res, safeUser);

    return res.json({
        user: safeUser
    });
});

module.exports = router;
