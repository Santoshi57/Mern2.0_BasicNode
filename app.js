const express = require('express')
const connectToDatabase = require('./database')
const Book = require('./model/bookModel')
const app = express()

//multerconfig imports
const {multer,storage} = require("./middleware/multerConfig")
const upload = multer({storage: storage})



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

    //create book
 app.post("/book",upload.single("image"), async(req, res)=>{

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
app.get("/book",async(req,res)=>{
  const books = await Book.find()//return array ma garxa
  console.log(books)
  res.status(200).json({
    message: "Books fetched successfully",
    data : books
  })
})
//single read
app.get("/book/:id",async(req,res)=>{
 // console.log(req.params.id)
//try{
 const id = req.params.id
  const book = await Book.findById(id)//return object garxa
//Book.find({id :id})//another way to find the id
  //if(!book){
//res.status(404).json({
//message:"Nothing found"
//})
//}else{
//res.status(200).json({
//message:"Single Book Fetched",
//data:book
  //})
//}
//}catch (error){
  //res.status(500).json({
    //message: "Something went wrong"
  //})
//}
//})


  res.status(200).json({
    message: "Single Book Fetched Successfully",
    data: book
  })
})

//delete operation
app.get("/deletebook/:id",async(req,res)=>{
  const id =req.params.id
  await Book.findByIdAndDelete(id)
  res.status(200).json({
    message:"Book Deleted Successfully"
  })
})
// update operation
app.patch("/book/:id",async(req,res)=>{
  const id =req.params.id//kun book update garney tesako id
  const{bookName,authorName,bookPrice,publishedAt,isbnNumber,publication} = req.body
  await Book.findByIdAndUpdate(id,{
    bookName : bookName,
    bookPrice : bookPrice,
    authorName: authorName,
    publication: publication,
    publishedAt : publishedAt,
    isbnNumber: isbnNumber
  })
  res.status(200).json({
    message : "Book Updated successfully"
  })
})



app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000.")
})