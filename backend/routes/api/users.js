const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { validateSignup } = require('../../utils/validations');

const router = express.Router();

//Routes___________________________________
//Signup
router.post('/', validateSignup, async (req, res) => {
    try {
        const userEmail = await User.findAll({
            where: {
                email: req.body.email
            }
        });

        for (const user of userEmail) {
            if (user.email === req.body.email)
                return res.status(500).json({
                    message: "User already exists",
                    errors: {
                        email: "User with that email already exists"
                    }
                });
        }

        const userUsername = await User.findAll({
            where: {
                username: req.body.username
            }
        });
        for (const user of userUsername) {
            if (user.username === req.body.username)
                return res.status(500).json({
                    message: "User already exists",
                    errors: {
                        username: "User with that username already exists"
                    }
                })
        }

        const { email, password, username, firstName, lastName } = req.body;
        const hashedPassword = bcrypt.hashSync(password);

        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            hashedPassword: hashedPassword
        });

        const safeUser = {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            username: newUser.username
        };

        await setTokenCookie(res, safeUser);

        return res.json({
            user: safeUser
        });
    } catch (error) {
        next(error)
    }
});

module.exports = router;
