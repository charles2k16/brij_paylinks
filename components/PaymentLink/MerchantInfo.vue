<template>
    <div class="flex flex-col w-full lg:px-5 md:px-20 px-2 lg:py-5 py-5 bg-gray-50">
        <div class="flex w-full lg:justify-start justify-center">
            <div
                class="primary-custom-bg-color text-white p-5 rounded-md flex justify-center w-20 h-20 lg:w-full lg:h-52 items-center">
                <img src="/img/logo-dark.png" alt="logo" class="w-fit" />
            </div>
        </div>
        <span class="text-2xl font-medium mt-3 lg:text-start text-center">Bloom Impact Limited</span>
        <p class="text-slate-400 lg:text-start text-center">Internet Service</p>

        <!-- toggle contact btn -->
        <div class="flex justify-center">
            <button type="button" @click="toggleContactInfo"
                class=" sm:hidden flex mt-3 gap-x-2 items-center border border-gray-300 w-fit px-2 py-1 rounded-full">
                <Icon v-if="showMerchantContactInfo" class="text-teal-950" name="ic:twotone-keyboard-arrow-up" />
                <Icon v-else class="text-teal-950" name="ic:twotone-keyboard-arrow-down" />
                <p v-if="showMerchantContactInfo" class="text-xs">Close Contact info</p>
                <p v-else class="text-xs">Show Contact info</p>
            </button>

        </div>

        <div v-if="showMerchantContactInfo"
            class="border flex flex-col gap-y-5 border-gray-300 rounded-md mt-5 px-5 py-3">
            <div class="flex items-center justify-between">
                <div class="d-flex gap-x-3 items-center ">
                    <Icon name="material-symbols:call-outline" />
                    <p class="font-medium">+233 553410199</p>
                </div>
                <el-button type="warning" circle>
                    <Icon class="text-teal-950" name="mdi:content-copy" />
                </el-button>
            </div>
            <div class="flex items-center justify-between">
                <div class="d-flex gap-x-3 items-center ">
                    <Icon name="tdesign:location-1" />
                    <p class="font-medium">Dome Pillar 2 K.boat</p>
                </div>
                <!-- <el-button type="warning" circle><Icon class="text-teal-950" name="mdi:content-copy"/></el-button> -->
            </div>
        </div>

        <div class=" sm:hidden flex">
            <MazBtn color="warning" size="sm" @click="drawer = true" rounded class="w-full mt-5">
                Make payments
            </MazBtn>

            <!-- Drawer for payment form on mobile -->
            <MazBottomSheet v-model="drawer" :noClose="true" :noPadding="false" cl>
                <div class="h-screen">
                    <div class="h-full overflow-y-auto py-10">
                        <div class="flex justify-between items-center mb-5">
                            <p class="text-gray-500">Payment form</p>
                            <MazBtn  @click="drawer = false"  color="transparent">
                                <Icon name="ic:sharp-close" />
                            </MazBtn>

                        </div>
                        <!-- content here -->
                        <PaymentLinkPaymentForm :paymentOptions="paymentOptions!" :countries="countries" />

                    </div>
                </div>


            </MazBottomSheet>

        </div>

    </div>
</template>
<script setup lang="ts">
import type { PaymentMethods } from '~/types';


// ** toggle merchant ** //
const showMerchantContactInfo = ref(true)
const drawer = ref(false)

const props = defineProps<{
    paymentOptions: PaymentMethods
    countries: any[]
}>()

function toggleContactInfo() {
    showMerchantContactInfo.value = !showMerchantContactInfo.value
}



</script>
<style></style>