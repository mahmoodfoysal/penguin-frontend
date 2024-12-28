<script setup>
import { onMounted, ref } from 'vue';
import { getParentCategory, postParentCategory, updateParentCategoryStatus } from '@/modules/dashboard/api/categories.js';

const categoryList = ref([]);
const inputData = ref({});
const isValidation = ref(false);

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

const handleUpdateParentCategoryStatus = async (item) => {
  try {
    const data = {status: Number(item.status)};
    const result = await updateParentCategoryStatus(item._id, data);
    alert(result.data?.message)
  }
  catch(error) {
    console.log(error);
  };
};

const handleSubmit = async () => {
  isValidation.value = false;
  if (
    !inputData.value?.par_cat_id ||
    !inputData.value?.par_cat_name ||
    !inputData.value.status
  ) {
    isValidation.value = true;
    return;
  };
  const data = {
    _id: inputData.value.id || null,
    par_cat_id: Number(inputData.value?.par_cat_id),
    par_cat_name: inputData.value?.par_cat_name,
    status: inputData.value?.status
  }
  try {
    const text = "Are you want to sure?";
    if (confirm(text) === true) {
      const result = await postParentCategory(data)
      if (result?.status === 201) {
        alert(result.data?.message);
        const obj = {
          _id: result.data?.id,
          par_cat_id: inputData.value?.par_cat_id,
          par_cat_name: inputData.value?.par_cat_name,
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
  inputData.value = {
  }
};

const handleEdit = (item) => {
  inputData.value = {
    id: item?._id,
    par_cat_id: item?.par_cat_id,
    par_cat_name: item?.par_cat_name,
    status: item?.status
  }
}
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
        <label for="exampleInputEmail1" class="form-label">Category Name *</label>
        <input v-model="inputData.par_cat_name" :class="{ 'is-invalid': isValidation && !inputData.par_cat_name }"
          type="text" class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
          aria-describedby="emailHelp" placeholder="Write category name">
      </div>
    </div>
    <div class="col-md-6">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Category ID *</label>
        <input v-model="inputData.par_cat_id" :class="{ 'is-invalid': isValidation && !inputData.par_cat_id }"
          type="number" class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
          aria-describedby="emailHelp" placeholder="Give category id">
      </div>
    </div>
    <div class="col-md-6">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Status *</label>
        <select v-model="inputData.status" :class="{ 'is-invalid': isValidation && !inputData.status }"
          class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
          <option v-for="(item, index) in statusList" :key="index" :value="item.id">{{ item?.id }} - {{ item?.name }}
          </option>
        </select>
      </div>
    </div>


  </div>
  <div>
    <button @click="handleSubmit" type="submit" class="submit-btn">
      Submit
    </button>

    <button @click="handleCancel" type="cencel" class="cancel-btn ms-2">
      Cancel
    </button>

  </div>
  <h4 class="text-center mb-3 heading-style">Parent Category List</h4>
  <table class="table table-style">
    <thead>
      <tr>
        <th>SL</th>
        <th>Category Name</th>
        <th>Category ID</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in categoryList" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item?.par_cat_name }}</td>
        <td>{{ item?.par_cat_id }}</td>
        <td>
          <div class="form-check form-switch">
            <input
            v-model="item.status"
            :value="item"
            :true-value="1"
            :false-value="0"
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDisabled"
            @change="handleUpdateParentCategoryStatus(item)"
            />
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
</template>

<style scoped src="./ParentCategory.css"></style>
