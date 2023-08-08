const Card = require("../model/cardModel")
const List = require("../model/listModel")

exports.createCardAndAddToList = async (req, res) => {
    const listId = req.params.listId;
    const { name, description, assigned_user } = req.body;
    try {
        const list = await List.findById(listId);

        if (!list) {
            return res.status(404).send({ status: false, message: 'List not found' });
        }

        const newCard = new Card({
            name,
            description,
            assigned_user,
        });

        await newCard.save();

        list.cards.push(newCard._id);
        await list.save();

        return res.send(newCard);
    } catch (error) {
        console.error('Error creating card and adding it to list:', error);
        return res.status(500).send({ status: false, message: 'Internal server error' });
    }
};

exports.getAllCardsInList = async (req, res) => {
    const listId = req.params.listId;
    try {

        const list = await List.findById(listId);

        if (!list) {
            return res.status(404).send({ status: false, message: 'List not found' });
        }

        const activeCardsInList = list.cards.filter((card) => !card.isDeleted);

        return res.send(activeCardsInList);
    } catch (error) {
        console.error('Error getting cards in list:', error);
        return res.status(500).send({ status: false, message: 'Internal server error' });
    }
};

exports.getCardById = async (req, res) => {
    const cardId = req.params.cardId;

    try {
        const card = await Card.findOne({ _id: cardId, isDeleted: false });

        if (!card) {
            return res.status(404).send({ status: false, message: 'Card not found' });
        }

        return res.send(card);
    } catch (error) {
        console.error('Error getting card by ID:', error);
        return res.status(500).send({ status: false, message: 'Internal server error' });
    }
};

exports.updateCardById = async (req, res) => {
    const cardId = req.params.cardId;
    const { name, description, assigned_user } = req.body;
    try {
        const card = await Card.findById(cardId);

        if (!card) {
            return res.status(404).send({ status: false, message: 'Card not found' });
        }
        if (name) {
            card.name = name;
        }
        if (description) {
            card.description = description;
        }
        if (assigned_user) {
            card.assigned_user = assigned_user;
        }

        await card.save();

        return res.send(card);
    } catch (error) {
        console.error('Error updating card:', error);
        return res.status(500).send({ status: false, message: 'Internal server error' });
    }
};

exports.deleteCardById = async (req, res) => {
    const cardId = req.params.cardId;

    try {
        const card = await Card.findById(cardId);

        if (!card) {
            return res.status(404).send({ status: false, message: 'Card not found' });
        }

        card.isDeleted = true;
        await card.save();

        return res.send({ status: true, message: 'Card deleted successfully' });
    } catch (error) {
        console.error('Error deleting card:', error);
        return res.status(500).send({ status: false, message: 'Internal server error' });
    }
};
