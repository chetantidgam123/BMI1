const { UserModel } = require("../model/auth.model");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { bmiModel } = require("../model/cartitem.model");
const token_secret = process.env.TOKEN_KEY;

const calculateBMI = async (req, res) => {
    const { height, weight, date } = req.body
    try {
        let Bearer = req.headers["authorization"]
        let splittoken = Bearer.split(" ")
        let token = splittoken[1].replace('"', '');
        var decode = jwt.verify(token, token_secret)
        if (decode) {
            let userEmail = decode.email
            let user = await UserModel.findOne({ email: userEmail });
            let b = user._id.toString()
            let a = b.replace('"', "");
            let checkuser = await bmiModel.findOne({ userId: a })
            const bmi = weight / ((height * 0.3048) ** 2)
            if (checkuser) {
                let cart = await bmiModel.findOneAndUpdate(
                    { userId: checkuser.userId },
                    {
                        $push: {
                            bmiHistory: {
                                height: height,
                                weight: weight,
                                bmi: bmi,
                                date: date,
                            }
                        }
                    },
                    { new: true }
                )
                return res.send({
                    code: 200,
                    message: "BMI calculated Successfully",
                    data: { height: height, weight: weight, date: date, bmi: bmi },
                    history: cart
                })

            } else {
                let cart = await bmiModel.create({
                    userId: a,
                    bmiHistory: [
                        {
                            height: height,
                            weight: weight,
                            bmi: bmi,
                            date: date,
                        }
                    ]
                })
                return res.send({
                    code: 200,
                    message: "BMI calculated Successfully",
                    data: { height: height, weight: weight, date: date, bmi: bmi },
                    history: cart
                })

            }
        }
    }
    catch (err) {
        res.send({
            code: 404,
            message: "Invalid Token",
            err
        })
    }
}

const getUserHistory = async (req, res) => {
    try {
        let Bearer = req.headers["authorization"]
        let splittoken = Bearer.split(" ")
        var token = splittoken[1]?.replace('"', '');
        var decode = jwt.verify(token, token_secret)
        if (decode) {
            let userId = decode.userId.toString()
            let userCart = await bmiModel.findOne({ userId: userId });
            let bmiHistory = userCart?.bmiHistory || []
            return res.send({ code: 200, bmiHistory: bmiHistory })
        }
    }
    catch (err) {
        console.log(err);
        return res.send({
            code: 404,
            message: "Invalid Token",
            err
        })
    }
}

const clearHistory = async (req, res) => {
    try {
        let Bearer = req.headers["authorization"]
        let splittoken = Bearer.split(" ")
        let token = splittoken[1].replace('"', '');
        var decode = jwt.verify(token, token_secret)
        if (decode) {
            let userId = decode.userId.toString()
            let data = await bmiModel.findOneAndUpdate(
                { userId: userId },
                { $set: { bmiHistory: [] } },
                { new: true }
            )
            if (data) {
                let userCart = await bmiModel.findOne({ userId: userId });
                let bmiHistory = userCart?.bmiHistory || []
                return res.send({
                    code: 200,
                    bmiHistory: bmiHistory,
                    message: "History Cleared"
                })
            } else {
                return res.send({
                    code: 404,
                    bmiHistory: bmiHistory,
                    message: "No Record Found"
                })
            }
        }

    } catch (error) {
        return res.send({
            code: 404,
            message: "Invalid Token",
            err
        })
    }
}

module.exports = {
    calculateBMI,
    getUserHistory,
    clearHistory
}