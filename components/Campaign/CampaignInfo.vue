<template>
    <div class="py-5 px-10 flex flex-col justify-start">


        <!-- Campaign Image Slider -->
        <div class="block mt-2rounded-lg">
            <el-carousel class="lg:h-72 md:h-52 rounded-lg">
                <el-carousel-item v-for="(image, index) in campaign" :key="index">
                        <img  :src="image.url" class="cover" alt="campaign_image">
                </el-carousel-item>
            </el-carousel>
        </div>


        <!-- Campaign Title -->
        <h2 class="text-gray-900 text-2xl lg:pe-16 mt-2">{{ campaign?.title }}</h2>

        <!-- Campaign orginizer info -->
        <div class="flex mt-4 w-full items-center gap-x-4 flex-wrap">
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
                    <h2 class="text-base font-bold">{{ merchant?.name }}</h2>
                    <p class="text-sm text-gray-400">{{ merchant?.contact }}</p>
                 </div>

                    <hr>
                    <p class="text-sm text-gray-400">Address - {{merchant?.address }}</p>

                 </div>
            </el-popover>

            <!-- Orginizer name -->
            <div class="flex flex-col">
                <div class="flex items-center gap-x-2">
                    <h2 class="text-base font-bold">{{merchant?.name }}</h2>
                    <p class="text-base">is organizing a Champaign</p>
                </div>
                <p class="text-sm text-gray-400">Created on {{ formateDate(props.campaign?.created_at!, 'ddd Do MMM, YYYY') }}</p>

            </div>


            <!-- date -->
        </div>




        <!-- List of tags -->
        <div class="flex w-full flex-row flex-wrap border py-2 rounded-full mt-4 px-2">
            <!-- chips -->
            <div v-for="(tag, index) in props.campaign?.tags" :key="index" class="flex bg-teal-900 rounded-full me-2">
                <p class="text-base font-semibold text-white px-5 py-2">{{ tag }}</p>
            </div>
        </div>

        <!-- Description -->
        <p class="mt-4 text-lg">{{ props.campaign?.description }}</p>

        
        <!-- footer text -->
        <p class="text-center text-gray-400 mt-10 text-sm">{{ props.campaign?.footnote }}</p>


    </div>
</template>
<script setup lang="ts">
import { type Campaign,  type Merchant } from '~/types/index'
const props = defineProps<{
    campaign: Campaign  | any,
    merchant: Merchant | undefined
}>()


</script>
<style>
.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>