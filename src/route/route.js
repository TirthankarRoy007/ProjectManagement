const express = require("express")
const router = express.Router()
const userController = require("../controller/userController")
const boardController = require("../controller/boardController")
const listController = require("../controller/listController")
const cardController = require("../controller/cardController")

//ROUTER FOR USER CONTROLLER
router.post("/createUser", userController.createUser)
router.get("/getAllUser", userController.getAllUsers)
router.get("/getUser/:userId", userController.getUserById)

//ROUTER FOR BOARD CONTROLLER
router.post("/createBoard", boardController.createBoard)
router.get("/getAllBoards", boardController.getAllBoards)
router.get("/getBoard/:boardId", boardController.getBoardById)
router.delete("/deleteBoard/:boardId", boardController.deleteBoardById)
router.post("/addMember/:boardId", boardController.addMemberToBoard)
router.delete("/removeMember/:boardId", boardController.removeMemberFromBoard)

//ROUTER FOR LIST CONTROLLER
router.post("/createList/:boardId", listController.createListAndAddToBoard)
router.get("/getList/:boardId", listController.getAllListsOnBoard)
router.get("/getListById/:listId", listController.getListById)
router.delete("/deleteList/:listId", listController.deleteListById)

//ROUTER FOR CARD CONTROLLER
router.post("/createCard/:listId", cardController.createCardAndAddToList)
router.get("/getAllCards/:listId", cardController.getAllCardsInList)
router.get("/getCardById/:cardId", cardController.getCardById)
router.put("/updateCard/:cardId", cardController.updateCardById)
router.delete("/deleteCard/:cardId", cardController.deleteCardById)

router.all("/*", (req, res) => {
    return res.status(400).send({ message: "invalid path" })
})

module.exports = router;