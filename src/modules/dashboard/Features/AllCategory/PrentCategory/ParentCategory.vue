<script setup>
import { onMounted, ref } from 'vue';
import { getParentCategory, postParentCategory } from '@/modules/dashboard/api/categories.js';

const categoryList = ref([]);
const inputData = ref({});
const isValidation = ref(false);

onMounted(() => {
  handleGetParentCategory();
});

const handleGetParentCategory = async () => {
  try {
    const result = await getParentCategory();
    categoryList.value = result.data?.list_data
  }
  catch (error) {
    console.log(error);
  }
};

const handleSubmit = async () => {
  isValidation.value = false;
  if (
    !inputData.value?.par_cat_id ||
    !inputData.value?.par_cat_name
  ) {
    isValidation.value = true;
    return;
  };
  const data = {
    _id: inputData.value.id || null,
    par_cat_id: Number(inputData.value?.par_cat_id),
    par_cat_name: inputData.value?.par_cat_name,
  }
  try {
    const text = "Are you want to sure?";
    if (confirm(text) === true) {
      const result = await postParentCategory(data)
      if (result?.status === 201) {
        alert(result.data?.message);
        const obj = {
          par_cat_id: inputData.value?.par_cat_id,
          par_cat_name: inputData.value?.par_cat_name,
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
}

const handleEdit = (item) => {
  inputData.value = {
    id: item?._id,
    par_cat_id: item?.par_cat_id,
    par_cat_name: item?.par_cat_name,
  }
}
</script>

<template>
  <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between">
    <span>Parent Category List</span>
    <div class="d-flex align-items-center">
      <span class="material-icons">edit</span>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Category Name</label>
        <input v-model="inputData.par_cat_name" :class="{ 'is-invalid': isValidation && !inputData.par_cat_name }"
          type="text" class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
          aria-describedby="emailHelp" placeholder="Write category name">
      </div>
    </div>
    <div class="col-md-6">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Category ID</label>
        <input v-model="inputData.par_cat_id" :class="{ 'is-invalid': isValidation && !inputData.par_cat_id }"
          type="number" class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
          aria-describedby="emailHelp" placeholder="Give category id">
      </div>
    </div>

    <div class="col-md-6">
      <button @click="handleSubmit" type="submit" class="submit-btn">Submit</button>
    </div>
  </div>
  <h4 class="text-center mb-2"><u>Parent Category List</u></h4>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">SL</th>
        <th scope="col">Category Name</th>
        <th scope="col">Category ID</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in categoryList" :key="index">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ item?.par_cat_name }}</td>
        <td>{{ item?.par_cat_id }}</td>
        <td>
          <div class="d-flex align-items-center">
            <span @click="handleEdit(item)" class="material-icons ms-2 cursor me-2">
              edit
            </span>
            <span class="material-icons ms-2 cursor">
              delete
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped src="./ParentCategory.css"></style>
