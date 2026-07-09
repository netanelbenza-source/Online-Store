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

export function check_budy(body) {
  const Original_list = ["customerId", "productId", "quantity"];
  const Match = Original_list.every((string) =>
    Object.keys(body).includes(string),
  );
  if (!Match || Object.keys(body).length < 3 || +body.quantity < 1){
    return false;
  }
  return true;
}


export function Returns_an_up_to_date_dictionary(Clients,new_obj){
    const{customerId,productId,quantity} = new_obj
    const update_clients = Clients.map(obj =>{
        if(obj.customerId === customerId){
            obj.cart.push({productId,quantity})
            return obj
        }
        return obj
    })
    return update_clients
}

