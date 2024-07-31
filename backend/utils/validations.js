const { validationResult } = require('express-validator');
const { check } = require('express-validator');
const { Spot, Review, User, Booking, Role } = require('../db/models');

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

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

const validateTicket = [
  check('workOrderDate').exists({ checkFalsy: true }).withMessage('Work Order Date is required'),
  check('workOrderDate').isDate().withMessage('Work Order Date must be a valid date'),
  check('customerId').exists({ checkFalsy: true }).withMessage('Customer ID is required'),
  check('customerId').isInt().withMessage('Customer ID must be an integer'),
  check('locationId').exists({ checkFalsy: true }).withMessage('Location ID is required'),
  check('locationId').isInt().withMessage('Location ID must be an integer'),
  check('technician').exists({ checkFalsy: true }).withMessage('Technician is required'),
  check('technician').isInt().withMessage('Technician must be an integer'),
  check('checkIn').exists({ checkFalsy: true }).withMessage('Check In Date is required'),
  check('checkIn').isDate().withMessage('Check In Date must be a valid date'),
  check('checkOut')
    .exists({ checkFalsy: true })
    .withMessage('Check Out Date is required')
    .custom((value, { req }) => {
      const checkInDate = new Date(req.body.checkIn);
      const checkOutDate = new Date(value);
      if (checkOutDate <= checkInDate) {
        throw new Error('Check Out Date must be after Check In Date');
      }
      return true;
    }),
  handleValidationErrors
];

const validatePart = [
  check('name').exists({ checkFalsy: true }).withMessage('Name is required'),
  check('name').isLength({ max: 50 }).withMessage('Name must be 50 characters or less'),
  check('sku').exists({ checkFalsy: true }).withMessage('SKU is required'),
  check('sku').isLength({ max: 50 }).withMessage('SKU must be 50 characters or less'),
  check('description').isLength({ max: 500 }).withMessage('Description must be 500 characters or less'),
  check('unitPrice').exists({ checkFalsy: true }).withMessage('Unit Price is required'),
  check('unitPrice').isFloat().withMessage('Unit Price must be a number'),
  check('quantity').exists({ checkFalsy: true }).withMessage('Quantity is required'),
  check('quantity').isInt().withMessage('Quantity must be an integer'),
  handleValidationErrors
];

const validatePartImage = [
  check('url').exists({ checkFalsy: true }).withMessage('URL is required'),
  check('url').isURL().withMessage('URL must be a valid URL'),
  handleValidationErrors
];

const checkRole = (roleName) => {
  return async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id, {
        include: [{
          model: Role,
          attributes: ['name'],
        }]
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }

      const hasRole = user.Roles.some(role => role.name === roleName);
      if (!hasRole) {
        res.status(403).json({ message: 'Unauthorized' });
      }

      next();

    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  }
};

const validateTag = [
  check('name').exists({ checkFalsy: true }).withMessage('Name is required'),
  check('name').isLength({ max: 50 }).withMessage('Name must be 50 characters or less'),
  check('description').isLength({ max: 500 }).withMessage('Description must be 500 characters or less'),
  check('color').exists({ checkFalsy: true }).withMessage('Color is required'),
  check('color').isHexColor().withMessage('Color must be a valid hex color'),
  handleValidationErrors
];

module.exports = {
  validateLogin,
  validateSignup,
  validateTicket,
  validatePart,
  validatePartImage,
  validateTag,
  checkRole
}
