import axios from 'axios'

// get api
export const getProducts = async () => {
  const url = 'http://localhost:5000/api/penguin/get-product-list'
  return await axios.get(url)
};

// post or update api
export const postProduct = async (data) => {
  const url = 'http://localhost:5000/api/admin/insert-update-product-list'
  return await axios.post(url, data);
};

// delete product
export const deleteProduct = async (id) => {
  const url = `http://localhost:5000/api/admin/delete-product-list/${id}`;
  return await axios.delete(url);
};

// update status
export const updateProductStatus = async (id, data) => {
  const url = `http://localhost:5000/api/admin/update-product-status/${id}`;
  return await axios.patch(url, data);
};
