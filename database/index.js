const mangoose = require('mongoose')
const ConnectionString="mongodb+srv://santoshi:UJIby1myeVYXFpRX@cluster0.s5ezukk.mongodb.net/?retryWrites=true&w=majority"

async function connectToDatabase(){
    await mangoose.connect(ConnectionString)
    console.log("Connectes to DB successfully")
   }
   module.exports = connectToDatabase