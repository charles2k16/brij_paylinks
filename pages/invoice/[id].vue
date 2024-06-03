<template>
  <!-- commet -->
  <div
    class="flex flex-col w-full min-h-screen bg-gray-100 lg:px-20 lg:py-2 lg:bg-white dark:bg-gray-950">
    <div class="flex flex-row justify-center md:space-x-4 section">
      <div class="w-full p-2 pb-32 bg-gray-100 rounded-md lg:max-w-lg md:max-w-xl dark:bg-gray-900 lg:p-5 md:p-5">
        <!-- Invoice Info -->
        <!-- <InvoicePaymentInfo :merchant="merchant!" :invoice="invoice" :countries="cty_abbr" /> -->
        <InvoiceInfo :merchant="merchant!" :invoice="invoice" :countries="cty_abbr" />
      </div>
      
      <!-- Invoice Form -->
      <div class="hidden w-full p-5 rounded-md lg:max-w-md h-fit lg:block ring-2 ring-slate-100 dark:ring-slate-800">
        <!-- content here -->

        <PaymentForm
          :payment-methods="paymentMethods || []"
          :paymentCode="invoice?.payment_code!"
          :is-payment-method-data-loading="isPaymentMethodDataLoading"
          :route-name="routeName"
          :countries="cty_abbr"
          :merchant="merchant!"
          :payment-link-template="null!"
          :default-values="defaultValues"
          :invoice="invoice!"
          @on-currency-change="handleCurrencyChange" />
      </div>
    </div>

    <div
      class="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-white shadow-lg lg:hidden gap-x-2 dark:bg-gray-950">
      <!-- Pay  -->

      <MazBtn @click="toggleSheet" color="warning" size="sm" class="w-full">
        Pay Invoice {{ invoice?.total }}
      </MazBtn>

      <!-- isBottomSheetShow for payment form on mobile -->
      <MazBottomSheet v-model="isBottomSheetShow" :no-close="true">
        <div class="max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-end mb-2">
              <MazBtn @click="toggleSheet" color="transparent">
                <icon name="ic:sharp-close" />
              </MazBtn>
            </div>
            <!-- content here -->
              <PaymentForm
              :payment-methods="paymentMethods || []"
              :paymentCode="invoice?.payment_code!"
              :is-payment-method-data-loading="isPaymentMethodDataLoading"
              :route-name="routeName"
              :countries="cty_abbr"
              :merchant="merchant!"
              :payment-link-template="null!"
              :default-values="defaultValues"
              :invoice="invoice!"
              @on-currency-change="handleCurrencyChange" />
        </div>
        <!-- <div class="h-screen">
          <div class="h-full py-16 overflow-y-auto">
   
          </div>
        </div> -->
      </MazBottomSheet>

      <!-- pledge -->
      <!-- <button type="button"
        class="flex flex-row items-center justify-center flex-1 px-4 py-2 text-teal-900 border border-teal-900 rounded-full gap-x-3 hover:bg-teal-900 hover:text-white">
        <p class="font-medium">I Pledge</p>
        <Icon name="majesticons:money-hand" size="25" />
      </button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInvoiceStore } from '~/store/invoice';
import { usePaymentForm } from '~/store/payment_forms';

import { supportedCountries } from '~/assets/data';
import usePaymentMethods from '~/composables/usePaymentMethods';
import type { PaymentDefaultValues } from '~/types';

const { getPaymentMethod, paymentMethods, isPaymentMethodDataLoading } =
  usePaymentMethods();

const invoiceStore = useInvoiceStore();
const paymentForm = usePaymentForm();

const { invoice, merchant } = storeToRefs(invoiceStore);
const { general_form_data } = storeToRefs(paymentForm);
const route = useRoute();

// get payemnt method options
onMounted(() => {
  console.log(invoice.value?.payment_code);
  console.log(route.path);
  // get route name
  routeName.value = route.matched[0].name?.toString()!;
  // get pay methods
  getPaymentMethod(invoice.value?.currency!);

  //  assign currency and total to store
  general_form_data.value.currency = invoice.value?.currency!;
  general_form_data.value.amount = invoice.value?.total!;
  defaultValues.value.isDefault = true;

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

const defaultValues = ref<PaymentDefaultValues>({
  isDefault: false,
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
