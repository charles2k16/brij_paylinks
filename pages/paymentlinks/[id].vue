


<template>
  <div class="w-full flex flex-col lg:px-20 lg:py-2 section">
    <!-- Banner -->

    <!-- <CampaignBanner class="hidden sm:block" /> -->
    <!-- Campaign Info & Payment -->
    <div class="flex flex-row justify-center md:space-x-4 h-full">


      <div class="lg:w-[50%] w-full lg:h-screen h-fit  rounded-md flex lg:justify-end justify-center">
            <div class="lg:max-w-lg w-full lg:pt-20   lg:pr-20 py-5 ">
               <PaymentLinkMerchantInfo />
            </div>

        </div>

      <!-- Campaign Info -->
      <div class=" lg:w-[50%] md:w-[50%] w-full hidden sm:block ">
        <PaymentLinkPaymentForm/>
      </div>
    </div>

    <div class="sm:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white p-4 shadow-lg">
      <!-- Donate  -->


      <MazBtn @click="drawer = true" color="warning" size="sm" rounded class="w-full">
        <Icon name="ep:money" size="25" />
        Donate
      </MazBtn>

      <!-- Drawer for payment form on mobile -->
      <MazBottomSheet v-model="drawer">
      <p>loedjdj</p>
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
import { type Campaign } from '~/types/index';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { useCampaignStore } from "~/store/campaign";
import { usePaymentOptions } from "~/store/payment_options";



const campaignStore = useCampaignStore();
const route = useRoute()
const paymentOptiosnStore = usePaymentOptions()
const { paymentOptions } = storeToRefs(paymentOptiosnStore)
const { campaignResponse, merchantResponse } = storeToRefs(campaignStore)
import { supportedCountries } from '~/assets/data';


// data
const drawer = ref(false)
let cty_abbr = ['GH']

// onmounted
onMounted(() => {
  // campaignStore.verifyCampaignLink(route.params.id.toString())
  // paymentOptiosnStore.getPaymentMethod('GHS')
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
