<template>

  <div
    class="flex flex-col w-full lg:px-5 md:px-5 md:py-5 px-2 lg:py-5 py-2 bg-gray-50 dark:bg-gray-900 rounded-md">
    <div class="flex w-full lg:justify-start justify-center">
      <!-- <div
        class="relative lg:max-w-md md:max-w-md lg:h-56 h-44 rounded-lg w-full bg-cover bg-center"
        style="background-image: url('/img/invoice-bg.png')">
        <img
          src="/img/logo-white.png"
          alt="Logo"
          class="absolute top-0 right-0 m-4 h-16" />
      </div> -->

     <div class="flex flex-col w-full lg:px-5 md:px-5 md:py-5 px-2 lg:py-5 py-2 bg-white dark:bg-gray-950  rounded-md">
        <div class="flex w-full lg:justify-start justify-center">

            <div class="relative  lg:max-w-md md:max-w-md    lg:h-56 h-44 rounded-lg w-full bg-cover bg-center"
            style="background-image: url('/img/invoice-bg.png');">
            <img src="/img/logo-white.png" alt="Logo" class="absolute top-0 right-0 m-4 h-16">
        </div>

        </div>
        <span class="text-2xl font-medium mt-3 lg:text-start text-center dark:text-white">{{ merchant?.name }}</span>
        <p class="text-slate-400 lg:text-start text-center dark:text-white">{{ merchant?.merchant_industry }}</p>

        <!-- payment template -->

        <!-- toggle contact btn -->
        <div class="flex justify-center">
            <button type="button" @click="toggleContactInfo"
                class=" sm:hidden flex mt-3 gap-x-2 items-center border border-gray-300 dark:border-slate-800 w-fit px-2 py-1 rounded-full">
                <Icon v-if="showMerchantContactInfo" class="text-teal-950 dark:text-white" name="ic:twotone-keyboard-arrow-up" />
                <Icon v-else class="text-teal-950 dark:text-white" name="ic:twotone-keyboard-arrow-down" />
                <p v-if="showMerchantContactInfo" class="text-xs dark:text-white">Close Contact info</p>
                <p v-else class="text-xs dark:text-white">Show Contact info</p>
            </button>

        </div>

        <div v-if="showMerchantContactInfo"
            class="border flex flex-col gap-y-5 border-gray-300 dark:border-slate-800  rounded-md mt-5 px-5 py-3">
            <div class="flex items-center justify-between">
                <div class="d-flex gap-x-3 items-center ">
                    <Icon name="material-symbols:call-outline" class="dark:text-white" />
                    <p class="font-medium dark:text-white">{{ merchant?.contact }}</p>
                </div>
                <el-button @click="copy(source)" type="warning" circle>
                    <Icon class="text-teal-950" name="mdi:content-copy" />
                </el-button>
            </div>
            <div class="flex items-center justify-between">
                <div class="d-flex gap-x-3 items-center ">
                    <Icon name="tdesign:location-1" class="dark:text-white" />
                    <p class="font-medium dark:text-white">{{ merchant?.address }}</p>
                </div>
                <!-- <el-button type="warning" circle><Icon class="text-teal-950" name="mdi:content-copy"/></el-button> -->
            </div>
        </div>


        <div v-if="isPaymentLinkTemplate" class="border flex flex-col gap-y-5 border-gray-300 dark:border-slate-800  rounded-md mt-5 px-5 py-3">
            <div class="flex items-center justify-between">
                <div class="d-flex gap-x-3 items-center ">
                    <h2 class="font-medium text-xl dark:text-white">{{ paymentLinkTemplate?.name }}</h2>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="d-flex gap-x-3 items-center ">
                    <p class="dark:text-white">Amount to be paid</p>
                </div>
                <h2 class="dark:text-white">{{ paymentLinkTemplate?.currency }}  {{ paymentLinkTemplate?.amount }}</h2>
            </div>

        </div>



    </div>
    
    </div>

 



  </div>
</template>
<script setup lang="ts">
import type { Merchant, PaymentMethods } from '~/types';
import { usePaymentLinkStore } from '~/store/payment_links';
import { useClipboard } from '@vueuse/core';

const paymentLinkStore = usePaymentLinkStore();
const { paymentLinkTemplate, isPaymentLinkTemplate } = storeToRefs(paymentLinkStore);
// ** toggle merchant ** //
const showMerchantContactInfo = ref(true);

const props = defineProps<{
  merchant: Merchant | undefined;
}>();

function toggleContactInfo() {
  showMerchantContactInfo.value = !showMerchantContactInfo.value;
}

// copy of merchant portal
const source = ref(`${props.merchant?.contact}`);
const { copy, copied } = useClipboard({ source });

// alert if contact is copied
watch(copied, newValue => {
  if (newValue === true) {
    ElMessage({
      message: 'Campaign url copied successfully',
      type: 'success',
    });
  }
});
</script>
<style scoped>
.m-backdrop-content {
  background-color: bisque;
}

.m-bottom-sheet__container {
  background-color: rgb(144, 96, 37);
  margin: 0px;
  padding: 0px;
}
</style>
