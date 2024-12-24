import axios from "axios";

export const getParentCategory = async () => {
  const url = 'http://localhost:5000/parent-category';
  return await axios.get(url);
};

export const postParentCategory = async (data) => {
  const url = 'http://localhost:5000/parent-category';
  return await axios.post(url, data)
};
