const express = require('express')
const connectToDatabase = require('./database')
const Book = require('./model/bookModel')
const app = express()

//multerconfig imports
const {multer,storage} = require("./middleware/multerConfig")
const upload = multer({storage: storage})

//alternative
//const app = require('express')()

//cors package
const cors = require('cors')

app.use(cors({
  origin: ['http://localhost:5173']
}))

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
  console.log(req.file)
 let fileName;
  if (!req.file){
    fileName ="https://imgs.search.brave.com/L2pbvx7wW_p95WH9cON-Azi3bOyvL-0E4bzabGMf7gs/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG40/LnZlY3RvcnN0b2Nr/LmNvbS9pLzEwMDB4/MTAwMC80Ny8zOC9h/bm9ueW1vdXMtcGVy/c29uLWVwcy1pY29u/LXZlY3Rvci0yMTM4/NDczOC5qcGc "
  }else{
    fileName = "http://localhost:3000/" + req.file.fileName
  }

    const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publicationName} = req.body
     await Book.create({
        bookName,
        bookPrice,
        isbnNumber,
        authorName,
        publishedAt, 
        publicationName,
        imageUrl: fileName
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
app.patch("/book/:id",upload.single("image"),async(req,res)=>{
  const id =req.params.id//kun book update garney tesako id
  const{bookName,authorName,bookPrice,publishedAt,isbnNumber,publication} = req.body
  const oldDatas = await Book.findById(id)
  if(req.file){

    const oldImagePath = oldDatas.imageUrl
    console.log(oldImagePath)
    const localHostUrlLength ="http://localhost:3000/".length
    const newOldImagePath = oldImagePath.slice
    (localHostUrlLength)
    console.log(newOldImagePath)
  }

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

app.use(express.static("./storage/"))

app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000.")
})