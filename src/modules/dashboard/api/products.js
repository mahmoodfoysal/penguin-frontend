import axios from 'axios'

// get api
export const getProducts = async () => {
  const url = 'http://localhost:5000/api/penguin/get-product-list'
  return await axios.get(url)
};

// post or update api
export const postProduct = async (data) => {
  const url = 'http://localhost:5000/api/admin/insert-update/product-list'
  return await axios.post(url, data);
};
