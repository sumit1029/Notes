const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/user?directConnection=true&tls=false&readPreference=primary"

const connectToMongo = () =>{
    mongoose.connect(mongoURI)
}

module.exports = connectToMongo;