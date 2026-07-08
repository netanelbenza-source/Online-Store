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