<template>
  <div class="w-full bg-slate-100 dark:bg-gray-950  min-h-screen">
    <div class="w-full flex flex-col section h-screen">
    <div class="flex lg:flex-row flex-col justify-center md:space-x-4 h-full lg:mt-10">
      <div class="lg:w-[50%] w-full h-fit rounded-md flex lg:justify-end justify-center">
        <div class="lg:max-w-md md:max-w-2xl w-full flex justify-center lg:m-0 md:m-0 m-3">
          <PaymentLinkMerchantInfo :merchant="merchant!" />
        </div>
      </div>

      <div class="lg:w-[50%] w-full hidden lg:block pt-5 lg:pt-0">
        <div class="lg:max-w-md md:max-w-2xl w-full ring-2 ring-slate-100 dark:ring-slate-800 bg-white dark:bg-transparent p-5 rounded-md">
          <PaymentForm  :payment-methods=" paymentMethods || []" :paymentCode="paymentCode" :is-payment-methods-loading="isPaymentMethodDataLoading" :route-name="routeName"  :payment-link="route.params.id"
              :countries="cty_abbr" :merchant="merchant!"  :default-values="defaultValues"  :payment-link-template-link="paymentLinkTemplate!" @on-currency-change="handleCurrencyChange" />
        </div>
      </div>
    </div>

    <div
      class="lg:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white dark:bg-gray-950 p-4 shadow-lg">
      <!-- Pay  -->
      <MazBtn color="warning" size="sm" @click="isBottomSheetShow = true" rounded class="w-full mt-5">
        Make payments {{paymentLinkTemplate?.amount}}
      </MazBtn>

      <MazBottomSheet v-model="isBottomSheetShow" :noClose="true" noPadding cl>
        <div class="h-screen w-full">
          <div class="h-full overflow-y-auto py-10">
            <div class="flex justify-end items-center mb-2">
              <MazBtn @click="isBottomSheetShow = false" color="transparent">
                <Icon name="ic:sharp-close" />
              </MazBtn>
            </div>

            <PaymentForm
              :payment-methods="paymentMethods || []"
              :paymentCode="paymentCode"
              :is-payment-methods-loading="isPaymentMethodDataLoading"
              :route-name="routeName"
              :payment-link="route.params.id"
              :countries="cty_abbr"
              :merchant="merchant!"
              :default-values="defaultValues"
              :payment-link-template-link="paymentLinkTemplate!"
              @on-currency-change="handleCurrencyChange" />
          </div>
        </div>
      </MazBottomSheet>
    </div>
  </div>
  </div>

</template>

<script setup lang="ts">
import { usePaymentLinkStore } from '~/store/payment_links';
import { supportedCountries } from '~/assets/data';
import usePaymentMethods from '~/composables/usePaymentMethods';
import type { PaymentDefaultValues } from '~/types';
const route = useRoute();
const paymentLinkStore = usePaymentLinkStore();
const { merchant, paymentLinkTemplate } = storeToRefs(paymentLinkStore);
const { $api } = useNuxtApp();
const { getPaymentMethod, paymentMethods, isPaymentMethodDataLoading } =
  usePaymentMethods();

let cty_abbr = ['GH'];

const isBottomSheetShow = ref(false);

onMounted(() => {
  getPaymentMethod('GHS');
  console.log(defaultValues.value)
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
    paymentLinkStore.paymentLinkTemplate = res.data;
    paymentLinkStore.invoicePaymentForm.amount = res.data.amount.toString();
    paymentLinkStore.invoicePaymentForm.currency = res.data.currency.toString();
    paymentLinkStore.isPaymentLinkTemplate = true;
  } catch (error: any) {
    console.log(error);
  }
}

const defaultValues = ref<PaymentDefaultValues>({
  currency: paymentLinkTemplate.value?.currency!,
  total: paymentLinkTemplate.value?.amount.toString()!,
  isDefault: true,
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
