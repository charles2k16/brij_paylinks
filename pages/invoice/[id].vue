<template>

    <div class="flex lg:flex-row flex-col justify-center md:space-x-4 h-full">
        <div
            class="lg:w-[50%] w-full lg:h-screen h-fit bg-gray-50 rounded-md flex lg:justify-end justify-center">
            <div class="lg:max-w-md w-full lg:pt-20  lg:pr-20 py-5 px-5">
                <InvoicePaymentinfo />
            </div>

        </div>
      </div>
      <span class="text-2xl font-medium mt-3 lg:text-start text-center"
        >Bloom Impact Limited</span
      >
      <p class="text-slate-400 lg:text-start text-center">Internet Service</p>

        <!-- Campaign Info -->
        <div class=" lg:w-[50%] w-full flex lg:justify-start justify-center">
            <div class=" lg:max-w-lg w-full flex justify-center lg:pt-20  lg:pl-20 py-5 px-5">
                <InvoicePaymentForm :paymentOptions="paymentOptions!" :countries="cty_abbr" />
            </div>
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

</script>

<style lang="scss">
.primary-custom-bg-color {
  background-color: #04383f;
}
</style>
