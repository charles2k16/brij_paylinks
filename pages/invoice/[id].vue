<template>
  <div class="w-full flex flex-col lg:px-20 lg:py-2 section lg:bg-white bg-gray-100">
    <!-- Campaign Info & Payment -->
    <div class="flex flex-row justify-center md:space-x-4">
      <div class="lg:max-w-lg md:max-w-xl w-full bg-gray-100 lg:p-5 md:p-5 pb-32 p-2 rounded-md">
        <!-- Campaign Info -->
        <InvoicePaymentinfo :merchant="merchant!" :invoice="invoice" :contries="cty_abbr"
          :payment-options="paymentOptions!" />
      </div>

      <!-- Campaign Info -->
      <div class="lg:max-w-md w-full p-5 hidden lg:block">
        <!-- content here -->
        <PaymentForm :payment-methods="paymentMethods!" :paymentCode="invoice?.payment_code"
          :is-payent-methods-loading="isPaymentMethodDataLoading" :route-name="routeName"
          :countries="cty_abbr" :merchant="merchant!" :default-values="defaultValues"
          @on-currency-change="handleCurrencyChange" />
      </div>
    </div>

    <div
      class="lg:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white p-4 shadow-lg">
      <!-- Donate  -->

      <MazBtn @click="toggleSheet" color="warning" size="sm" class="w-full">
        Pay Invoice {{ invoice?.total }}
      </MazBtn>

      <!-- isbottomSheetShow for payment form on mobile -->
      <MazBottomSheet v-model="isbottomSheetShow" :no-close="true">
        <div class="h-screen">
          <div class="h-full overflow-y-auto py-10">
            <div class="flex justify-end items-center">
              <MazBtn @click="toggleSheet" color="transparent">
                <icon name="ic:sharp-close" />
              </MazBtn>
            </div>
            <!-- content here -->
            <PaymentForm :payment-methods="paymentMethods!" :paymentCode="invoice?.payment_code"
          :is-payent-methods-loading="isPaymentMethodDataLoading" :route-name="routeName"
          :countries="cty_abbr" :merchant="merchant!" :default-values="defaultValues"
          @on-currency-change="handleCurrencyChange" />
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
import { usePaymentOptions } from '~/store/payment_options';
import { useInvoiceStore } from '~/store/invoice';
const paymentOptiosnStore = usePaymentOptions();
const invoiceStore = useInvoiceStore();
const { paymentOptions } = storeToRefs(paymentOptiosnStore);
const { invoice, merchant } = storeToRefs(invoiceStore);
import { supportedCountries } from '~/assets/data';
import usePaymentMethods from '~/composables/usePaymentMethods'
import type { PaymentDefaultValues } from '~/types';

const { getPaymentMethod, paymentMethods, isPaymentMethodDataLoading } = usePaymentMethods()
const route = useRoute();


// get payemnt method options
onMounted(() => {
  // get route name
  routeName.value = route.matched[0].name?.toString()!
  // get pay methods
  getPaymentMethod(invoice.value?.currency!);

  isDefaultValues.value = true;

  //  assign currency and total to store
  invoiceStore.invoicePaymentForm.currency = invoice.value?.currency!;
  invoiceStore.invoicePaymentForm.amount = invoice.value?.total!;

  // get countries
  getCountriesAsync();
});

// data
let cty_abbr = ['GH'];
const isbottomSheetShow = ref(false);

// stores route name and determine which payload to use for the payment form
const routeName = ref('')

// methods
function getCountriesAsync() {
  cty_abbr = supportedCountries.map((country: { abbreviation: string }) => {
    return country.abbreviation;
  });
}

// toggle sheet
function toggleSheet() {
  isbottomSheetShow.value = !isbottomSheetShow.value;
}

// is there default values
const isDefaultValues = ref(false)

const defaultValues = ref<PaymentDefaultValues>({
  currency: invoice.value?.currency!,
  total: invoice.value?.total!,
  isDefualt:true

})


function handleCurrencyChange(val:any){
  console.log(val)
  getPaymentMethod(val);
}



definePageMeta({
  layout: 'campaign-layout',
  middleware: ['verify-invoice-link'],
});
</script>
<style></style>
