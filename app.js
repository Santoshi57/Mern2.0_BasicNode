const express = require('express')
const connectToDatabase = require('./database')
const app = express()

//alternative
//const app = require('express')()
const ConnectionString="mongodb+srv://santoshi:UJIby1myeVYXFpRX@cluster0.s5ezukk.mongodb.net/?retryWrites=true&w=majority"

connectToDatabase()


app.get("/",(req,res)=>{
 //   res.json({
   //     "name":"Santoshi Chaulagain",
      //  "age": 23

      res.status(200).json({
        "message": "success"
      })
    } )
 

app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000.")
})