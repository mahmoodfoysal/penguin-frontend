<script setup>
import { onMounted, ref } from 'vue';
import { getAdmin, postAdmin } from '../../api/make-admin.js';

const adminList = ref([]);

onMounted(() => {
  handleGetAdmin();
});

const handleGetAdmin = async () => {
  try {
    const result = await getAdmin();
    adminList.value = result.data?.list_data
  }
  catch(error) {
    console.log(error);
  }
};

const handlePostAdmin = async () => {
  const data = {

  }
  try {
    const result = await postAdmin(data)
    if(result.id) {
      alert(result.message)
    }
  }
  catch(error) {
    console.log(error);
  }
}

</script>

<template>
  <div class="filter-bar d-flex flex-wrap align-items-center justify-content-between">
    <span>Home page</span>
    <div class="d-flex align-items-center">
      <span class="material-icons" @click="handlePostAdmin">edit</span>
    </div>
  </div>

<h1>hello world</h1>
</template>

<style scoped src="./MakeAdmin.css"></style>
