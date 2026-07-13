import express from "express";
import {
  menjer_rouer_products,
  menjer_rouer_cart,
  manger_add_item,
  menjerDeleteItem,
  menjer_show_balance,
  menjerCheckOut,
  get_Order_History,
} from "./calcultor.js";

const PORT = process.env.PORT;
const Product_Data = process.env.Product_Data;
const cart_Data = process.env.cart_Data;
const add_item = process.env.add_item;
const delete_item = process.env.delete_item;
const show_balance = process.env.show_balance;
const checkout = process.env.checkout;
const Order_History = process.env.Order_History;

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "The server running now" });
});

server.get("/health", (req, res) => {
  res.json({ massage: "The server started successfully" });
});

server.get(Product_Data, (req, res) => {
  menjer_rouer_products(req, res);
});

server.get(cart_Data, (req, res) => {
  menjer_rouer_cart(req, res);
});

server.post(add_item, (req, res) => {
  manger_add_item(req, res);
});

server.delete(delete_item, (req, res) => {
  menjerDeleteItem(req, res);
});

server.get(show_balance, (req, res) => {
  menjer_show_balance(req, res);
});

server.post(checkout, (req, res) => {
  menjerCheckOut(req, res);
});

server.get(Order_History, (req, res) => {
  get_Order_History(req, res);
});


server.listen(PORT, () => {
  console.log(" I listen on port ", PORT);
});
