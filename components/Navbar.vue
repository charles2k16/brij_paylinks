<template>
  <nav class="flex flex-wrap items-center justify-between mx-auto py-2 lg:px-20 px-5 sticky top-0 z-10 bg-white">
    <div class="flex flex-col gapy-0 items-center">
      <!-- logo -->
      <img src="~/assets/images/logo-dark.png" alt="logo" class="h-10 w-10" />

    </div>

    <!-- toggle buttom -->
    <button @click="drawer = true" style="margin-left: 16px;"
      class="inline-flex items-center p-1 ml-3 text-xl rounded-lg md:hidden">
      <Icon class="w-6 h-6 text-black" name="ic:baseline-menu" />
    </button>

    <!-- Drawer for navbar items -->
    <el-drawer v-model="drawer" size="90%" direction="rtl" :show-close="false">
      <template #header="{ close, titleId, titleClass }">
        <h4 :id="titleId" :class="titleClass"></h4>
        <el-button type="" @click="close" link :icon="ArrowLeftBold">
          Back
        </el-button>
      </template>
      <!-- banner -->
      <CampaignBanner/>
    </el-drawer>



    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <div class="flex gap-x-4">
        <!-- Another component could be here -->

        <div class="flex gap-x-3">
          <!-- navlinks slots -->
          <slot></slot>
        </div>

        <div class="flex gap-x-1">
          <!-- Get Started -->
          <MazBtn color="transparent" size="sm">Merchant Login</MazBtn>
          <!-- Login  -->
          <MazBtn color="warning" size="sm" >Merchant Login</MazBtn>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { ArrowLeftBold} from '@element-plus/icons-vue';
const drawer = ref(false)
</script>
<style scoped>
.primary-custom-bg-color {
  background-color: #04383F;
}

.secondary-custom-bg-color {
  background-color: #F9AB10;
}

.secondary-custom-bg-color:hover {
  background-color: #f0af2c;
}

.button-font-weight {
  font-weight: 900;
}

.primary-custom-text-color {
  color: #04383F;
}
</style>





