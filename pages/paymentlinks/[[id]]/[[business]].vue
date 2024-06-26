<template>
  <div class="w-full min-h-screen bg-slate-100 dark:bg-gray-950">
    <div class="flex flex-col w-full h-screen section">
      <div class="flex flex-col justify-center h-full lg:flex-row md:space-x-4 lg:mt-10">
        <div
          class="lg:w-[50%] w-full h-fit rounded-md flex lg:justify-end justify-center">
          <div
            class="flex justify-center w-full m-3 lg:max-w-md md:max-w-2xl lg:m-0 md:m-0">
            <MerchantInfo :merchant="merchant!" />
          </div>
        </div>
        <div class="lg:w-[50%] w-full hidden lg:block pt-5 lg:pt-0">
          <div
            class="w-full p-5 bg-white rounded-md lg:max-w-md md:max-w-2xl ring-2 ring-slate-100 dark:ring-slate-800 dark:bg-transparent">
            <PaymentForm
              :payment-methods="paymentMethods || []"
              :paymentCode="paymentCode"
              :is-payment-method-data-loading="isPaymentMethodDataLoading"
              :route-name="routeName"
              :countries="cty_abbr"
              :merchant="merchant!"
              :payment-link-template="paymentLinkTemplate!"
              :default-values="defaultValues"
              :invoice="null"
              @on-currency-change="handleCurrencyChange" />
          </div>
        </div>
      </div>

      <div
        class="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4 bg-white shadow-lg lg:hidden gap-x-2 dark:bg-gray-950">
        <!-- Pay  -->
        <MazBtn
          color="warning"
          size="sm"
          @click="isBottomSheetShow = true"
          rounded
          class="w-full mt-5">
          Make payments {{ paymentLinkTemplate?.amount }}
        </MazBtn>

        <MazBottomSheet v-model="isBottomSheetShow" :noClose="true">
          <div class="max-h-[90vh] overflow-y-auto">
            <div class="flex items-center justify-end mb-2">
              <MazBtn @click="isBottomSheetShow = false" color="transparent">
                <Icon name="ic:sharp-close" />
              </MazBtn>
            </div>

            <PaymentForm
              :payment-methods="paymentMethods || []"
              :paymentCode="paymentCode"
              :is-payment-method-data-loading="isPaymentMethodDataLoading"
              :route-name="routeName"
              :countries="cty_abbr"
              :merchant="merchant!"
              :payment-link-template="paymentLinkTemplate!"
              :default-values="defaultValues"
              :invoice="null"
              @on-currency-change="handleCurrencyChange" />
          </div>
        </MazBottomSheet>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePaymentLinkStore } from '~/store/payment_links';
import { usePaymentForm } from '~/store/payment_forms';
import { supportedCountries } from '~/assets/data';
import usePaymentMethods from '~/composables/usePaymentMethods';
import type { PaymentDefaultValues } from '~/types';
const route = useRoute();
const paymentLinkStore = usePaymentLinkStore();
const paymentForm = usePaymentForm();
const { merchant, paymentLinkTemplate } = storeToRefs(paymentLinkStore);
const { general_form_data } = storeToRefs(paymentForm);
const { $api } = useNuxtApp();
const { getPaymentMethod, paymentMethods, isPaymentMethodDataLoading } =
  usePaymentMethods();

let cty_abbr = ['GH'];

const isBottomSheetShow = ref(false);

onMounted(() => {
  getPaymentMethod('GHS');
  // console.log(defaultValues.value)
  routeName.value = route.matched[0].name?.toString()!;
  paymentCode.value = route.params.id.toString();
  if (route.query.payment_template_link) {
    const payment_link = route.query.payment_template_link;
    getPaymentLinkTemplateInfo(payment_link?.toString()!);
  }
  getCountriesAsync();
});

const routeName = ref('');
const paymentCode = ref('');

function getCountriesAsync() {
  cty_abbr = supportedCountries.map((country: { abbreviation: string }) => {
    return country.abbreviation;
  });
}

function handleCurrencyChange(val: any) {
  getPaymentMethod(val);
}

async function getPaymentLinkTemplateInfo(template_link: string) {
  try {
    const res = await $api.paymentLinkTemplate.getPaymentLinksTemplate(template_link);
    // assign payment-link-template
    paymentLinkStore.paymentLinkTemplate = res.data;

    // and then assign their default values to the form
    general_form_data.value.amount = res.data.amount.toString();
    general_form_data.value.currency = res.data.currency.toString();

    // this would be as a checker to display amount payment title
    paymentLinkStore.isPaymentLinkTemplate = true;

    // and then we will make isDefault trye
    defaultValues.value.isDefault = true;
  } catch (error: any) {
    console.log(error);
  }
}

const defaultValues = ref<PaymentDefaultValues>({
  isDefault: false,
});

definePageMeta({
  middleware: ['verify-payment-link-link'],
  layout: 'campaign-layout',
});
</script>

<style scoped>
.primary-custom-bg-color {
  background-color: #04383f;
}

.secondary-custom-bg-color {
  background-color: #f9ab10;
}

.secondary-custom-bg-color:hover {
  background-color: #f0af2c;
}

.button-font-weight {
  font-weight: 900;
}

.primary-custom-text-color {
  color: #04383f;
}
</style>
