<script setup>
import { onMounted, ref } from 'vue';
import { getAdmin, postAdmin } from '../../api/make-admin.js';

const adminList = ref([]);
const inputData = ref({});
const isValidation = ref(false);

const admin_role = ref([
  {
    id: 201,
    role_name: "Admin",
  },
  {
    id: 202,
    role_name: "Modarator",
  }
]);

onMounted(() => {
  handleGetAdmin();
});

const handleGetAdmin = async () => {
  try {
    const result = await getAdmin();
    adminList.value = result.data?.list_data
  }
  catch (error) {
    console.log(error);
  }
};

const handleSubmit = async () => {
  isValidation.value = false;
  if(!inputData.value?.email ||
    !inputData.value?.roleInfo
  ) {
    isValidation.value = true;
    return;
  };
  const data = {
    _id: inputData.value.id || null,
    email: inputData.value?.email,
    role: inputData.value?.role_info?.role_name,
    role_id: inputData.value?.role_info?.id
  }
  try {
    const result = await postAdmin(data)
    if (result?.status === 201) {
      alert(result.data?.message);
      const obj = {
        email: inputData.value?.email,
        role: inputData.value?.role_info?.role_name,
        role_id: inputData.value?.role_info?.id
      };
      const index = adminList.value?.findIndex((item) => item._id == result.data?.id);
      if(index > -1) {
        adminList.value[index] = obj;
      }
      else {
        adminList.value.unshift(obj);
      }

    }
    isValidation.value = false;
    inputData.value = {};
  }
  catch (error) {
    console.log(error);
  }
};

const handleCancel = () => {
  inputData.value = {
  }
};

const handleEdit = (roleInfo) => {
  inputData.value = {
    id: roleInfo?._id,
    email: roleInfo?.email,
    role_info: admin_role.value?.find((item) => item.id == roleInfo.role_id)
  }
};
</script>

<template>
  <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between">
    <span>Admin</span>
    <div class="d-flex align-items-center">
      <span class="material-icons">edit</span>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input
        v-model="inputData.email"
        :class="{'is-invalid': isValidation && !inputData.email}"
        type="text" class="form-control form-control-sm input-field-style" id="exampleInputEmail1" aria-describedby="emailHelp"
          placeholder="Enter email">
      </div>
    </div>
    <div class="col-md-6">
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Select role</label>
        <select
        v-model="inputData.role_info"
        :class="{'is-invalid': isValidation && !inputData.role_info}"
        class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
          <option
          v-for="(item, index) in admin_role"
          :key="index"
          :value="item">{{ item?.role_name }}</option>
        </select>
      </div>

    </div>
    <div class="col-md-6">
      <button
      @click="handleSubmit"
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
  </div>

  <h4 class="text-center mb-3 heading-style">Admin List</h4>
  <table class="table table-style">
    <thead>
      <tr>
        <th>SL</th>
        <th>Role ID</th>
        <th>Email</th>
        <th>Role Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in adminList" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item?.role_id }}</td>
        <td>{{ item?.email }}</td>
        <td>{{ item?.role }}</td>
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

<style scoped src="./MakeAdmin.css"></style>
