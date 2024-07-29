const express = require('express');

const {Ticket} = require('../../db/models/');

const {requireAuth} = require('../../utils/auth');

const router = express.Router();

//Get All Tickets
router.get('/', requireAuth, async(req, res, next) => {
    try {
        // console.log("BEFORE QUERYING");
        const tickets = await Ticket.findAll();

        res.json(tickets)

    } catch (error) {
        next(error);
    }
})

module.exports = router;