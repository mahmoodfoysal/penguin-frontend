import axios from "axios";

export const getProducts = async () => {
  const url = `http://localhost:5000/api/penguin/get-product-list`;
  return await axios.get(url);
};

export const getProductDetails = async (id) => {
  const url = `http://localhost:5000/api/penguin/get-product-list/${id}`;
  return await axios.get(url);
};
