import { readDataFromJson, writeDataToJson } from "./Data_Manager.js";
import {
  Checks_if_a_value_exists,
  searchQuery,
  check_budy,
  Returns_an_up_to_date_dictionary,
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
    const is_match = check_budy(req.body);
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
    res.json({ message: "The product was successfully removed." })
    return;
  } catch (err) {
    res.status(500).json({ message: "Server upload problem" });
    return;
  }
}
