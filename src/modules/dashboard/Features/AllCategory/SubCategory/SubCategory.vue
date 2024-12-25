<script setup>
import { onMounted, ref, computed } from 'vue';
import { getParentCategory, getSubCategory , postSubCategory } from '@/modules/dashboard/api/categories.js';
import { useStore } from '@/store/index';

const categoryList = ref([]);
const parentCategoryList = ref([])
const inputData = ref({});
const isValidation = ref(false);
const store = useStore()


onMounted(() => {
  handleGetSubCategory();
  handleGetParentCategory();
});

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

const handleSubmit = async () => {
  isValidation.value = false;
  if (
    !inputData.value?.sub_cat_id ||
    !inputData.value?.sub_cat_name ||
    !inputData.value?.parent_cat_info

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
    userInfo: user_email.value
  }
  try {
    const text = "Are you want to sure?";
    if (confirm(text) === true) {
      const result = await postSubCategory(data)
      if (result?.status === 201) {
        alert(result.data?.message);
        const obj = {
          _id: result.data?.id,
          par_cat_id: Number(inputData.value?.parent_cat_info?.par_cat_id),
    sub_cat_id: Number(inputData.value?.sub_cat_id),
    sub_cat_name: inputData.value?.sub_cat_name,
    par_cat_name: inputData.value?.parent_cat_info?.par_cat_name,
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
  inputData.value = {
  }
};

const handleEdit = (item) => {
  inputData.value = {
    id: item?._id,
    parent_cat_info: parentCategoryList.value.find((parCatItem) => parCatItem.par_cat_id === item.par_cat_id) ,
    sub_cat_id: item?.sub_cat_id,
    sub_cat_name: item?.sub_cat_name,
  }
};

const user_email = computed(() => store.userInfo?.email);
</script>

<template>
  <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between">
    <span>Parent Category</span>
    <div class="d-flex align-items-center">
      <span class="material-icons">edit</span>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Parent Category *</label>
        <select v-model="inputData.parent_cat_info" :class="{ 'is-invalid': isValidation && !inputData.parent_cat_info }"
          class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
          <option v-for="(item, index) in parentCategoryList" :key="index" :value="item">{{ item?.par_cat_id }} - {{ item?.par_cat_name }}</option>
        </select>
      </div>
    </div>
    <div class="col-md-6">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Category Name *</label>
        <input v-model="inputData.sub_cat_name" :class="{ 'is-invalid': isValidation && !inputData.sub_cat_name }"
          type="text" class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
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

  </div>

  <div>
      <button @click="handleSubmit"
      type="submit"
      class="submit-btn">
      Submit
      </button>

      <button
      @click="handleCancel"
      type="cencel"
      class="cancel-btn ms-2">
      Cancel
      </button>

    </div>
  <h4 class="text-center mb-3 heading-style">Parent Category List</h4>
  <table class="table table-style">
    <thead>
      <tr>
        <th>SL</th>
        <th>Parent ID</th>
        <th>Parent Category Name</th>
        <th>Sub ID</th>
        <th>Sub Category Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in categoryList" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item?.par_cat_id }}</td>
        <td>{{ item?.par_cat_name }}</td>
        <td>{{ item?.sub_cat_id }}</td>
        <td>{{ item?.sub_cat_name }}</td>
        <td>
            <span @click="handleEdit(item)"
            class="material-icons ms-2 cursor me-2 edit-icon">
              edit
            </span>
            <span
            class="material-icons ms-2 cursor delete-icon">
              delete
            </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped src="./SubCategory.css"></style>
