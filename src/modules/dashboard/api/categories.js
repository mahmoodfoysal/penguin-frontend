import axios from 'axios'

// parent category
export const getParentCategory = async () => {
  const url = 'http://localhost:5000/api/admin/get-parent-category'
  return await axios.get(url)
}

export const postParentCategory = async (data) => {
  const url = 'http://localhost:5000/api/admin/insert-update-parent-category'
  return await axios.post(url, data)
}

// sub category
export const getSubCategory = async () => {
  const url = 'http://localhost:5000/api/admin/get-sub-category'
  return await axios.get(url)
};

export const postSubCategory = async (data) => {
  const url = 'http://localhost:5000/api/admin/insert-update/sub-categoty'
  return await axios.post(url, data)
};

// get add categories
export const getCategories = async () => {
  const url = 'http://localhost:5000/api/client/get-all-categories';
  return await axios.get(url);
};

// update parent category status
export const updateParentCategoryStatus = async (id ,data) => {
  const url = `http://localhost:5000/api/admin/update-parent-category-status/${id}`;
  return await axios.patch(url, data)
};

// update sub category status
export const updateSubCategoryStatus = async (id, data) => {
  const url = `http://localhost:5000/api/admin/update-sub-category-status/${id}`;
  return await axios.patch(url, data);
};
