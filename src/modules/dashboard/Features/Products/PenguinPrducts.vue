<script setup>
import { computed, onMounted, ref } from 'vue';
import { getProducts, postProduct, deleteProduct, updateProductStatus } from '../../api/products.js';
import { getParentCategory, getSubCategory, getSubSubCategory } from '../../api/categories.js';
import { useStore } from '@/store/index';

const isDetailsModal = ref(false);
const isCreateModal = ref(false);
const productList = ref([]);
const productDetails = ref({});
const parentCategoryList = ref([]);
const subCategoryList = ref([]);
const subSubCategoryList = ref([]);
const inputData = ref({});
const isValidation = ref(false);
const searchKey = ref('');
const is_searchable = ref(false);
const store = useStore();

const productTypeList = ref([
  {
    prod_type_name: 'Regular',
    prod_type: 'R'
  },
  {
    prod_type_name: 'Discount',
    prod_type: 'D'
  },
  {
    prod_type_name: 'Offer',
    prod_type: 'O'
  },
  {
    prod_type_name: 'Upcomming',
    prod_type: 'U'
  },
]);

const currencyTypeList = ref([
  {
    currency_id: 301,
    currency_name: "Taka"
  },
  {
    currency_id: 302,
    currency_name: "USD"
  },
  {
    currency_id: 303,
    currency_name: "EURO"
  },
]);

const statusList = ref([
  {
    status: 1,
    status_name: "Active"
  },
  {
    status: 0,
    status_name: "Inactive"
  }
])

onMounted(() => {
  handleGetProducts();
  handleGetParentCategory();
  handleGetSubCategory();
  handleGetSubSubCategory();
});

const handleCreate = () => {
  isCreateModal.value = true;
  inputData.value = {
    status: 1,
    prod_type_info: productTypeList.value?.find((item) => item.prod_type === "R"),
    currency_type_info: currencyTypeList.value?.find((item) => item.currency_id === 302)
  }
};

const handleCancel = () => {
  isCreateModal.value = false;
};

const handleGetProducts = async () => {
  try {
    const result = await getProducts();
    productList.value = result.data?.list_data;
  }
  catch (error) {
    console.log(error);
  }
};

const handleGetParentCategory = async () => {
  try {
    const result = await getParentCategory();
    parentCategoryList.value = result.data?.list_data;
  }
  catch (error) {
    console.log(error);
  }
};

const handleGetSubCategory = async () => {
  try {
    const result = await getSubCategory();
    subCategoryList.value = result.data?.list_data;
  }
  catch (error) {
    console.log(error);
  }
};

const handleGetSubSubCategory = async () => {
  try {
    const result = await getSubSubCategory();
    subSubCategoryList.value = result.data?.list_data;
  }
  catch (error) {
    console.log(error);
  }
};

const handleProductDetails = (item) => {
  const parentCategory = parentCategoryList.value?.find((parItem) => parItem.parent_cat_id == item.parent_cat_id);
  const subCategory = subCategoryList.value?.find((subItem) => subItem.sub_cat_id == item.sub_cat_id);
  const subSubCategory = subSubCategoryList.value?.find((subSubItem) => subSubItem.sub_sub_cat_id == item.sub_sub_cat_id);
  productDetails.value = {
    ...item,
    par_cat_name: parentCategory?.par_cat_name,
    sub_cat_name: subCategory?.sub_cat_name,
    sub_sub_cat_name: subSubCategory?.sub_sub_cat_name,
  };
  isDetailsModal.value = true
};

