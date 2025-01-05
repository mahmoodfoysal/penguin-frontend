<script setup>
import { onMounted, ref, computed } from 'vue';
import { getParentCategory, getSubCategory, postSubCategory, updateSubCategoryStatus } from '@/modules/dashboard/api/categories.js';
import { useStore } from '@/store/index';

const categoryList = ref([]);
const parentCategoryList = ref([])
const inputData = ref({});
const isValidation = ref(false);
const isCreateModal = ref(false);
const searchKey = ref('');
const is_searchable = ref(false);
const store = useStore();

const statusList = ref([
  {
    id: 1,
    name: 'Active'
  },
  {
    id: 0,
    name: 'Inactive'
  }
]);


onMounted(() => {
  handleGetSubCategory();
  handleGetParentCategory();
});

const handleCreate = () => {
  isCreateModal.value = true;
  inputData.value = {
    status: 1
  }
};

const handleGetSubCategory = async () => {
  try {
    const result = await getSubCategory();
    categoryList.value = result.data?.list_data
  }
  catch (error) {
    console.log(error);
  }
};

const handleGetParentCategory = async () => {
  try {
    const result = await getParentCategory();
    parentCategoryList.value = result.data?.list_data
  }
  catch (error) {
    console.log(error);
  }
};

const handleUpdateSubCategoryStatus = async (item) => {
  try {
    const data = { status: Number(item.status) };
    const result = await updateSubCategoryStatus(item._id, data);
    alert(result.data?.message)
  }
  catch (error) {
    console.log(error);
  };
};

const handleSubmit = async () => {
  isValidation.value = false;
  if (
    !inputData.value?.sub_cat_id ||
    !inputData.value?.sub_cat_name ||
    !inputData.value?.parent_cat_info ||
    !inputData.value?.status
  ) {
    isValidation.value = true;
    return;
  };
  const data = {
    _id: inputData.value.id || null,
    par_cat_id: Number(inputData.value?.parent_cat_info?.par_cat_id),
    sub_cat_id: Number(inputData.value?.sub_cat_id),
    sub_cat_name: inputData.value?.sub_cat_name,
    par_cat_name: inputData.value?.parent_cat_info?.par_cat_name,
    user_info: user_email.value,
    status: inputData.value?.status
  }
  try {
    const text = "Are you want to sure?";
    if (confirm(text) === true) {
      const result = await postSubCategory(data)
      if (result?.status === 201) {
        alert(result.data?.message);
        isCreateModal.value = false;
        const obj = {
          _id: result.data?.id,
          par_cat_id: Number(inputData.value?.parent_cat_info?.par_cat_id),
          sub_cat_id: Number(inputData.value?.sub_cat_id),
          sub_cat_name: inputData.value?.sub_cat_name,
          par_cat_name: inputData.value?.parent_cat_info?.par_cat_name,
          status: inputData.value?.status
        };
        const index = categoryList.value?.findIndex((item) => item._id == result.data?.id);
        if (index > -1) {
          categoryList.value[index] = obj;
        }
        else {
          categoryList.value.unshift(obj);
        }
      }
      isValidation.value = false;
      inputData.value = {};
    }
  }

  catch (error) {
    console.log(error);
  }
};

const handleCancel = () => {
  isCreateModal.value = false;
  inputData.value = {}
};

const handleEdit = (item) => {
  inputData.value = {
    id: item?._id,
    parent_cat_info: parentCategoryList.value.find((parCatItem) => parCatItem.par_cat_id === item.par_cat_id),
    sub_cat_id: item?.sub_cat_id,
    sub_cat_name: item?.sub_cat_name,
    status: item?.status
  }
  isCreateModal.value = true;
};

const search_func = (val) => {
  is_searchable.value = val;
};

const filterSubCategories = computed(() => {
        return categoryList.value?.filter((item) =>
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

const user_email = computed(() => store.userInfo?.email);
</script>

<template>
  <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between">
    <span>Sub Category</span>
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
        <th>Parent ID</th>
        <th>Parent Name
          <div class="magic-search" :class="{ active: is_searchable }" @click="search_func(true)">
                <div id="search-icon" class="search-icon">
                  <span class="material-icons">search</span>
                </div>

                <input id="search-input" v-model="searchKey" type="text" class="search-input" placeholder="Search..."
                  @blur="search_func(false)" />
              </div>
        </th>
        <th>Sub ID</th>
        <th>Sub Name</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in filterSubCategories" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item?.par_cat_id }}</td>
        <td>{{ item?.par_cat_name }}</td>
        <td>{{ item?.sub_cat_id }}</td>
        <td>{{ item?.sub_cat_name }}</td>
        <td>
          <div class="form-check form-switch">
            <input v-model="item.status" :value="item" :true-value="1" :false-value="0" class="form-check-input"
              type="checkbox" role="switch" id="flexSwitchCheckDisabled"
              @change="handleUpdateSubCategoryStatus(item)" />
          </div>
        </td>
        <td>
          <span @click="handleEdit(item)" class="material-icons ms-2 cursor me-2 edit-icon">
            edit
          </span>
          <span class="material-icons ms-2 cursor delete-icon">
            delete
          </span>
        </td>
      </tr>
    </tbody>
  </table>

  <nav class="navbar bg-light fixed-top">
    <div class="container-fluid">
      <div class="offcanvas offcanvas-end create-modal" tabindex="-1" id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel" :class="{ 'show': isCreateModal }"
        :style="{ visibility: isCreateModal ? 'visible' : 'hidden' }">
        <div class="offcanvas-header modal-header-style">
          <div class="d-flex align-items-center gap-3">
            <button type="button" class="btn-close" @click="handleCancel" aria-label="Close"></button>
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              Create Admin
            </h5>
          </div>
        </div>
        <div class="offcanvas-body">
          <!-- code write here  -->
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Parent Category *</label>
                <select v-model="inputData.parent_cat_info"
                  :class="{ 'is-invalid': isValidation && !inputData.parent_cat_info }"
                  class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
                  <option v-for="(item, index) in parentCategoryList" :key="index" :value="item">{{ item?.par_cat_id }}
                    - {{
                      item?.par_cat_name }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Category Name *</label>
                <input v-model="inputData.sub_cat_name"
                  :class="{ 'is-invalid': isValidation && !inputData.sub_cat_name }" type="text"
                  class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
                  aria-describedby="emailHelp" placeholder="Write sub category name">
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Category ID *</label>
                <input v-model="inputData.sub_cat_id" :class="{ 'is-invalid': isValidation && !inputData.sub_cat_id }"
                  type="number" class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
                  aria-describedby="emailHelp" placeholder="Give sub category id">
              </div>
            </div>

            <div class="col-md-6">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">status *</label>
                <select v-model="inputData.status" :class="{ 'is-invalid': isValidation && !inputData.status }"
                  class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
                  <option v-for="(item, index) in statusList" :key="index" :value="item.id">{{ item?.id }} - {{
                    item?.name }}
                  </option>
                </select>
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

<style scoped src="./SubCategory.css"></style>
