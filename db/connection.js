const mongoose = require('mongoose');

const configureDb = async () =>{
    const URI = "mongodb://localhost:27017/testings";
    
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("Mongo Db connectivity success");
    } catch (error) {
        console.log(error)
    }
}

module.exports ={ configureDb }