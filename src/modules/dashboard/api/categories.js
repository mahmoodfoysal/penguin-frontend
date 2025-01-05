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

// get sub category
export const getSubCategory = async () => {
  const url = 'http://localhost:5000/api/admin/get-sub-category'
  return await axios.get(url)
};

// post sub category
export const postSubCategory = async (data) => {
  const url = 'http://localhost:5000/api/admin/insert-update/sub-categoty'
  return await axios.post(url, data)
};

// get all categories
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

// get sub sub category
export const getSubSubCategory = async () => {
  const url = `http://localhost:5000/api/admin/get-sub-sub-category`
  return await axios.get(url);
};

// post or update sub sub category
export const postSubSubCategory = async (data) => {
  const url = 'http://localhost:5000/api/admin/insert-update/sub-sub-categoty';
  return await axios.post(url, data);
};

// update status sub sub cate gory
export const updateSubSubCategoryStatus = async (id, data) => {
  const url = `http://localhost:5000/api/admin/update-sub-sub-category-status/${id}`;
  return await axios.patch(url, data);
};


// all delete api
export const deleteSubSubCategory = async(id) => {
  const url = `http://localhost:5000/api/admin/delete-sub-sub-category/${id}`;
  return await axios.delete(url);
};
