import axios from "axios";

export const getDashboardMenu = async () => {
  const url = `http://localhost:5000/dashboard-menu`;
  return await axios.get(url);
};
