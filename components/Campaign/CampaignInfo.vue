<template>
    <div class="py-5 flex flex-col justify-start">


        <!-- Campaign Image Slider -->
        <div class="block mt-2 bg-slate-400">
            <el-carousel height="300px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3 class="small">{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>

        <!-- Campaign Title -->
        <h2 class="text-gray-900 text-3xl lg:pe-16 mt-2">{{ props.campaign?.title }}</h2>

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
                    <h2 class="text-base font-bold">{{ merchant?.data.name }}</h2>
                    <p class="text-sm text-gray-400">{{ merchant?.data.contact }}</p>
                 </div>

                    <hr>
                    <p class="text-sm text-gray-400">Address - {{merchant?.data.address }}</p>

                 </div>
            </el-popover>

            <!-- Orginizer name -->
            <div class="flex flex-col">
                <div class="flex items-center gap-x-2">
                    <h2 class="text-base font-bold">{{merchant?.data.name }}</h2>
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
import { useCampaignStore } from '~/store/campaign';
import { type Campaign,  type MerchantResponse } from '~/types/index'
const props = defineProps<{
    campaign: Campaign  | any,
    merchant: MerchantResponse | undefined
}>()


</script>
<style></style>