import express from 'express'
import {menjer_rouer_products} from './calcultor.js'

const PORT = process.env.PORT 



const server = express()


server.get('/',(req,res) =>{
    res.json({message: 'The server running now'})
})


server.get('/health',(req,res)=>{
    res.json({massage:'The server started successfully'})
})



server.get('/products',(req,res)=>{
     menjer_rouer_products(req,res)
})












server.listen(PORT,() =>{
    console.log(' I listen on port ', PORT)
})