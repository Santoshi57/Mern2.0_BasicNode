const express = require('express')
const app = express()
const connectToDatabase = required('./database')
//alternative
//const app = require('express')()

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