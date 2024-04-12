<template>

    <div class="flex lg:flex-row flex-col justify-center md:space-x-4 h-full">
        <div
            class="lg:w-[50%] w-full lg:h-screen h-fit bg-gray-50 rounded-md flex lg:justify-end justify-center lg:p-10">
            <div class="lg:w-[60%] w-full">
                <InvoicePaymentinfo />
            </div>

        </div>

        <!-- Campaign Info -->
        <div class=" lg:w-[50%] w-fullflex lg:justify-start justify-center lg:p-10">
            <div class=" lg:w-[60%] w-full flex justify-center lg:px-1 md:px-20 px-2 lg:py-0 py-5">
                <InvoicePaymentForm :paymentOptions="paymentOptions!" :countries="cty_abbr" />
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
    background-color: #04383F;
}
</style>