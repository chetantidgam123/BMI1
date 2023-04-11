const express = require("express");
const { calculateBMI, getUserHistory, clearHistory } = require("../controller/cartitem.controller");
let cartItemRouter = express.Router();

cartItemRouter.post("/user/calculatebmi", calculateBMI)
cartItemRouter.get("/user/getUserHistory", getUserHistory)
cartItemRouter.get("/user/clearhistory", clearHistory)
module.exports = cartItemRouter