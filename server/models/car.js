const mongoose = require("mongoose")

const carSchema = new mongoose.Schema({
    carname: {
        type: String
    },
    numberPlate: {
        type: String
    },
    customerName: {
        type: String
    },
})

module.exports=mongoose.model("car", carSchema)