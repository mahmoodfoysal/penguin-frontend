import axios from "axios";

export const getAdmin = async (email) => {
  const url = `http://localhost:5000/admin/${email}`;
  return await axios.get(url)
};
