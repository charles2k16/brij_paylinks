<template>
  <div class="w-full flex flex-col section">
    <!-- Banner -->

    <!-- <CampaignBanner class="hidden sm:block" /> -->
    <!-- Campaign Info & Payment -->

    <!-- <pre>{{ paymentLinkResponse }}</pre> -->
    <div class="flex lg:flex-row flex-col justify-center  md:space-x-4 h-full lg:mt-10">


      <div class="lg:w-[50%] w-full  h-fit rounded-md flex justify-center">
        <div class="lg:max-w-md md:max-w-2xl w-full flex justify-center lg:m-0 md:m-0 m-3">
          <PaymentLinkMerchantInfo :merchant="paymentLinkResponse?.data" :paymentLink="route.params.id" :paymentOptions="paymentOptions!"
            :countries="cty_abbr" />
        </div>
      </div>

      <!-- Campaign Info -->
      <div class="lg:w-[50%] w-full hidden sm:block md:flex md:justify-center pt-5 lg:pt-0">
        <div class="lg:max-w-md md:max-w-2xl w-full">
          <PaymentLinkPaymentForm :paymentOptions="paymentOptions!" :paymentLink="route.params.id" :countries="cty_abbr" />
        </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { useCampaignStore } from "~/store/campaign";
import { usePaymentOptions } from "~/store/payment_options";
import { usePaymentLinkStore } from '~/store/payment_links'
import { supportedCountries } from '~/assets/data';


const campaignStore = useCampaignStore();
const route = useRoute()
const paymentOptiosnStore = usePaymentOptions()
const paymentLinkStore = usePaymentLinkStore()
const { paymentOptions } = storeToRefs(paymentOptiosnStore)
const { paymentLinkResponse } = storeToRefs(paymentLinkStore)

// data
let cty_abbr = ['GH']

// onmounted
onMounted(() => {
  campaignStore.verifyCampaignLink(route.params.id.toString())
  paymentOptiosnStore.getPaymentMethod('GHS')
  console.log(route.query)
  if(route.query){
    const payment_link = route.query
    console.log(payment_link.payment_template_link?.toString())
    paymentLinkStore.getPaymentLinkTemplate(payment_link.payment_template_link?.toString()!)
  }
  getCountriesAsync()
  console.log(cty_abbr)
})

// methods
function getCountriesAsync() {
  cty_abbr = supportedCountries.map(
    (country: { abbreviation: string }) => {
      return country.abbreviation
    }
  )
}




definePageMeta({
  // layout: 'campaign-layout',
  middleware: ['verify-paymentlink-link']
})

</script>
<style scoped>
.primary-custom-bg-color {
  background-color: #04383F;
}

.secondary-custom-bg-color {
  background-color: #F9AB10;
}

.secondary-custom-bg-color:hover {
  background-color: #f0af2c;
}

.button-font-weight {
  font-weight: 900;
}

.primary-custom-text-color {
  color: #04383F;
}
</style>
