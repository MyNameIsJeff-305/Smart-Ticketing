const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, } = require('../../db/models');
const { validateSignup, checkRole } = require('../../utils/validations');

const router = express.Router();

//Routes___________________________________

//Get the Current User
router.get('/me', requireAuth, async (req, res, next) => {
    try {
        const currentUser = await User.findByPk(parseInt(req.user.id));

        res.json({ user: currentUser } || { "user": null });
    } catch (error) {
        next(error);
    }
});


//Signup
router.post('/', validateSignup, async (req, res) => {
    try {
        const userEmail = await User.findAll({
            where: {
                email: req.body.email
            }
        });

        for (const user of userEmail) {
            if (user.email === req.body.email) {
                return res.status(500).json({
                    message: "User already exists",
                    errors: {
                        email: "User with that email already exists"
                    }
                });
            }
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
                });
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

//Change the role of a user
router.put('/:userId', requireAuth, checkRole('Admin'), async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await user.update({ roleId: req.body.roleId });

        res.json({ user: updatedUser });
    } catch (error) {
        
    }
});

//Edit User
router.put('/:userId', requireAuth, checkRole('Admin'), async (req, res, next) => {
    try {
        const user = await User.findByPk(parseInt(req.params.userId));

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { email, username, firstName, lastName } = req.body;

        user.email = email;
        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;

    } catch (error) {
        next(error);
    }
});

module.exports = router;
