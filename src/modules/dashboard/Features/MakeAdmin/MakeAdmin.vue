<script setup>
import { computed, onMounted, ref } from 'vue';
import { getAdmin, postAdmin } from '../../api/make-admin.js';

const adminList = ref([]);
const inputData = ref({});
const isValidation = ref(false);
const isCreateModal = ref(false);
const searchKey = ref('');
const is_searchable = ref(false);

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

const handleCreate = () => {
  isCreateModal.value = true;
  inputData.value = {}
};

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
  if (!inputData.value?.email ||
    !inputData.value?.role_info
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
    const text = "Are you want to sure?"
    if (confirm(text) === true) {
      const result = await postAdmin(data)
      if (result?.status === 201) {
        alert(result.data?.message);
        isCreateModal.value = false;
        const obj = {
          _id: result.data?.id,
          email: inputData.value?.email,
          role: inputData.value?.role_info?.role_name,
          role_id: inputData.value?.role_info?.id
        };
        const index = adminList.value?.findIndex((item) => item._id == result.data?.id);
        if (index > -1) {
          adminList.value[index] = obj;
        }
        else {
          adminList.value.unshift(obj);
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
  inputData.value = {
  }
};

const handleEdit = (roleInfo) => {
  inputData.value = {
    id: roleInfo?._id,
    email: roleInfo?.email,
    role_info: admin_role.value?.find((item) => item.id == roleInfo.role_id)
  }
  isCreateModal.value = true;
};

const search_func = (val) => {
  is_searchable.value = val;
};

const filterAdminList = computed(() => {
  return adminList.value?.filter((item) =>
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
  <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between">
    <h6>Admin List</h6>
    <button @click="handleCreate" class="d-flex align-items-center">
      Create New <span class="material-icons">add</span>
    </button>
  </div>
  <table class="table table-style">
    <thead>
      <tr>
        <th>SL</th>
        <th>Role ID</th>
        <th>Email
          <div class="magic-search" :class="{ active: is_searchable }" @click="search_func(true)">
              <div id="search-icon" class="search-icon">
                <span class="material-icons">search</span>
              </div>

              <input id="search-input" v-model="searchKey" type="text" class="search-input" placeholder="Search..."
                @blur="search_func(false)" />
            </div>
        </th>
        <th>Role Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in filterAdminList" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item?.role_id }}</td>
        <td>{{ item?.email }}</td>
        <td>{{ item?.role }}</td>
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
                <label for="exampleInputEmail1" class="form-label">Email *</label>
                <input v-model="inputData.email" :class="{ 'is-invalid': isValidation && !inputData.email }" type="text"
                  class="form-control form-control-sm input-field-style" id="exampleInputEmail1"
                  aria-describedby="emailHelp" placeholder="Enter email">
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Select role *</label>
                <select v-model="inputData.role_info" :class="{ 'is-invalid': isValidation && !inputData.role_info }"
                  class="form-select form-select-sm input-field-style" aria-label=".form-select-sm example">
                  <option v-for="(item, index) in admin_role" :key="index" :value="item">{{ item?.role_name }}</option>
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

<style scoped src="./MakeAdmin.css"></style>
