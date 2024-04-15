<template>
<<<<<<< HEAD
  <div class="flex lg:flex-row flex-col w-full justify-center">
    <div
      class="w-full lg:w-[50%] lg:h-lvh h-fit bg-gray-50 lg:p-10 p-5 flex flex-col lg:px-32">
      <div class="flex w-full lg:justify-start justify-center">
        <div
          class="primary-custom-bg-color text-white p-5 rounded-md flex justify-center w-20 h-20 lg:w-full lg:h-52 items-center">
          <img src="/img/logo-dark.png" alt="logo" class="w-fit" />
=======

    <div class="flex lg:flex-row flex-col justify-center md:space-x-4 h-full">
        <div class="lg:w-[50%] w-full lg:h-screen h-fit bg-gray-50 rounded-md flex lg:justify-end justify-center">
            <div class="lg:max-w-md w-full lg:pt-20  lg:pr-20 py-5 px-5">
                <InvoicePaymentinfo />
            </div>

>>>>>>> 2350856403cea33a015ae703c5fce22ab8144bc1
        </div>
      </div>
      <span class="text-2xl font-medium mt-3 lg:text-start text-center"
        >Bloom Impact Limited</span
      >
      <p class="text-slate-400 lg:text-start text-center">Internet Service</p>

<<<<<<< HEAD
      <!-- toggle contact btn -->
      <div class="flex justify-center">
        <button
          type="button"
          @click="toggleContactInfo"
          class="sm:hidden flex mt-3 gap-x-2 items-center border border-gray-300 w-fit px-2 py-1 rounded-full">
          <Icon
            v-if="showMerchantContactInfo"
            class="text-teal-950"
            name="ic:twotone-keyboard-arrow-up" />
          <Icon v-else class="text-teal-950" name="ic:twotone-keyboard-arrow-down" />
          <p v-if="showMerchantContactInfo" class="text-xs">Close Contact info</p>
          <p v-else class="text-xs">Show Contact info</p>
        </button>
      </div>

      <div
        v-if="showMerchantContactInfo"
        class="border flex flex-col gap-y-5 border-gray-300 rounded-md mt-5 px-5 py-3">
        <div class="flex items-center justify-between">
          <div class="d-flex gap-x-3 items-center">
            <Icon name="material-symbols:call-outline" />
            <p class="font-medium">+233 553410199</p>
          </div>
          <el-button type="warning" circle>
            <Icon class="text-teal-950" name="mdi:content-copy" />
          </el-button>
=======
        <!-- Campaign Info -->
        <div class=" lg:w-[50%] w-full flex lg:justify-start justify-center">
            <div class=" lg:max-w-lg w-full flex justify-center lg:pt-20  lg:pl-20 py-5 px-5">
                <InvoicePaymentForm :paymentOptions="paymentOptions!" :countries="cty_abbr" />
            </div>
>>>>>>> 2350856403cea33a015ae703c5fce22ab8144bc1
        </div>
        <div class="flex items-center justify-between">
          <div class="d-flex gap-x-3 items-center">
            <Icon name="tdesign:location-1" />
            <p class="font-medium">Dome Pillar 2 K.boat</p>
          </div>
          <!-- <el-button type="warning" circle><Icon class="text-teal-950" name="mdi:content-copy"/></el-button> -->
        </div>
      </div>
    </div>

<<<<<<< HEAD
    <div class="w-full lg:w-[50%] overflow-scroll">
      <div
        class="w-full lg:h-lvh h-fit lg:py-5 py-5 flex flex-col justify-between lg:px-28 px-5">
        <div class="flex flex-col">
          <span class="text-2xl font-medium mt-3 text-start">Make payment</span>
          <p class="text-slate-400 text-start">
            Enter amount to pay and select payment method
          </p>
          <!-- forms -->
          <InvoicePaymentForm />
        </div>

        <!-- footer links -->
        <div class="flex justify-between mt-5">
          <a href="">Contact Us</a>
          <a href="">Terms of use</a>
          <a href="">Privacy Policy</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// ** toggle merchant ** //
const showMerchantContactInfo = ref(true);
function toggleContactInfo() {
  showMerchantContactInfo.value = !showMerchantContactInfo.value;
}
=======

</template>

<script setup lang="ts">
import { usePaymentOptions } from '~/store/payment_options'
const paymentOptiosnStore = usePaymentOptions()
const { paymentOptions } = storeToRefs(paymentOptiosnStore)
import { supportedCountries } from '~/assets/data';

// get payemnt method options
onMounted(() => {
    paymentOptiosnStore.getPaymentMethod('GHS')
    getCountriesAsync()

})

// data
let cty_abbr = ['GH']


// methods
function getCountriesAsync() {
    cty_abbr = supportedCountries.map(
        (country: { abbreviation: string }) => {
            return country.abbreviation
        }
    )
}

>>>>>>> 2350856403cea33a015ae703c5fce22ab8144bc1
</script>

<style lang="scss">
.primary-custom-bg-color {
  background-color: #04383f;
}
</style>
