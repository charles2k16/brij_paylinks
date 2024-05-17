<template>
  <div class="w-full flex flex-col lg:px-20 lg:py-2  lg:bg-white dark:bg-gray-950  bg-gray-100 min-h-screen">
    <!-- Campaign Info & Payment -->
    <div class="flex flex-row justify-center md:space-x-4 section">
      <div class="lg:max-w-lg md:max-w-xl w-full bg-gray-100 dark:bg-gray-900 lg:p-5 md:p-5 pb-32 p-2 rounded-md">
        <!-- Campaign Info -->
        <InvoicePaymentInfo :merchant="merchant!" :invoice="invoice" :countries="cty_abbr" />
      </div>

      <!-- Campaign Info -->
      <div class="lg:max-w-md w-full h-fit p-5 hidden lg:block ring-2 ring-slate-100 dark:ring-slate-800 rounded-md">
        <!-- content here -->
        <PaymentForm :payment-methods="paymentMethods || []" :paymentCode="invoice?.payment_code"
          :is-payment-methods-loading="isPaymentMethodDataLoading" :invoice="invoice!" :route-name="routeName"
          :payment-link="route.params.id" :countries="cty_abbr" :merchant="merchant!" :default-values="defaultValues"
          :payment-link-template-link="undefined" @on-currency-change="handleCurrencyChange" />
      </div>
    </div>

    <div
      class="lg:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white dark:bg-gray-950  p-4 shadow-lg">
      <!-- Donate  -->

      <MazBtn @click="toggleSheet" color="warning" size="sm" class="w-full">
        Pay Invoice {{ invoice?.total }}
      </MazBtn>

      <!-- isBottomSheetShow for payment form on mobile -->
      <MazBottomSheet v-model="isBottomSheetShow" :no-close="true">
        <div class="h-screen">
          <div class="h-full overflow-y-auto py-10">
            <div class="flex justify-end items-center mt-8">
              <MazBtn @click="toggleSheet" color="transparent">
                <icon name="ic:sharp-close" />
              </MazBtn>
            </div>
            <!-- content here -->
            <PaymentForm :payment-methods="paymentMethods || []" :paymentCode="invoice?.payment_code"
              :is-payment-methods-loading="isPaymentMethodDataLoading" :invoice="invoice!"  :route-name="routeName"
              :payment-link="route.params.id" :countries="cty_abbr" :merchant="merchant!"
              :default-values="defaultValues" :payment-link-template-link="undefined"
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
import { useInvoiceStore } from '~/store/invoice';
const invoiceStore = useInvoiceStore();
const { invoice, merchant } = storeToRefs(invoiceStore);
import { supportedCountries } from '~/assets/data';
import usePaymentMethods from '~/composables/usePaymentMethods';
import type { PaymentDefaultValues } from '~/types';

const { getPaymentMethod, paymentMethods, isPaymentMethodDataLoading } =
  usePaymentMethods();
const route = useRoute();

// get payemnt method options
onMounted(() => {
  console.log(invoice.value?.payment_code)
  console.log(route.path)
  // get route name
  routeName.value = route.matched[0].name?.toString()!;
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
const isBottomSheetShow = ref(false);

// stores route name and determine which payload to use for the payment form
const routeName = ref('');

// methods
function getCountriesAsync() {
  cty_abbr = supportedCountries.map((country: { abbreviation: string }) => {
    return country.abbreviation;
  });
}

// toggle sheet
function toggleSheet() {
  isBottomSheetShow.value = !isBottomSheetShow.value;
}

// is there default values
const isDefaultValues = ref(false);

const defaultValues = ref<PaymentDefaultValues>({
  currency: invoice.value?.currency!,
  total: invoice.value?.total!,
  isDefault: true,
});

function handleCurrencyChange(val: any) {
  getPaymentMethod(val);
}

definePageMeta({
  layout: 'campaign-layout',
  middleware: ['verify-invoice-link'],
});
</script>
<style></style>
