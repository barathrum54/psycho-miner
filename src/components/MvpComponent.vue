<template>
  <div class="container">
    <div class="grid formgrid justify-content-center">
      <div class="col-6">
        <h3>Invest</h3>
        <InputText
          class="main-input"
          type="number"
          placeholder="Enter the amount"
        ></InputText>
        <Button
          type="button"
          class="mr-2 mb-2 mt-2"
          label="INVEST"
          icon="pi pi-chart-line"
          :loading="investBtnLoad"
          :disabled="!isAuth"
          @click="investBtnAction"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
let investBtnLoad = ref(false);
let isAuth = computed(() => {
  return window.userStore.isAuth;
});
onMounted(() => {
  // console.log("mounted");
});

const investBtnAction = () => {
  investBtnLoad.value = true;
  setTimeout(() => {
    investBtnLoad.value = false;
  }, 2000);
};
</script>
<style scoped>
.container {
  padding: 20px 10px;
}
.main-input {
  width: 100%;
}
</style>
