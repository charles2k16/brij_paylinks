<template>
  <div class="w-full flex flex-col bg-slate-100">
    <div class="flex lg:flex-row flex-col justify-center md:space-x-4 h-full lg:mt-10">
      <div class="lg:w-[50%] w-full h-screen rounded-md flex justify-end ">
        <div class="lg:max-w-md md:max-w-2xl w-full flex justify-center lg:m-0 md:m-0 m-3 h-fit">
          <PaymentLinkMerchantInfo :merchant="merchant!" />
        </div>
      </div>

      <!-- Campaign Info -->
      <div class="lg:w-[50%] w-full hidden lg:block pt-5 lg:pt-0">
        <div class="lg:max-w-md md:max-w-2xl w-full bg-white p-10 rounded-md">
          <PaymentForm  :payment-methods="paymentMethods!" :paymentCode="paymentCode" :is-payent-methods-loading="isPaymentMethodDataLoading" :route-name="routeName"  :payment-link="route.params.id"
              :countries="cty_abbr" :merchant="merchant!" :default-values="defaultValues"  :payment-link-template-link="paymentLinktemplate!" @on-currency-change="handleCurrencyChange" />
        </div>
      </div>
    </div>

    <div
      class="lg:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white p-4 shadow-lg">
      <!-- Pay  -->
      <MazBtn color="warning" size="sm" @click="isbottomSheetShow = true" rounded class="w-full mt-5">
        Make payments {{paymentLinktemplate?.amount}}
      </MazBtn>

      <!-- isbottomSheetShow for payment form on mobile -->
      <MazBottomSheet class="" v-model="isbottomSheetShow" :noClose="true" noPadding cl>
        <div class="h-screen w-full">
          <div class="h-full overflow-y-auto py-10">
            <div class="flex justify-end items-center mb-2">
              <MazBtn @click="isbottomSheetShow = false" color="transparent">
                <Icon name="ic:sharp-close" />
              </MazBtn>
            </div>
            <!-- content here -->
            <PaymentForm  :payment-methods="paymentMethods!" :paymentCode="paymentCode" :is-payent-methods-loading="isPaymentMethodDataLoading" :route-name="routeName"  :payment-link="route.params.id"
              :countries="cty_abbr" :merchant="merchant!" :default-values="defaultValues" :payment-link-template-link="paymentLinktemplate!" @on-currency-change="handleCurrencyChange"/>
          </div>
        </div>
      </MazBottomSheet>
    </div>

  </div>
</template>
<script setup lang="ts">
import { usePaymentLinkStore } from '~/store/payment_links';
import { supportedCountries } from '~/assets/data';
import usePaymentMethods from '~/composables/usePaymentMethods'
import type { PaymentDefaultValues } from '~/types';
const route = useRoute();
const paymentLinkStore = usePaymentLinkStore();
const { merchant, paymentLinktemplate} = storeToRefs(paymentLinkStore);
const { $api } = useNuxtApp();
const { getPaymentMethod, paymentMethods, isPaymentMethodDataLoading } = usePaymentMethods()


// data
let cty_abbr = ['GH'];

// bottom sheet on small screen
const isbottomSheetShow = ref(false)


// onmounted
onMounted(() => {
  // get pay methods
  getPaymentMethod('GHS');

  // get the route name
  console.log(route.matched[0].name )
  routeName.value = route.matched[0].name?.toString()!
  console.log(route.params.id)
   paymentCode.value = route.params.id.toString()
  if (route.query.payment_template_link) {
    console.log(route.query.payment_template_link)
    const payment_link = route.query.payment_template_link;
    getPaymentLinkTemplateInfo(payment_link?.toString()!);
  }
  getCountriesAsync();
});

// stores route name and determine which payload to use for the payment form
const routeName = ref('')

const paymentCode = ref('')

// methods
function getCountriesAsync() {
  cty_abbr = supportedCountries.map((country: { abbreviation: string }) => {
    return country.abbreviation;
  });
}

function handleCurrencyChange(val:any){
  console.log(val)
  getPaymentMethod(val);
}

// check and get payment link template info

async function getPaymentLinkTemplateInfo(template_link: string) {
  console.log(template_link)
  try {
    const res = await $api.paymentlinkTemplate.getPaymentLinksTemplate(template_link);
    paymentLinkStore.paymentLinktemplate = res.data;
    paymentLinkStore.invoicePaymentForm.amount = res.data.amount.toString();
    paymentLinkStore.invoicePaymentForm.currency = res.data.currency.toString();
    paymentLinkStore.isPaymentLinktemplate = true;
  } catch (error: any) {
    console.log(error);
  }
}


// default values
const defaultValues = ref<PaymentDefaultValues>({
  currency: paymentLinktemplate.value?.currency!,
  total: paymentLinktemplate.value?.amount.toString()!,
  isDefualt:true
})

definePageMeta({
  // layout: 'campaign-layout',
  middleware: ['verify-paymentlink-link'],
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
