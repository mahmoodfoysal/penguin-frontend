import axios from "axios";

// get admin
export const getAdmin = async () => {
  const url = `http://localhost:5000/api/admin/get-admin-list`;
  return await axios.get(url);
};

// post admin
export const postAdmin = async (data) => {
  const url = `http://localhost:5000/api/admin/insert-update-admin`;
  return await axios.post(url, data);
};
