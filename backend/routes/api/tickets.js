const express = require('express');

const { Ticket, Part, TicketPart, Customer, Location, User } = require('../../db/models/');

const { requireAuth } = require('../../utils/auth');

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
router.post('/', async (req, res, next) => {
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
})

module.exports = router;