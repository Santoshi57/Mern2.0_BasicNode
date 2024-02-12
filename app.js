const express = require('express')
const app = express()
const mangoose = require('mongoose')


const ConnectionString="mongodb+srv://santoshi:santoshi@cluster0.s5ezukk.mongodb.net/?retryWrites=true&w=majority"

//alternative
//const app = require('express')()

 async function connectToDatabase(){
   await mangoose.connect(ConnectionString)
   console.log("Connectes to DB successfully")
  }
  connectToDatabase()


app.get("/",(req,res)=>{
 //   res.json({
   //     "name":"Santoshi Chaulagain",
      //  "age": 23

      res.status(200).json({
        "message": "success"
      })



    }
   

    )
 







app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000.")
})