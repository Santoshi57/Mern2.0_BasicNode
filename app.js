const express = require('express')
const connectToDatabase = require('./database')
const Book = require('./model/bookModel')
const app = express()

//alternative
//const app = require('express')()

app.use(express.json())
//app.use(express.urlencoded({extended :true}))


connectToDatabase()


app.get("/",(req,res)=>{
 //   res.json({
   //     "name":"Santoshi Chaulagain",
      //  "age": 23

      res.status(200).json({
        "message": "success"
      })
    })

 app.post("/book",async(req, res)=>{

    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publicationName} = req.body
     await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt,
        publicationName
      })
 res.json({
  message: "Book created Successfully"
 })
})

app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000.")
})