export function Checks_if_a_value_exists(query) {
  if (Object.keys(query).length === 0) {
    return true;
  }
  return false;
}

export function searchQuery(data, query) {
  const Match = data.filter((obj) => {
    if (query.inStock && obj.stock <= 0) {
      return false;
    }
    if (query.maxPrice && obj.price > query.maxPrice) {
      return false;
    }
    if (query.search) {
      const your_search = query.search.toLowerCase();
      const is_match = obj.name.toLowerCase().includes(your_search);
      if (!is_match) {
        return false;
      }
    }
    return true;
  });
  return Match;
}

export function check_body(body) {
  const Original_list = ["customerId", "productId", "quantity"];
  const Match = Original_list.every((string) =>
    Object.keys(body).includes(string),
  );
  if (!Match || Object.keys(body).length < 3 || +body.quantity < 1) {
    return false;
  }
  return true;
}

export function Returns_an_up_to_date_dictionary(Clients, new_obj) {
  const { customerId, productId, quantity } = new_obj;
  const update_clients = Clients.map((obj) => {
    if (obj.customerId === customerId) {
      obj.cart.push({ productId, quantity });
      return obj;
    }
    return obj;
  });
  return update_clients;
}

export function checkBalanceRequestParams(req) {
  if (
    !req ||
    !Object.keys(req).includes("customerId") ||
    Object.keys(req).length > 1
  ) {
    return false;
  }
  return true;
}

export function IsTheCartEmpty(Client) {
  if (Client.cart.length === 0) {
    return false;
  }
  return true;
}

export function InventoryCheck(client, products) {
  const inventory = client.cart.filter((prod) => {
    const filter = products.filter(
      (product) =>
        product.id === prod.productId && product.stock >= prod.quantity,
    );
    return filter.length > 0;
  });

  return inventory;
}

export function check_balance(client, products) {
  const sum_all = client.cart.reduce((acc, cur) => {
    const product = products.find((p) => p.id === +cur.productId);
    return acc + (product.price * cur.quantity);
  },0);
  return sum_all < client.balance;
}

export function return_customer(customerId, obj_of_clients) {
  const Match = obj_of_clients.find((obj) => obj.customerId == customerId);
  return Match;
}

export function Create_order(
  customerId,
  obj_of_products,
  obj_of_orders,
  list_product,
) {
  const allIds = obj_of_orders.map((order) => order.id);
  const id = allIds.length > 0 ? Math.max(...allIds) + 1 : 1;
  const customer = customerId;
  const items = list_product.map((cartItem) => {
    const storeProduct = obj_of_products.find(
      (p) => p.id === cartItem.productId,
    );
    return {
      productId: cartItem.productId,
      name: storeProduct.name,
      quantity: cartItem.quantity,
      price: storeProduct.price,
    };
  });
  const total_order = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const date = new Date().toISOString();
  return {
    id,
    customer,
    items,
    total_order,
    date,
  };
}


export function Updating_the_balance_sheet(sum_all,all_clients,id_cliant){
   all_clients.forEach(client => {
    if (client.customerId == id_cliant){
      client.balance -= sum_all
      console.log(client.balance)
    }
   })
   console.log(all_clients)
   return all_clients
}




