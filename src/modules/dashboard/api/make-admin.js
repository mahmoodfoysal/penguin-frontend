import axios from "axios";

// post admin
export const postAdmin = async (data) => {
  const url = `http://localhost:5000/admin`;
  return await axios.post(url, data);
};

// get admin
export const getAdmin = async () => {
  const url = `http://localhost:5000/admin`;
  return await axios.get(url);
};
