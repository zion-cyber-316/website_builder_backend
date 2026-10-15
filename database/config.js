const mongoose = require('mongoose');



const connectedDB = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_ATLAS_URL}`);
        console.log("connecting database successfully")

    }catch(error){
        console.log("connecteing database Error ",error)
    }
}


module.exports = connectedDB