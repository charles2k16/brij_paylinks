<template>
  <div class="w-full flex flex-col section">
    <div class="flex lg:flex-row flex-col justify-center md:space-x-4 h-full lg:mt-10">
      <div class="lg:w-[50%] w-full h-fit rounded-md flex justify-center">
        <div class="lg:max-w-md md:max-w-2xl w-full flex justify-center lg:m-0 md:m-0 m-3">
          <PaymentLinkMerchantInfo :merchant="merchant?.data" :paymentLink="route.params.id"
            :paymentOptions="paymentOptions!" :countries="cty_abbr" />
        </div>
      </div>

      <!-- Campaign Info -->
      <div class="lg:w-[50%] w-full hidden sm:block md:flex md:justify-center pt-5 lg:pt-0">
        <div class="lg:max-w-md md:max-w-2xl w-full">
          <PaymentLinkPaymentForm :paymentOptions="paymentOptions!" :paymentLink="route.params.id" :countries="cty_abbr"
            :merchant="merchant?.data" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { usePaymentOptions } from '~/store/payment_options';
import { usePaymentLinkStore } from '~/store/payment_links';
import { supportedCountries } from '~/assets/data';

const route = useRoute();
const paymentOptiosnStore = usePaymentOptions();
const paymentLinkStore = usePaymentLinkStore();
const { paymentOptions } = storeToRefs(paymentOptiosnStore);
const { merchant, isPaymentLinktemplate } = storeToRefs(paymentLinkStore);
const { $api } = useNuxtApp();

// data
let cty_abbr = ['GH'];

// onmounted
onMounted(() => {
  paymentOptiosnStore.getPaymentMethod('GHS');
  if (route.query) {
    const payment_link = route.query;
    getPaymentLinkTemplateInfo(payment_link.payment_template_link?.toString()!)
  }else{
    console.log('link was not payment link template')
  }
  getCountriesAsync();
});

// methods
function getCountriesAsync() {
  cty_abbr = supportedCountries.map((country: { abbreviation: string }) => {
    return country.abbreviation;
  });
}

// check and get payment link template info

async function getPaymentLinkTemplateInfo(template_link: string) {

  try {
    const res = await $api.paymentLinks.getPaymentLinksTemplate(template_link)


    paymentLinkStore.paymentLinktemplate = res.data
    paymentLinkStore.invoicePaymentForm.amount = res.data.amount.toString()
    paymentLinkStore.invoicePaymentForm.currency = res.data.currency.toString()
    paymentLinkStore.isPaymentLinktemplate = true;

  } catch (error: any) {

    console.log(error)
  }
}

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
