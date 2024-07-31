const express = require('express');

const { Part, PartImage, Ticket, TicketPart } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validatePartImage, validatePart } = require('../../utils/validations');
const { where } = require('sequelize');

const router = express.Router();

//Routes
//Get All Parts
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const parts = await Part.findAll();

        if (!parts) {
            return res.status(404).json({ message: "No parts at this time" })
        }

        const Parts = [];

        const PartImages = await PartImage.findAll();

        res.json(Parts)

    } catch (error) {
        next(error);
    }
});

//Get Part Details based on Part ID
router.get('/:partId', requireAuth, async (req, res, next) => {
    try {
        const part = await Part.findByPk(parseInt(req.params.partId));

        if (!part) {
            return res.status(404).json({ message: "Part not found" })
        }

        const ticketPart = await TicketPart.findAll({
            where: {
                partId: parseInt(req.params.partId)
            }
        });


        const ticket = await Ticket.findByPk(ticketPart[0].ticketId);

        const partImages = await PartImage.findAll({
            where: {
                partId: parseInt(req.params.partId)
            }
        });

        const detailedPart = {
            id: part.id,
            name: part.name,
            sku: part.sku,
            description: part.description,
            unitPrice: part.unitPrice,
            quantity: part.quantity,
            ticket: ticket,
            partImage: partImages
        };

        res.json(detailedPart)

    } catch (error) {
        next(error);
    }
});

//Add a PartImage to a Part based on Part ID
router.post('/:partId', requireAuth, validatePartImage, async (req, res, next) => {
    try {
        const { url, partId } = req.body;

        const newPartImage = await PartImage.create({
            url: url,
            partId: parseInt(partId)
        });

        if (!newPartImage) {
            return res.status(404).json({ message: "Part Image not created" })
        }

        res.json(newPartImage);

    } catch (error) {
        next(error);
    }
})

//Create a New Part
router.post('/', requireAuth, validatePart, async (req, res, next) => {
    try {
        const { name, sku, description, unitPrice, quantity, ticketId } = req.body;

        const newPart = await Part.create({
            name: name,
            sku: sku,
            description: description,
            unitPrice: unitPrice,
            quantity: quantity,
        });

        if (!newPart) {
            return res.status(404).json({ message: "Part not Created" });
        }

        await TicketPart.create({
            ticketId: parseInt(ticketId),
            partId: newPart.id
        });

        res.json(newPart);

    } catch (error) {
        next(error)
    }
})

//Edit a Part based on Part ID
router.put('/:partId', requireAuth, validatePart, async (req, res, next) => {
    try {
        const { name, sku, description, unitPrice, quantity } = req.body;

        const part = await Part.findByPk(parseInt(req.params.partId));

        if (!part) {
            return res.status(404).json({ message: "Part not found" });
        }

        part.name = name;
        part.sku = sku;
        part.description = description;
        part.unitPrice = unitPrice;
        part.quantity = quantity;

        await part.save();

        res.json(part);
    } catch (error) {
        next(error)
    }
})

//Delete a Part based on Part ID
router.delete('/:partId', requireAuth, async (req, res, next) => {
    try {
        const part = await Part.findByPk(parseInt(req.params.partId));

        if (!part) {
            return res.status(404).json({ message: "Part not found" });
        }

        await part.destroy();

        res.json({ message: "Part Deleted" });

    } catch (error) {
        next(error)
    }
})


module.exports = router;