const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { Spot, Review, User, Booking } = require('../db/models');

const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = {};
        validationErrors
            .array()
            .forEach(error => errors[error.path] = error.msg);

        const err = Error('Bad request.');
        err.errors = errors;
        err.status = 400;
        next(err);
    }
    next();
};

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Email or username is required"),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage("Password is required"),
    handleValidationErrors
];

module.exports = {
    validateLogin
}
