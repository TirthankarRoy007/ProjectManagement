const Board = require("../model/boardModel");
const mongoose = require("mongoose")

exports.createBoard = async (req, res) => {
  const { name, members } = req.body;

  if (!name || !members || !Array.isArray(members)) {
    return res.status(400).send({ status: false, message: 'Invalid request data' });
  }

  try {
    const newBoard = new Board({
      name,
      members,
      lists: []
    });

    const savedBoard = await newBoard.save();

    return res.status(201).send(savedBoard);
  } catch (error) {
    console.error('Error creating board:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};

exports.getAllBoards = async (req, res) => {
  try {
    const boards = await Board.find();

    if (!boards || boards.length === 0) {
      return res.send([]);
    }

    return res.send(boards);
  } catch (error) {
    console.error('Error fetching all boards:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};

exports.getBoardById = async (req, res) => {
  const boardId = req.params.boardId;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).send({ status: false, message: 'Board not found' });
    }

    return res.send(board);
  } catch (error) {
    console.error('Error fetching board by ID:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};

exports.deleteBoardById = async (req, res) => {
  const boardId = req.params.boardId;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).send({ status: false, message: 'Board not found' });
    }

    board.isDeleted = true;
    await board.save();

    return res.send({ status: false, message: 'Board deleted successfully' });
  } catch (error) {
    console.error('Error deleting board:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};

exports.addMemberToBoard = async (req, res) => {
  const boardId = req.params.boardId;
  const { userId } = req.body;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).send({ status: false, message: 'Board not found' });
    }

    if (board.members.includes(userId)) {
      return res.status(400).send({ status: false, message: 'User is already a member of the board' });
    }

    board.members.push(userId);

    await board.save();

    return res.send(board);
  } catch (error) {
    console.error('Error adding member to board:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};

exports.removeMemberFromBoard = async (req, res) => {
  const boardId = req.params.boardId;
  const memberIdToRemove = req.body.userId;

  try {
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).send({ status: false, message: 'Board not found' });
    }

    if (!board.members.includes(memberIdToRemove)) {
      return res.status(400).send({ status: false, message: 'User is not a member of the board' });
    }

    board.members = board.members.filter((member) => member !== memberIdToRemove);

    await board.save();

    return res.send(board);
  } catch (error) {
    console.error('Error removing member from board:', error);
    return res.status(500).send({ status: false, message: 'Internal server error' });
  }
};