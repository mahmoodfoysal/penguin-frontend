<script setup>
import { onMounted, ref } from 'vue';
import { getAdmin, postAdmin } from '../../api/make-admin.js';

const adminList = ref([]);
const inputData = ref({});
const isValidation = ref([]);

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
}

const handleEdit = (roleInfo) => {
  inputData.value = {
    id: roleInfo?._id,
    email: roleInfo?.email,
    role_info: admin_role.value?.find((item) => item.id == roleInfo.role_id)
  }
}
</script>

<template>
  <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between">
    <span>Admin List</span>
    <div class="d-flex align-items-center">
      <span class="material-icons" @click="handlePostAdmin">edit</span>
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
      type="submit" class="submit-btn">Submit</button>
    </div>
  </div>
  <h4 class="text-center mb-2"><u>Admin List</u></h4>
  <div class="row">
    <div
    v-for="(item, index) in adminList"
    :key="index"
    class="col-md-6 mb-2">
      <h6
      class="d-flex align-items-center">
      <span>
        Email: {{ item?.email }}
      </span>
      <span
      @click="handleEdit(item)"
      class="material-icons ms-2 cursor">
      edit
    </span>
  </h6>
      <p>Role: {{ item?.role }}</p>
      <p>Id: {{ item?.role_id }}</p>
    </div>
  </div>
</template>

<style scoped src="./MakeAdmin.css"></style>
