const mongoose = require('mongoose')

const bmiSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    bmiHistory:[
        {
        height:{type:String || Number,required:true},
        weight:{type:String || Number,required:true},
        bmi:{type:String || Number,required:true},
        date:{type:String,required:true},
    }
    ]
},{
    timestamps:true  
})

const bmiModel = mongoose.model('bmi',bmiSchema);
module.exports = {bmiModel}