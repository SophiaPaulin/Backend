const mongoose = require('mongoose');


const configureDb = async () =>{
    const URI = process.env.MONGO_DB_CLUSTER 
    try {
        await mongoose.connect(URI);
        console.log("Mongo Db connectivity success");
    } catch (error) {
        console.log(error)
    }
}

module.exports ={ configureDb }