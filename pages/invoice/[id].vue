<template>
  <div class="w-full flex flex-col lg:px-20 lg:py-2 section lg:bg-white bg-gray-100">
    <!-- Campaign Info & Payment -->
    <div class="flex flex-row justify-center md:space-x-4">
      <div class="lg:max-w-lg md:max-w-xl  w-full bg-gray-100 lg:p-5 md:p-5 pb-32 p-2 rounded-md ">
        <!-- Campaign Info -->
        <InvoicePaymentinfo :merchant="merchant?.data!" :invoice="invoice" :contries="cty_abbr" :payment-options="paymentOptions!"  />
      </div>

      <!-- Campaign Info -->
      <div class=" lg:max-w-md  w-full p-5 hidden lg:block">
        <InvoicePaymentForm :paymentOptions="paymentOptions!" :countries="cty_abbr" />
      </div>
    </div>

    <div class="sm:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white p-4 shadow-lg">
      <!-- Donate  -->


      <MazBtn @click="toggleSheet" color="warning" size="sm" class="w-full">
        Pay Invoice {{ invoice?.total }}
      </MazBtn>

      <!-- Drawer for payment form on mobile -->
      <MazBottomSheet v-model="drawer" :no-close="true" >
        <div class="h-screen">
          <div class="h-full overflow-y-auto py-10">

            <div class="flex justify-between items-center">
              <p class="text-gray-600">Payment form</p>
              <MazBtn @click="toggleSheet" color="transparent">
                <icon name="ic:sharp-close"/>
              </MazBtn>

            </div>
            <!-- content here -->
            <InvoicePaymentForm :paymentOptions="paymentOptions!" :countries="cty_abbr" />
          </div>
        </div>
  
      </MazBottomSheet>


      <!-- pledge -->
      <!-- <button type="button"
        class="flex-1 border border-teal-900 px-4 flex flex-row py-2 justify-center items-center gap-x-3 rounded-full hover:bg-teal-900 hover:text-white text-teal-900">
        <p class="font-medium">I Pledge</p>
        <Icon name="majesticons:money-hand" size="25" />
      </button> -->
    </div>
  </div>
</template>


<script setup lang="ts">
import { usePaymentOptions } from '~/store/payment_options'
import { useInvoiceStore } from '~/store/invoice'
const paymentOptiosnStore = usePaymentOptions()
const invoiceStore = useInvoiceStore()
const { paymentOptions } = storeToRefs(paymentOptiosnStore)
const { invoice, merchant } = storeToRefs(invoiceStore)
import { supportedCountries } from '~/assets/data';

// get payemnt method options
onMounted(() => {
    paymentOptiosnStore.getPaymentMethod(invoice.value?.currency!)
    invoiceStore.invoicePaymentForm.currency = invoice.value?.currency!
    invoiceStore.invoicePaymentForm.amount = invoice.value?.total!
    getCountriesAsync()

})

// data
let cty_abbr = ['GH']
const drawer = ref(false)


// methods
function getCountriesAsync() {
    cty_abbr = supportedCountries.map(
        (country: { abbreviation: string }) => {
            return country.abbreviation
        }
    )
}

function toggleSheet(){
  drawer.value = ! drawer.value

}

definePageMeta({
  layout: 'campaign-layout',
  middleware: ['verify-invoice-link']
})
</script>
<style>
  
</style>