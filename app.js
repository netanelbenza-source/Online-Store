import express from 'express'
import {menjer_rouer_products,menjer_rouer_cart} from './calcultor.js'

const PORT = process.env.PORT 
const Product_Data = process.env.Product_Data
const cart_Data = process.env.cart_Data



const server = express()


server.get('/',(req,res) =>{
    res.json({message: 'The server running now'})
})


server.get('/health',(req,res)=>{
    res.json({massage:'The server started successfully'})
})



server.get(Product_Data,(req,res)=>{
     menjer_rouer_products(req,res)
})


server.get(cart_Data,(req,res)=>{
    menjer_rouer_cart(req,res)
})















server.listen(PORT,() =>{
    console.log(' I listen on port ', PORT)
})