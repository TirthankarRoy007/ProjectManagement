const List = require("../model/listModel")
const Board = require("../model/boardModel")

exports.createListAndAddToBoard = async (req, res) => {
    const boardId = req.params.boardId;
    const { task } = req.body;

    try {
        const board = await Board.findById(boardId);

        if (!board) {
            return res.status(404).send({ status: false, message: 'Board not found' });
        }

        const newList = new List({
            task,
            cards: [],
        });

        await newList.save();

        board.lists.push(newList.task);
        await board.save();

        return res.send(newList);
    } catch (error) {
        console.error('Error creating list and adding it to board:', error);
        return res.status(500).send({ status: false, message: 'Internal server error' });
    }
};

exports.getAllListsOnBoard = async (req, res) => {
    const boardId = req.params.boardId;

    try {

        const board = await Board.findById(boardId);

        if (!board) {
            return res.status(404).send({ status: false, message: 'Board not found' });
        }

        const listsOnBoard = board.lists.filter(list => !list.isDeleted);

        return res.send(listsOnBoard);
    } catch (error) {
        console.error('Error getting lists on board:', error);
        return res.status(500).send({ status: false, message: 'Internal server error' });
    }
};

exports.getListById = async (req, res) => {
    const listId = req.params.listId;

    try {
        // Find the list by ID in the database
        const list = await List.findById(listId);

        if (!list || list.isDeleted) {
            return res.status(404).send({ status: false, message: 'List not found' });
        }

        return res.json(list);
    } catch (error) {
        console.error('Error getting list by ID:', error);
        return res.status(500).send({ status: false, message: 'Internal server error' });
    }
};

exports.deleteListById = async (req, res) => {
    const listId = req.params.listId;

    try {
        const list = await List.findById(listId);

        if (!list || list.isDeleted) {
            return res.status(404).send({ status: false, message: 'List not found' });
        }

        list.isDeleted = true;
        await list.save();

        return res.send({ status: false, message: 'List deleted successfully' });
    } catch (error) {
        console.error('Error deleting list:', error);
        return res.status(500).send({ status: false, message: 'Internal server error' });
    }
}