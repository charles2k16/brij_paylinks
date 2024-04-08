<template>
    <div
        class="w-full lg:border md:border lg:border-gray-200 md:border-gray-200  mt-4 lg:px-3 px-2 lg:py-3  rounded-lg">
        <!-- Campaign Image Slider -->
        <div class="block bg-slate-400 w-full sm:hidden">
            <el-carousel height="200px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- Campaign title for sm screen only-->
        <h2 class="text-gray-900 mt-2 text-2xl lg:pe-16 block sm:hidden">{{ props.campaign?.title }}</h2>

        <!-- Amount raised card -->
        <!-- <div class="flex bg-gray-50 py-3 px-3 rounded-md items-center flex-wrap sm:hidden">
            <img src="~/assets/images/ghana.png" class="lg:me-3 me-2" height="27" width="27" alt="ghana_flag">
            <div class="flex gap-x-1 lg:me-5 me-3">
                <p class="primary-custom-text-color font-bold ">₵0.00</p>
                <p>raised</p>
            </div>
            <div class="rounded-full p-0.5 primary-custom-bg-color lg:me-5 me-3"></div>
            <div class="flex gap-x-1">
                <p>0</p>
                <p>donations</p>
            </div>
        </div> -->


        <!-- User info for small screens only -->
        <div class="flex mt-4 w-full items-center gap-x-2 flex-wrap my-4  sm:hidden">
          <!-- Avatar -->
          <el-popover placement="bottom" :width="200" trigger="hover" class="` hover:cursor-pointer">
                <template #reference>
                    <div class="p-2 rounded-full  flex justify-between items-center  border-2 border-teal-900">
                        <Icon name="ph:storefront-bold" class="text-teal-950" size="20" />
                    </div>
                </template>
                 <div class="flex flex-col gap-y-2">
                    <p class="text-sm text-amber-600">Merhant details</p>

                 <div class="flex flex-col">
                    <h2 class="text-base font-bold">{{ props.merchant?.data.name }}</h2>
                    <p class="text-sm text-gray-400">{{ props.merchant?.data.contact }}</p>
                 </div>

                    <hr>
                    <p class="text-sm text-gray-400">Address - {{ props.merchant?.data.address }}</p>

                 </div>
            </el-popover>
                        <!-- Orginizer name -->
                        <div class="flex flex-col">
                <div class="flex items-center gap-x-2">
                    <h2 class="text-base font-bold">{{ props.merchant?.data.name }}</h2>
                    <p class="text-base">is organizing a Champaign</p>
                </div>
                <p class="text-sm text-gray-400">Created on {{ formateDate(props.campaign?.created_at!, 'ddd Do MMM, YYYY') }}</p>

            </div>
        </div>

        <!-- tags for sm screen only -->
        <div class="flex w-full flex-row flex-wrap border py-1 rounded-full px-1  sm:hidden">
            <!-- chips -->
            <div v-for="(tag, index) in props.campaign?.tags" :key="index" class="flex bg-teal-900 rounded-full me-1">
                <p class="text-sm text-white px-4 py-2">{{ tag }}</p>
            </div>
        </div>


        <!-- Amount raised card for large screen -->
        <!-- <div class="sm:flex bg-gray-50 py-3 px-3 rounded-md items-center flex-wrap hidden">
            <img src="~/assets/images/ghana.png" class="lg:me-3 me-2" height="27" width="27" alt="ghana_flag">
            <div class="flex gap-x-1 lg:me-5 me-3">
                <p class="primary-custom-text-color font-bold ">₵30000.00</p>
                <p>Raised</p>
            </div>
            <div class="rounded-full p-0.5 primary-custom-bg-color lg:me-5 me-3"></div>
            <div class="flex gap-x-1">
                <p>0</p>
                <p>donations</p>
            </div>
        </div> -->

        <!-- Campaign description for small screen -->
            <p class="my-5 block sm:hidden">{{ props.campaign?.description }}</p>

        <!-- Copy Campaign link field for small screens only-->
        <div class="block sm:hidden mt-5">
            <CampaignCopyLink :url="campaignUrl" />
        </div>

        <p class="text-center mt-5 text-gray-400 text-sm mb-20 sm:hidden flex justify-center ">{{ props.campaign?.footnote }}</p>




        <!--  Payment form-->
        <CampaignPaymentForm :campaign="props.campaign" :paymentOptions="paymentOptions" class="hidden sm:block" />
    </div>
</template>
<script setup lang="ts">
import type { Campaign, MerchantDetails, PaymentMethods  } from '~/types';


const props = defineProps<{
    campaign: Campaign | null,
    paymentOptions: PaymentMethods,
    merchant: MerchantDetails | null
}>()

  // campaign url
  const campaignUrl = ref(
    `https://pay.brij.money/campaign/${props.campaign?.campaign_link}`
  );


</script>
<style></style>