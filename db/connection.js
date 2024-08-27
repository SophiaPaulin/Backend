const mongoose = require('mongoose');


const configureDb = async () =>{
    const URI = "mongodb+srv://sobiyamary622:aqnqaJ7Ab048iK9y@cluster0.lu92g.mongodb.net/testing";
    
    try {
        await mongoose.connect(URI);
        console.log("Mongo Db connectivity success");
    } catch (error) {
        console.log(error)
    }
}

module.exports ={ configureDb }