const handleSubmit = async () => {
  isValidation.value = false;
  if (
    !inputData.value?.par_cat_id ||
    !inputData.value?.sub_cat_id ||
    !inputData.value?.prod_name ||
    !inputData.value?.prod_id ||
    !inputData.value?.price ||
    !inputData.value?.stock ||
    !inputData.value?.prod_type_info ||
    !inputData.value?.currency_type_info ||
    !inputData.value?.status ||
    !inputData.value?.prod_image ||
    !user_email.value
  ) {
    isValidation.value = true;
    alert("Please fill all the required field");
    return;
  }
  const data = {
    _id: inputData.value.id || null,
    par_cat_id: Number(inputData.value?.par_cat_id),
    sub_cat_id: Number(inputData.value?.sub_cat_id),
    sub_sub_cat_id: Number(inputData.value?.sub_sub_cat_id),
    prod_id: Number(inputData.value?.prod_id),
    prod_image: inputData.value?.prod_image,
    prod_name: inputData.value?.prod_name,
    price: Number(inputData.value?.price),
    prod_type: inputData.value?.prod_type_info?.prod_type,
    prod_type_name: inputData.value?.prod_type_info?.prod_type_name,
    stock: Number(inputData.value?.stock),
    prod_brand: inputData.value?.prod_brand,
    currency_id: Number(inputData.value?.currency_type_info?.currency_id),
    currency_name: inputData.value?.currency_type_info?.currency_name,
    rating: null,
    status: Number(inputData.value?.status),
    description: inputData.value?.description,
    user_info: user_email.value
  };

  const text = "Are you want to sure?";
  if (confirm(text) === true) {
    const result = await postProduct(data);
    if (result.data?.id) {
      alert(result.data?.message);
      isValidation.value = false;
      isCreateModal.value = false;
      const obj = {
        _id: inputData.value.id || null,
        par_cat_id: Number(inputData.value?.par_cat_id),
        sub_cat_id: Number(inputData.value?.sub_cat_id),
        sub_sub_cat_id: Number(inputData.value?.sub_sub_cat_id),
        prod_id: Number(inputData.value?.prod_id),
        prod_image: inputData.value?.prod_image,
        prod_name: inputData.value?.prod_name,
        price: Number(inputData.value?.price),
        prod_type: inputData.value?.prod_type_info?.prod_type,
        prod_type_name: inputData.value?.prod_type_info?.prod_type_name,
        stock: Number(inputData.value?.stock),
        prod_brand: inputData.value?.prod_brand,
        currency_id: Number(inputData.value?.currency_type_info?.currency_id),
        currency_name: inputData.value?.currency_type_info?.currency_name,
        rating: null,
        status: Number(inputData.value?.status),
        description: inputData.value?.description
      };
      const index = productList.value?.findIndex((item) => item._id == result.data?.id);
      if (index > - 1) {
        productList.value[index] = obj;
      }
      else {
        productList.value.unshift(obj)
      }
    };

  }
};

// edit product
const handleEdit = (item) => {
  inputData.value = {
    id: item._id,
    ...item,
    currency_type_info: currencyTypeList.value?.find((item) => item.currency_id === item.currency_id),
    prod_type_info: productTypeList.value?.find((item) => item.prod_type === item.prod_type)
  };
  isCreateModal.value = true;
};

// delete product
const handleDeleteProduct = async (id) => {
  const text = "Are youu want to sure?";
  if (confirm(text) === true) {
    const result = await deleteProduct(id);
    if (result.data?.deletedCount == 1) {
      alert(result.data?.message);
      const index = productList.value?.findIndex((item) => item._id === id);
      if (index !== -1) {
        productList.value?.splice(index, 1);
      };
    };
  };
};

// update status
const handleUpdateStatus = async (item) => {
  try {
    const data = { status: Number(item.status) }
    const result = await updateProductStatus(item._id, data);
    alert(result.data?.message);
  }
  catch (error) {
    console.log(error);
  }
};

const search_func = (val) => {
  is_searchable.value = val;
};

const user_email = computed(() => store.userInfo?.email);

const filterSubCategory = computed(() => subCategoryList.value?.filter((item) => item.par_cat_id === inputData.value?.par_cat_id));

const filterSubSubCategory = computed(() => subSubCategoryList.value?.filter((item) => item.sub_cat_id === inputData.value?.sub_cat_id));

const filterProducts = computed(() => {
        return productList.value?.filter((item) =>
            Object.entries(item)
                .reduce(
                    (result, [, value]) =>
                        !(value instanceof Object) ? (result += ` ${value}`) : result,
                    ''
                )
                .toString()
                .toLowerCase()
                .includes(searchKey.value.toString().toLowerCase())
        );
    });

</script>

