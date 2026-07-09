import {readDataFromJson} from "./Data_Manager.js";
import { Checks_if_a_value_exists ,searchQuery} from "./utils.js";


export async function menjer_rouer_products(req,res){
    try{
    const obj_of_products = await readDataFromJson('./data/product.json')
    const There_is_query = Checks_if_a_value_exists(req.query)
    if (There_is_query){
        res.json(obj_of_products,null,8)
        return
    }
    const is_match  = searchQuery(obj_of_products,req.query)
    if(Object.keys(is_match).length > 0){
        res.json({Search_results:is_match})
        return
    }
    res.status(404).json({message:"No results found."})}
    catch(err){
        res.status(500).json({message:"Server upload problem"})
    }
}




export async function menjer_rouer_cart(req,res){
    try{
    if(!req.query || !Object.keys(req.query)=== "customerId"){
        res.status(400).json({massage: 'Bed request'})
        return
    }
    const obj_of_orders = await readDataFromJson('./data/Clients.json')
    const Shopping_Cart_System = obj_of_orders.find(obj => obj.customerId === req.query.customerId)
    if(Shopping_Cart_System){
        res.json(Shopping_Cart_System)
        return
    }
    res.status(404).json({message:"No results found."})}
    catch(err){
        res.status(500).json({message:"Server upload problem"})
    }
}




