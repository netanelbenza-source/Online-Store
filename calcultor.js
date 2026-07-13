import { readDataFromJson, writeDataToJson } from "./Data_Manager.js";
import {
  Checks_if_a_value_exists,
  searchQuery,
  check_body,
  Returns_an_up_to_date_dictionary,
  checkBalanceRequestParams,
  IsTheCartEmpty,
  InventoryCheck,
  check_balance,
  return_customer,
  Create_order,
  Updating_the_balance_sheet
 } from "./utils.js";

export async function menjer_rouer_products(req, res) {
  try {
    const obj_of_products = await readDataFromJson("./data/product.json");
    const There_is_query = Checks_if_a_value_exists(req.query);
    if (There_is_query) {
      res.json(obj_of_products, null, 8);
      return;
    }
    const is_match = searchQuery(obj_of_products, req.query);
    if (Object.keys(is_match).length > 0) {
      res.json({ Search_results: is_match });
      return;
    }
    res.status(404).json({ message: "No results found." });
    return;
  } catch (err) {
    res.status(500).json({ message: "Server upload problem" });
    return;
  }
}

export async function menjer_rouer_cart(req, res) {
  try {
    if (!req.query || !Object.keys(req.query) === "customerId") {
      res.status(400).json({ massage: "Bed request" });
      return;
    }
    const obj_of_orders = await readDataFromJson("./data/Clients.json");
    const Shopping_Cart_System = obj_of_orders.find(
      (obj) => obj.customerId === req.query.customerId,
    );
    if (Shopping_Cart_System) {
      res.json(Shopping_Cart_System);
      return;
    }
    res.status(404).json({ message: "No results found." });
    return;
  } catch (err) {
    res.status(500).json({ message: "Server upload problem" });
    return;
  }
}

export async function manger_add_item(req, res) {
  try {
    const is_match = check_body(req.body);
    if (!is_match) {
      res.status(400).json({ massage: "Bed request" });
      return;
    }
    const obj_of_Cliants = await readDataFromJson("./data/Cljjients.json");
    const get_update = Returns_an_up_to_date_dictionary(
      obj_of_Cliants,
      req.body,
    );
    await writeDataToJson("./data/Cltents.json", get_update);
    res.json({ message: "The item has been successfully added to the cart." });
  } catch (err) {
    res.status(500).json({ message: "Server upload problem" });
    return;
  }
}

export async function menjerDeleteItem(req, res) {
  try {
    if (
      !req.body ||
      Object.keys(req.params).length === 0 ||
      !Object.keys(req.body).includes("customerId")
    ) {
      res.status(400).json({ massage: "Bed request" });
      return;
    }
    const obj_of_Cliants = await readDataFromJson("./data/Clients.json");
    obj_of_Cliants.forEach((client) => {
      if (client.customerId === req.body.customerId) {
        client.cart = client.cart.filter(
          (product) => product.productId !== +req.params.productId,
        );
      }
    });
    await writeDataToJson("./data/Clients.json", obj_of_Cliants);
    res.json({ message: "The product was successfully removed." });
    return;
  } catch (err) {
    res.status(500).json({ message: "Server upload problem" });
    return;
  }
}

export async function menjer_show_balance(req, res) {
  try {
    const is_proper = checkBalanceRequestParams(req.query);
    if (!is_proper) {
      res.status(400).json({ massage: "Bed request" });
    }
    const obj_of_Cliants = await readDataFromJson("./data/Clients.json");
    const get_cliant = obj_of_Cliants.find(
      (obj) => obj.customerId === req.query.customerId,
    );
    if (get_cliant) {
      res.json({ "Courent Balance": get_cliant.balance });
      return;
    }
    res.status(404).json({ message: "No results found." })
    return;
  } catch (err) {
    res.status(500).json({ message: "Server upload problem" });
  }
}



export async function menjerCheckOut(req, res) {
    if(!req.body || !Object.keys(req.body).includes('customerId')){
        res.status(400).json({ message: "bed request." })
        return;
    }
     
    const obj_of_products = await readDataFromJson('./data/product.json')
    const obj_of_clients = await readDataFromJson('./data/Clients.json')
    const{customerId}=req.body
    const client = return_customer(customerId,obj_of_clients)
    if(!client){
    res.status(404).json({ message: "No results found." })
    return;
    } 
    
    if(!IsTheCartEmpty(client)){
    res.status(400).json({ message: "The shopping cart is empty." })
    return;}
    
    if(InventoryCheck(client,obj_of_products).length === 0){
      res.status(400).json({ message: "Out of stock" })
      return;  
    }
    
    if(!check_balance(client,obj_of_products)){
        res.status(400).json({ message: "There isn't enough money in the account." })
        return;  
    }
     
    const List_of_products_in_stock = InventoryCheck(client,obj_of_products)
    const obj_of_orders = await readDataFromJson('./data/Orders.json')
    const create_order  = Create_order(customerId,obj_of_products,obj_of_orders,List_of_products_in_stock)
    obj_of_orders.push(create_order)
    await writeDataToJson('./data/Orders.json',obj_of_orders)
    const Total_amount_to_be_deducted = create_order.total_order 
    const cliant_to_update = Updating_the_balance_sheet(Total_amount_to_be_deducted,obj_of_clients,customerId)
    await writeDataToJson('./data/Clients.json',cliant_to_update)
    res.json({message:'The product was purchased successfully.'})
    


    
}   



export async function get_Order_History(req,res){
      const query_not_exists = Checks_if_a_value_exists(req.query) 
      if(query_not_exists || ! Object.keys(req.query).includes('id_customer')){
        res.status(400).json({message:'bed_request'})
        return
      }
      const orders = await readDataFromJson('./data/Orders.json')
      const {id_customer}= req.query
      const customer_order = orders.filter(order => order.customer === + id_customer)
      console.log(customer_order)
      if(customer_order.length === 0){
        res.status(404).json({message: "No results found."})
        return
      }
      res.json({Order_History:customer_order})
      return
}  


