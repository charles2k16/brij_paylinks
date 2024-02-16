<template>
    <div class="flex w-full flex-col">
        <p class="font-bold text-gray-500">Choose Payment Method</p>

        <!-- options -->
        <div class="flex flex-row gap-x-2 mt-5">
            <div v-for="(option, index) in paymentOptions" :key="index" @click="activePaymentOption = option.value"
                :class="{ 'border-teal-900 border-2': activePaymentOption === option.value, 'border-gray-300': activePaymentOption !== option.value }"
                class="flex w-1/3 flex-col items-center justify-center border rounded-lg py-3 px-2 cursor-pointer">
                <input :id="option.value" type="radio" :value="option.value" v-model="activePaymentOption" class="hidden" />
                <label :for="option.value" class="sr-only">{{ option.name }}</label>
                <img :src="option.image" alt="" class="h-10 w-10 rounded-full" />
                <p class="mt-2 text-sm text-center font-bold text-gray-900">{{ option.name }}</p>
            </div>
        </div>

        <!-- continue & cancel button -->
        <div class="dialog-footer">
            <button type="button"
                class="flex-1 secondary-custom-bg-color w-full mt-5  px-4 flex flex-row py-2 flex-nowrap justify-center items-center gap-x-3 rounded-full  text-teal-900 ">
                <p class="font-medium">Continue</p>
            </button>
        </div>
    </div>
</template>
<script setup lang="ts">
const radio1 = ref('1')


// active payment option
const activePaymentOption = ref('')

// payment options
const paymentOptions = reactive([
    {
        name: "MTN Mobile Money",
        image: "https://imgs.search.brave.com/woVzadMjICQDcsOaPYTVCqZ6SnCHeL36W_2lqOemgRM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMueWVuLmNvbS5n/aC9pbWFnZXMvMWIy/M2IwMTQ5ZjViMDMw/OS5qcGc_aW13aWR0/aD05MDA",
        value: "credit-card",
    },
    {
        name: "Vodafone Cash GH",
        image: "https://imgs.search.brave.com/4RCDJmh_BfcACrQtnpDRiy6eN9CPkU0NGzz7J64_C3U/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zaWdh/Lmdvdi5naC93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMC8wNy9W/b2RhZm9uZS0xLmpw/Zw",
        value: "paypal",
    },
    {
        name: "AirtelTigo Cash GH",
        image: "https://imgs.search.brave.com/UhHZyPLEa2bnphCk42NPQT2mzrZ1731s8SdGOSgC7JM/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbGF5/LWxoLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS95WkZPaFR2bmxi/MlBseTgybDhiWHVz/QTNPQWhZb3BsYTk3/NTBOY3FzanFjVU5B/ZDRhY3VvaENUQWxx/SFI5X2JLcnFFPXMy/NTYtcnc",
        value: "apple-pay",
    },
])
</script>
<style scoped>
.secondary-custom-bg-color {
    background-color: #F9AB10;
}

.secondary-custom-bg-color:hover {
    background-color: #f0af2c;
}
</style>