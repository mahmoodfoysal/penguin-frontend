import axios from "axios";

export const getCategories = async () => {
  const url = `http://localhost:5000/api/client/get-all-categories`;
  return await axios.get(url);
};
