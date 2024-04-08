<template>
  <div  class="w-full flex flex-col lg:px-20 section">
    <!-- Banner -->

    <CampaignBanner class="hidden sm:block" />
    <!-- Campaign Info & Payment -->
    <div class="flex flex-row md:space-x-4 ">
      <div class="lg:basis-3/5 md:basis-1/2 basis-full hidden sm:block">
        <!-- Campaign Info -->
        <CampaignInfo :campaign="campaignResponse?.data!" :merchant="merchantResponse" />
      </div>

      <!-- Campaign Info -->
      <div class="flex-1">
        <CampaignPayment :paymentOptions="paymentOptions!" :merchant="merchantResponse" :campaign="campaignResponse?.data!" />
      </div>
    </div>

    <div class="sm:hidden fixed bottom-0 left-0 right-0 flex gap-x-2 items-center justify-center bg-white p-4 shadow-lg">
      <!-- Donate  -->
      <button type="button"
        @click="drawer = true"
        class="flex-1 secondary-custom-bg-color px-4 flex flex-row py-2 flex-nowrap justify-center items-center gap-x-3 rounded-full hover:bg-teal-950 text-teal-900">
        <Icon name="ep:money" size="25" />
        <p class="font-medium">Donate</p>
      </button>
      <!-- Drawer for payment form on mobile -->
      <el-drawer v-model="drawer" size="90%" direction="btt" :show-close="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass">Donate to the campaign</h4>
          <el-button type="" @click="close" link :icon="ArrowLeftBold">
            Back
          </el-button>
        </template>
        <!-- banner -->
        <div class="flex text-base mb-5">
          <p> Donate to support<span class="font-bold text-teal-900"> Faith Ministries Music department humbly ask for support to acquire new instruments</span> Campaign</p>
        </div>
        <CampaignPaymentForm :campaign="campaignResponse?.data!" :merchant="merchantResponse" :paymentOptions="paymentOptions!"/>
      </el-drawer>
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
import { ArrowLeftBold} from '@element-plus/icons-vue';
import { useCampaignStore} from "~/store/campaign";
import { usePaymentOptions} from "~/store/payment_options";



const campaignStore = useCampaignStore();
const route  = useRoute()
const paymentOptiosnStore = usePaymentOptions()
const {paymentOptions} = storeToRefs(paymentOptiosnStore)
const {campaignResponse, merchantResponse} = storeToRefs(campaignStore)

// get payemnt method options
onMounted(() => {
    campaignStore.verifyCampaignLink(route.params.id.toString())
    paymentOptiosnStore.getPaymentMethod('GHS')
    console.log(route.params.id)
})


const drawer = ref(false)

// onMounted(() => {
//   campaignData.value = campaignStore.campaignResponse?.data!
// })
// test data for campaign
// const campaignData = ref<Campaign | null>(null);

definePageMeta({
    layout: 'campaign-layout',
    middleware:['verify-link']
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
