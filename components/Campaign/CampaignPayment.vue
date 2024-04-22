<template>
    <div
        class="w-full lg:border md:border lg:border-gray-200 md:border-gray-200   lg:px-3 px-4 lg:py-3 pb-3  rounded-lg">
        <!-- Campaign Image Slider -->
        <div class="block w-full sm:hidden rounded-md">
            <el-carousel class="h-64 rounded-md">
                <el-carousel-item v-for="(image, index) in props.campaign.images" :key="index">
                        <img  :src="image.url" class="cover" alt="campaign_image">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- Campaign title for sm screen only-->
        <h2 class="text-gray-900 mt-2 text-2xl lg:pe-16 block sm:hidden">{{ props.campaign?.title }}</h2>

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
                    <h2 class="text-base font-bold">{{ merchant?.name}}</h2>
                    <p class="text-sm text-gray-400">{{ merchant?.contact }}</p>
                 </div>

                    <hr>
                    <p class="text-sm text-gray-400">Address - {{ merchant?.address}}</p>

                 </div>
            </el-popover>
                        <!-- Orginizer name -->
                        <div class="flex flex-col">
                <div class="flex items-center gap-x-2">
                    <h2 class="text-base font-bold">{{  merchant?.address }}</h2>
                    <p class="text-base">is organizing a Champaign</p>
                </div>
                <p class="text-sm text-gray-400">Created on {{ formateDate(props.campaign?.created_at!, 'ddd Do MMM, YYYY') }}</p>

            </div>
        </div>

        <CampaignCopyLink class="w-full my-5 sm:hidden" :campaignLink="campaign?.campaign_link!" />   

        <!-- tags for sm screen only -->
        <div class="flex w-full flex-row flex-wrap border py-1 rounded-full px-1  sm:hidden">
            <!-- chips -->
            <div v-for="(tag, index) in props.campaign?.tags" :key="index" class="flex bg-teal-900 rounded-full me-1">
                <p class="text-sm text-white px-4 py-2">{{ tag }}</p>
            </div>
        </div>


        
        <!-- Campaign description for small screen -->
            <p class="my-5 block sm:hidden">{{ props.campaign?.description }}</p>


        <p class="text-center mt-5 text-gray-400 text-sm mb-20 sm:hidden flex justify-center ">{{ props.campaign?.footnote }}</p>


        <!--  Payment form-->
        <CampaignPaymentForm :campaign="props.campaign" :merchant="merchant" :countries="countries" :paymentOptions="paymentOptions" class="hidden sm:block" />
    </div>
</template>
<script setup lang="ts">
import type { Campaign, Merchant, PaymentMethods  } from '~/types';


const props = defineProps<{
    campaign: Campaign
    paymentOptions: PaymentMethods 
    merchant: Merchant | undefined
    countries: any[]

}>()



</script>
<style>
.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>