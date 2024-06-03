<template>
  <!-- commet -->
  <div
    class="w-full flex flex-col lg:px-20 lg:py-2 lg:bg-white dark:bg-gray-950 bg-gray-100 min-h-screen">
    <div class="flex flex-row justify-center md:space-x-4 section">
      <div
        class="lg:max-w-lg md:max-w-xl w-full bg-gray-100 dark:bg-gray-900 lg:p-5 md:p-5 pb-32 p-2 rounded-md">
        <InvoiceInfo :merchant="merchant!" :invoice="invoice" :countries="cty_abbr" />
      </div>

      <div
        class="lg:max-w-md w-full h-fit p-5 hidden lg:block ring-2 ring-slate-100 dark:ring-slate-800 rounded-md">
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
      class="lg:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white dark:bg-gray-950 p-4 shadow-lg">
      <MazBtn @click="toggleSheet" color="warning" size="sm" class="w-full">
        Pay Invoice {{ invoice?.total }}
      </MazBtn>

      <MazBottomSheet v-model="isBottomSheetShow" :no-close="true">
        <div class="max-h-[90vh] overflow-y-auto">
          <div class="flex justify-end items-center mb-2">
            <MazBtn @click="toggleSheet" color="transparent">
              <icon name="ic:sharp-close" />
            </MazBtn>
          </div>

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
      </MazBottomSheet>
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

onMounted(() => {
  routeName.value = route.matched[0].name?.toString()!;

  getPaymentMethod(invoice.value?.currency!);

  general_form_data.value.currency = invoice.value?.currency!;
  general_form_data.value.amount = invoice.value?.total!;
  defaultValues.value.isDefault = true;

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
