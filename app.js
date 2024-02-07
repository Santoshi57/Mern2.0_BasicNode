const express = require('express')
const app = express()

//alternative
//const app = require('express')()


app.listen(3000,()=>{
    console.log("Nodejs server has started at port 3000.")
})