<template>
  <div class="filter-bar-style d-flex flex-wrap align-items-center justify-content-between">
    <span>Products</span>
    <div class="d-flex align-items-center">
      <button @click="handleCreate" class="d-flex align-items-center">
        Create New <span class="material-icons">add</span>
      </button>
    </div>
  </div>


    <table class="table table-style">
      <thead>
        <tr>
          <th>SL</th>
          <th>Product Name <div class="position-relative ms-2">
              <div class="magic-search" :class="{ active: is_searchable }" @click="search_func(true)">
                <div id="search-icon" class="search-icon">
                  <span class="material-icons">search</span>
                </div>

                <input id="search-input" v-model="searchKey" type="text" class="search-input" placeholder="Search..."
                  @blur="search_func(false)" />
              </div>
            </div>
          </th>
          <th>Prod ID</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filterProducts" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item?.prod_name }}</td>
          <td>{{ item?.prod_id }}</td>
          <td>{{ item?.price }} {{ item?.currency_name }}</td>
          <td>{{ item?.stock }} PC</td>
          <td>{{ item?.prod_type_name }}</td>

          <td>
            <div class="form-check form-switch">
              <input v-model="item.status" :value="item" :true-value="1" :false-value="0" class="form-check-input"
                type="checkbox" role="switch" id="flexSwitchCheckDisabled" @change="handleUpdateStatus(item)" />
            </div>
          </td>
          <td>

            <span @click="handleProductDetails(item)" class="material-icons cursor info-icon">
              info
            </span>
            <span @click="handleEdit(item)" class="material-icons ms-2 cursor edit-icon">
              edit
            </span>
            <span @click="handleDeleteProduct(item._id)" class="material-icons ms-2 cursor delete-icon">
              delete
            </span>


          </td>
        </tr>
      </tbody>
    </table>

  <!-- details modal  -->
  <nav class="navbar bg-light fixed-top">
    <div class="container-fluid">
      <div class="offcanvas offcanvas-end details-modal" tabindex="-1" id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel" :class="{ 'show': isDetailsModal }"
        :style="{ visibility: isDetailsModal ? 'visible' : 'hidden' }">
        <div class="offcanvas-header modal-header-style">
          <div class="d-flex align-items-center gap-3">
            <button type="button" class="btn-close" @click="isDetailsModal = false" aria-label="Close"></button>
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              Product Details
            </h5>
          </div>
        </div>
        <div class="offcanvas-body">
          <!-- code write here  -->
          <div class="row row-cols-1 row-cols-md-12 g-4">
            <div class="col">
              <div class="card product-details-card mb-3">
                <img :src="productDetails.prod_image" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">{{ productDetails?.prod_name }} - {{ productDetails?.prod_id }}</h5>
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <p>Price : <span>{{ productDetails?.price }} {{ productDetails?.currency_name }}</span></p>
                    <p>Stock : <span>{{ productDetails?.stock }} PC</span></p>
                    <p>Product Type : <span>{{ productDetails?.prod_type_name }}</span></p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <p>Parent Category : <span>({{ productDetails?.par_cat_id }}) - {{ productDetails?.par_cat_name
                        }}</span></p>
                    <p>Sub Category : <span>({{ productDetails?.sub_cat_id }}) - {{ productDetails?.sub_cat_name
                        }}</span></p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <p>Sub Sub Category : <span>({{ productDetails?.sub_sub_cat_id }}) - {{
                      productDetails?.sub_sub_cat_name }}</span></p>
                    <p>Brand Name : <span>{{ productDetails?.prod_brand }}</span></p>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-1">
                    <p>Currency : <span>{{ productDetails?.currency_id }} - {{ productDetails?.currency_name }}</span>
                    </p>
                    <p>Status : <span>{{ productDetails?.status == 1 ? 'Active' : 'Inactive' }}</span></p>
                    <p>Rating : <span>{{ productDetails?.rating }}</span></p>
                  </div>

                  <p class="card-text"><small class="text-muted">Description : <span>{{ productDetails?.description
                        }}</span></small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center mb-4 pt-4 modal-footer-style">
          <button @click="isDetailsModal = false" type="submit" class="submit-btn">
            Ok
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- add product modal  -->
  <nav class="navbar bg-light fixed-top">
    <div class="container-fluid">
      <div class="offcanvas offcanvas-end create-modal" tabindex="-1" id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel" :class="{ 'show': isCreateModal }"
        :style="{ visibility: isCreateModal ? 'visible' : 'hidden' }">
        <div class="offcanvas-header modal-header-style">
          <div class="d-flex align-items-center gap-3">
            <button type="button" class="btn-close" @click="handleCancel" aria-label="Close"></button>
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              Create Product
            </h5>
          </div>
        </div>
        <div class="offcanvas-body">
          <!-- code write here  -->
          <div class="row">

            <div class="col-md-6">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Parent Category *</label>
                <select v-model="inputData.par_cat_id" :class="{ 'is-invalid': isValidation && !inputData.par_cat_id }"
                  class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
                  <option v-for="(item, index) in parentCategoryList" :key="index" :value="item.par_cat_id">{{
                    item?.par_cat_id }}
                    - {{
                      item?.par_cat_name }}</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Sub Category *</label>
                <select v-model="inputData.sub_cat_id" :class="{ 'is-invalid': isValidation && !inputData.sub_cat_id }"
                  class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
                  <option v-for="(item, index) in filterSubCategory" :key="index" :value="item.sub_cat_id">{{
                    item?.sub_cat_id }}
                    - {{
                      item?.sub_cat_name }}</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Sub Sub Category</label>
                <select v-model="inputData.sub_sub_cat_id"
                  :class="{ 'is-invalid': isValidation && !inputData.sub_sub_cat_id }"
                  class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
                  <option v-for="(item, index) in filterSubSubCategory" :key="index" :value="item.sub_sub_cat_id">{{
                    item?.sub_sub_cat_id }}
                    - {{
                      item?.sub_sub_cat_name }}</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Product Name *</label>
                <input v-model="inputData.prod_name" :class="{ 'is-invalid': isValidation && !inputData.prod_name }"
                  type="text" class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
                  aria-describedby="emailHelp" placeholder="Write product name">
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Product ID *</label>
                <input v-model="inputData.prod_id" :class="{ 'is-invalid': isValidation && !inputData.prod_id }"
                  type="number" class="form-control form-control-sm input-field-style" placeholder="Write product ID">
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Price *</label>
                <input v-model="inputData.price" :class="{ 'is-invalid': isValidation && !inputData.price }"
                  type="number" class="form-control form-control-sm input-field-style"
                  placeholder="Write product price">
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Stock *</label>
                <input v-model="inputData.stock" :class="{ 'is-invalid': isValidation && !inputData.stock }"
                  type="number" class="form-control form-control-sm input-field-style"
                  placeholder="Write product stock">
              </div>
            </div>

            <div class="col-md-4">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Product Type *</label>
                <select v-model="inputData.prod_type_info"
                  :class="{ 'is-invalid': isValidation && !inputData.prod_type_info }"
                  class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
                  <option v-for="(item, index) in productTypeList" :key="index" :value="item">({{ item?.prod_type }})
                    - {{
                      item?.prod_type_name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Currency Type *</label>
                <select v-model="inputData.currency_type_info"
                  :class="{ 'is-invalid': isValidation && !inputData.currency_type_info }"
                  class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
                  <option v-for="(item, index) in currencyTypeList" :key="index" :value="item">({{ item?.currency_id }})
                    - {{
                      item?.currency_name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-4">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Status *</label>
                <select v-model="inputData.status"
                  :class="{ 'is-invalid': isValidation && !inputData.currency_type_info }"
                  class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
                  <option v-for="(item, index) in statusList" :key="index" :value="item.status">({{ item?.status }})
                    - {{
                      item?.status_name }}</option>
                </select>
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Image *</label>
                <input v-model="inputData.prod_image" :class="{ 'is-invalid': isValidation && !inputData.prod_image }"
                  type="url" class="form-control form-control-sm input-field-style" id="exampleInputText"
                  aria-describedby="textHelp" placeholder="Enter photo URL">
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Brand</label>
                <input v-model="inputData.prod_brand" :class="{ 'is-invalid': isValidation && !inputData.prod_brand }"
                  type="text" class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
                  aria-describedby="emailHelp" placeholder="Enter brand name">
              </div>
            </div>
            <div class="col-md-12">
              <div class="mb-2">
                <label for="exampleInputEmail1" class="form-label">Description</label>
                <textarea v-model="inputData.description" rows="4"
                  :class="{ 'is-invalid': isValidation && !inputData.description }" type="text"
                  class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
                  aria-describedby="emailHelp" placeholder="Enter description"></textarea>
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer d-flex justify-content-center mb-4 pt-4 modal-footer-style">
          <button @click="handleSubmit" type="submit" class="submit-btn">
            Submit
          </button>

          <button @click="handleCancel" type="cencel" class="cancel-btn ms-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped src="./PenguinProducts.css"></style>
