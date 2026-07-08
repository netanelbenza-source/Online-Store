import express from 'express'

const PORT = process.env.PORT 



const server = express()
















server.listen(PORT,() =>{
    console.log(' I listen on port ', PORT)
})