const { body } = require('express-validator');

const registrationValidator = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .trim()
        .escape()
        .notEmpty().withMessage('Email is required'),
    body('name')
        .notEmpty().withMessage('Name is required')
        .trim()
        .escape(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .trim()
        .escape()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm).withMessage(`- at least 8 characters\n
        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number \n
        - Can contain special characters`)
];

module.exports = registrationValidator;
