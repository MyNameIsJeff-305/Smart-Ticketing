const express = require('express');

const { Ticket, Part, TicketPart, Customer, Location, User } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const { validateTicket, validatePart } = require('../../utils/validations');

const router = express.Router();

//Get All Tickets
router.get('/', requireAuth, async (_req, res, next) => {
    try {
        // console.log("BEFORE QUERYING");
        const tickets = await Ticket.findAll();

        if (!tickets) {
            return res.status(404).json({ message: "No tickets at this time" })
        }

        res.json(tickets)

    } catch (error) {
        next(error);
    }
});

//Get All Tickets Assigned to the Current User
router.get('/current', requireAuth, async (req, res, next) => {
    try {

        const tickets = await Ticket.findAll({
            where: {
                technician: parseInt(req.user.id)
            }
        });

        if (!tickets) {
            return res.status(404).json({ message: "This user does not have any assigned Tickets" });
        }

        res.json(tickets);

    } catch (error) {
        next(error);
    }
});

//Get Details of a Ticket from an Id
router.get('/:ticketId', requireAuth, async (req, res, next) => {
    try {
        //Get the Ticket
        const ticket = await Ticket.findByPk(parseInt(req.params.ticketId));

        if (!ticket) {
            res.status(404).json({
                message: "Ticket Cannot Be Found"
            })
        }

        //Getting the Parts Related to it
        const partIds = await TicketPart.findAll({
            where: {
                ticketId: ticket.id
            }
        });

        const parts = [];

        for (const part of partIds) {
            const thisPart = await Part.findByPk(part.partId);
            parts.push(thisPart);
        }

        const customer = await Customer.findByPk(ticket.customerId);

        const technician = await User.findByPk(ticket.technician);

        const location = await Location.findByPk(ticket.locationId);

        const safeTicket = {
            id: ticket.id,
            workOrderDate: ticket.workOrderDate,
            customer: {
                firstName: customer.firstName,
                lastName: customer.lastName,
                companyName: customer.companyName,
                type: customer.type
            },
            location: {
                name: location.name,
                address1: location.addressLine1,
                address2: location.addressLine2,
                city: location.city,
                state: location.state,
                zipCode: location.zipCode
            },
            jobDescription: ticket.jobDescription,
            technician: {
                firstName: technician.firstName,
                lastName: technician.lastName,
            },
            name: ticket.name,
            signature: ticket.signature,
            checkIn: ticket.checkIn,
            checkOut: ticket.checkOut,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
            parts: parts
        }

        res.json(safeTicket);

    } catch (error) {
        next(error)
    }
});

//Create a Ticket
router.post('/', requireAuth, validateTicket, async (req, res, next) => {
    try {
        const { workOrderDate, customerId, locationId, jobDescription, technician, checkIn, checkOut, name } = req.body;

        const newTicket = await Ticket.create({
            workOrderDate: workOrderDate,
            customerId: customerId,
            locationId: locationId,
            jobDescription: jobDescription,
            technician: technician,
            checkIn: checkIn,
            checkOut: checkOut,
            name: name
        });

        res.status(201).json(newTicket);

    } catch (error) {
        next(error)
    }
});

//Add a Part to a Ticket
router.post('/:ticketId/parts', requireAuth, validatePart, async (req, res, next) => {
    try {
        const { name, sku, description, unitPrice, quantity } = req.body;

        const newPart = await Part.create({
            name: name,
            sku: sku,
            description: description,
            unitPrice: unitPrice,
            quantity: quantity,
            // ticketId: parseInt(req.params.ticketId)
        });

        if (newPart) {
            await TicketPart.create({
                ticketId: parseInt(req.params.ticketId),
                partId: newPart.id
            });
        }

        res.status(201).json(newPart);

    } catch (error) {
        next(error)
    }
});

//Edit a Ticket
router.put('/:ticketId', requireAuth, validateTicket, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(parseInt(req.params.ticketId));

        if (!ticket) {
            return res.status(404).json({ message: "Ticket Cannot Be Found" });
        }

        const { signature, jobDescription, name, workOrderDate, customerId, locationId, technician, checkIn, checkOut } = req.body;

        ticket.workOrderDate = workOrderDate;
        ticket.customerId = customerId;
        ticket.locationId = locationId;
        ticket.technician = technician;
        ticket.checkIn = checkIn;
        ticket.checkOut = checkOut;
        ticket.jobDescription = jobDescription;
        ticket.name = name;
        ticket.signature = signature

        await ticket.save();

        res.json(ticket);

    } catch (error) {
        next(error)
    }
});

//Delete a Ticket
router.delete('/:ticketId', requireAuth, async (req, res, next) => {
    try {
        const ticket = await Ticket.findByPk(parseInt(req.params.ticketId));

        if (!ticket) {
            return res.status(404).json({ message: "Ticket Cannot Be Found" });
        }

        await ticket.destroy();

        res.json({ message: "Ticket Deleted" });

    } catch (error) {
        next(error)
    }
});

module.exports = router;