import express from 'express'

const PORT = process.env.PORT 



const server = express()


server.get('/',(req,res) =>{
    res.json({message: 'The server running now'})
})


server.get('/health',(req,res)=>{
    res.json({massage:'The server started successfully'})
})
















server.listen(PORT,() =>{
    console.log(' I listen on port ', PORT)
})