<template>
  <div class="w-full flex flex-col lg:px-20 lg:py-2 section">
    <!-- Banner -->

    <!-- <CampaignBanner class="hidden sm:block" /> -->
    <!-- Campaign Info & Payment -->
    <div class="flex flex-row justify-center md:space-x-4 h-full">
      <div
        class="lg:w-[60%] md:w-[50%] w-full hidden sm:block h-full bg-gray-50 rounded-md">
        <!-- Campaign Info -->
        <CampaignInfo :campaign="campaign!" :merchant="merchant!" />
      </div>

      <!-- Campaign Info -->
      <div class="lg:w-[40%] md:w-[50%] w-full">
        <CampaignPayment
          :paymentOptions="paymentOptions!"
          :countries="cty_abbr"
          :merchant="merchant!"
          :campaign="campaign!" />
      </div>
    </div>

    <div
      class="sm:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white p-4 shadow-lg">
      <!-- Donate  -->

      <MazBtn @click="toggleSheet" color="warning" size="sm" class="w-full">
        <Icon name="ep:money" size="25" />
        Donate
      </MazBtn>

      <!-- Drawer for payment form on mobile -->
      <MazBottomSheet v-model="drawer" :no-close="true">
        <div class="h-screen">
          <div class="h-full overflow-y-auto py-10">
            <div class="flex justify-end items-center">
              <MazBtn @click="toggleSheet" color="transparent">
                <icon name="ic:sharp-close" />
              </MazBtn>
            </div>
            <!-- content here -->
            <CampaignPaymentForm
              :campaign="campaign!"
              :countries="cty_abbr"
              :merchant="merchant"
              :paymentOptions="paymentOptions!" />
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
import { type Campaign } from '~/types/index';
import { ArrowLeftBold } from '@element-plus/icons-vue';
import { useCampaignStore } from '~/store/campaign';
import { usePaymentOptions } from '~/store/payment_options';

const campaignStore = useCampaignStore();
const route = useRoute();
const paymentOptiosnStore = usePaymentOptions();
const { paymentOptions } = storeToRefs(paymentOptiosnStore);
const { campaign, merchant } = storeToRefs(campaignStore);
import { supportedCountries } from '~/assets/data';

// data
const drawer = ref(false);
let cty_abbr = ['GH'];

// onmounted
onMounted(() => {
  // campaignStore.verifyCampaignLink(route.params.id.toString())
  paymentOptiosnStore.getPaymentMethod('GHS');
  getCountriesAsync();
});

// methods
function getCountriesAsync() {
  cty_abbr = supportedCountries.map((country: { abbreviation: string }) => {
    return country.abbreviation;
  });
}

function toggleSheet() {
  drawer.value = !drawer.value;
}

definePageMeta({
  layout: 'campaign-layout',
  middleware: ['verify-campaign-link'],
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
