const express = require('express');

const { Tag, Ticket, TicketTag } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const { validateTag } = require('../../utils/validations');
const { where } = require('sequelize');

const router = express.Router();

//Get All Tags
router.get('/', requireAuth, async (_req, res, next) => {
    try {
        const tags = await Tag.findAll();

        if (!tags) {
            return res.status(404).json({ message: "No tags at this time" })
        }

        res.json(tags)

    } catch (error) {
        next(error);
    }
});

//Get Details of a Tag from an Id
router.get('/:tagId', requireAuth, async (req, res, next) => {
    try {
        const tag = await Tag.findByPk(parseInt(req.params.tagId));

        if (!tag) {
            return res.status(404).json({ message: "Tag Not Found" });
        }

        const ticketTags = await TicketTag.findAll({
            where: {
                tagId: tag.id
            }
        });

        const tickets = await Ticket.findAll({
            where: {
                id: ticketTags.map(ticketTag => ticketTag.ticketId)
            }
        })

        const detailedTag = {
            name: tag.name,
            description: tag.description,
            color: tag.color,
            tickets: tickets
        }

        res.json(detailedTag);

    } catch (error) {
        next(error);
    }
});

//Create a Tag
router.post('/', requireAuth, validateTag, async (req, res, next) => {
    try {
        const { name, description, color } = req.body;

        const tag = await Tag.create({ name, description, color });

        res.status(201).json(tag);

    } catch (error) {
        next(error);
    }
});

//Edit a Tag
router.put('/:tagId', requireAuth, validateTag, async (req, res, next) => {
    try {
        const tag = await Tag.findByPk(parseInt(req.params.tagId));

        if (!tag) {
            return res.status(404).json({ message: "Tag Not Found" });
        }

        const { name, description, color } = req.body;

        await tag.update({ name });

        res.json(tag);

    } catch (error) {
        next(error);
    }
});

//Delete a Tag
router.delete('/:tagId', requireAuth, async (req, res, next) => {
    try {
        const tag = await Tag.findByPk(parseInt(req.params.tagId));

        if (!tag) {
            return res.status(404).json({ message: "Tag Not Found" });
        }

        await tag.destroy();

        res.json({ message: "Tag Deleted" });

    } catch (error) {
        next(error);
    }
});

module.exports = router;