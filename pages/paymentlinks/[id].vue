


<template>
  <div class="w-full flex flex-col section">
    <!-- Banner -->

    <!-- <CampaignBanner class="hidden sm:block" /> -->
    <!-- Campaign Info & Payment -->
    <div class="flex lg:flex-row flex-col justify-center  md:space-x-4 h-full lg:mt-10">


      <div class="lg:w-[50%] w-full  h-fit rounded-md flex justify-center">
            <div class="lg:max-w-md md:max-w-2xl w-full flex justify-center bg-slate-300 ">
               <PaymentLinkMerchantInfo :paymentOptions="paymentOptions!" :countries="cty_abbr"  />

            </div>

        </div>

      <!-- Campaign Info -->
      <div class="lg:w-[50%] w-full hidden sm:block md:flex md:justify-center pt-5 lg:pt-0">
      <div class="lg:max-w-md md:max-w-2xl w-full">
        <PaymentLinkPaymentForm :paymentOptions="paymentOptions!" :countries="cty_abbr"  />
      </div>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { useCampaignStore } from "~/store/campaign";
import { usePaymentOptions } from "~/store/payment_options";



const campaignStore = useCampaignStore();
const route = useRoute()
const paymentOptiosnStore = usePaymentOptions()
const { paymentOptions } = storeToRefs(paymentOptiosnStore)
import { supportedCountries } from '~/assets/data';


// data
let cty_abbr = ['GH']

// onmounted
onMounted(() => {
  campaignStore.verifyCampaignLink(route.params.id.toString())
   paymentOptiosnStore.getPaymentMethod('GHS')
  console.log(route.params.id)
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
  layout: 'campaign-layout',
  // middleware: ['verify-link']
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
