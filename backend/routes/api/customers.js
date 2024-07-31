const express = require('express');

const { Customer, Location } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { checkRole } = require('../../utils/validations');

const router = express.Router();

//Routes

//Get All Customers
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const customers = await Customer.findAll();

        if (!customers) {
            return res.status(404).json({ message: "No customers at this time" })
        }

        res.json(customers);
    } catch (error) {
        next(error);
    }
});

//Get Customer Details based on Customer ID
router.get('/:customerId', requireAuth, async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(parseInt(req.params.customerId));

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const locations = await Location.findAll({
            where: {
                customerId: parseInt(req.params.customerId)
            }
        });

        const detailedPart = {
            id: customer.id,
            type: customer.type,
            phoneNumber: customer.phoneNumber,
            email: customer.email,
            locations: locations
        }

        if (customer.type === "Company") {
            detailedPart.companyName = customer.companyName;
        } else {
            detailedPart.firstName = customer.firstName;
            detailedPart.lastName = customer.lastName;
        }

        res.json(detailedPart);

    } catch (error) {
        next(error);
    }
});

//Add a Location to a Customer based on Customer ID
router.post('/:customerId/locations', requireAuth, async (req, res, next) => {
    try {
        const { name, addressLine1, addressLine2, city, state, zipCode } = req.body;

        const newLocation = await Location.create({
            name: name,
            addressLine1: addressLine1,
            addressLine2: addressLine2,
            city: city,
            state: state,
            zipCode: zipCode,
            customerId: parseInt(req.params.customerId)
        });

        res.json(newLocation);

    } catch (error) {
        next(error);
    }
});

//Create a Customer
router.post('/', requireAuth, checkRole("Admin"), async (req, res, next) => {
    try {
        const { type, firstName, lastName, companyName, phoneNumber, email } = req.body;

        const newCustomer = await Customer.create({
            type: type,
            firstName: firstName,
            lastName: lastName,
            companyName: companyName,
            phoneNumber: phoneNumber,
            email: email
        });

        if (!newCustomer) {
            return res.status(404).json({ message: "Customer not created" });
        }

        res.json(newCustomer);

    } catch (error) {
        next(error);
    }
});

//Edit a Customer based on Customer ID
router.put('/:customerId', requireAuth, checkRole("Admin"), async (req, res, next) => {
    try {
        const { type, firstName, lastName, companyName, phoneNumber, email } = req.body;

        const customer = await Customer.findByPk(parseInt(req.params.customerId));

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        customer.type = type;
        customer.firstName = firstName;
        customer.lastName = lastName;
        customer.companyName = companyName;
        customer.phoneNumber = phoneNumber;
        customer.email = email;

        await customer.save();

        res.json(customer);
    } catch (error) {
        next(error);
    }
});

//Delete a Customer based on Customer ID
router.delete('/:customerId', requireAuth, checkRole("Admin"), async (req, res, next) => {
    try {
        const customer = await Customer.findByPk(parseInt(req.params.customerId));

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        await customer.destroy();

        res.json({ message: "Customer Deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;