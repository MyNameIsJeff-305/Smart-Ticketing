const express = require('express');

const { Ticket, Part, TicketPart, Customer, Location } = require('../../db/models/');

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
            parts.push(JSON.stringify(thisPart));
        }

        const customer = await Customer.findByPk(ticket.customerId);

        console.log(ticket.locationId);

        const location = await Location.findOne({
            where: {
                id: ticket.locationId,
                customerId: ticket.customerId
            }
        });

        // const safeTicket = {
        //     id: ticket.id,
        //     workOrderDate: ticket.workOrderDate,
        //     customer: 
        // }

        console.log("THIS IS Location", location);

            res.json(ticket);

    } catch (error) {
        next(error)
    }
})

module.exports = router;