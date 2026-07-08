import {readDataToJson } from "./Data_Manager.js";
import { Checks_if_a_value_exists ,searchQuery} from "./utils.js";


export async function menjer_rouer_products(req,res){
    try{
    const obj_of_products = await readDataToJson('./data/product.json')
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




