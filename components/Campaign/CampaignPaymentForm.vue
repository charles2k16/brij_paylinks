<template>
  <el-form ref="ruleFormRef" :model="paymentForm" :rules="rules">
    <p class="mt-5 mb-2 text-sm text-gray-700 dark:text-white">Amount to donate</p>
    <div class="flex w-full mb-2 gap-x-2">
      <div class="flex h-fit">
        <el-form-item prop="currency">
          <MazSelect class="dark:text-white" v-model="paymentForm.currency" label="Select currency" color="warning"
            :options="extractAbbr(merchant?.accepted_currencies!)" />
        </el-form-item>
      </div>
      <!-- Input for amount -->
      <div class="flex-1">
        <el-form-item prop="amount">
          <MazInput class="w-full" key="lg" color="warning" v-model="paymentForm.amount" label="Enter Amount"
            placeholder="200" size="md" />
        </el-form-item>
      </div>
    </div>

    <!-- chips -->
    <div class="flex flex-wrap mt-1 rounded-md">
      <div v-for="(chip, index) in amountChips" :key="index" class="group">
        <button type="button" class="border me-2 mb-2 border-teal-900 dark:border-gray-800 group-hover:bg-teal-900 py-0.5 px-3 rounded-md">
          <p class="text-sm font-bold text-teal-950 dark:text-white group-hover:text-white" @click="onChipClick(chip.amount)">
            {{ chip.amount }}
          </p>
        </button>
      </div>
    </div>

    <!--Phone number field-->
    <p class="mt-10 mb-2 text-sm text-gray-700 dark:text-white">Phone number</p>
    <div class="flex w-full mb-2 gap-x-2">
      <!-- Input for amount -->
      <div class="flex-1">
        <el-form-item prop="phone">
          <MazPhoneNumberInput color="warning" class="w-full dark:text-white"  v-model="paymentForm.phone" show-code-on-list
            :only-countries="countries" default-country-code="GH" :ignored-countries="['AC']"
            @update="phoneResult = $event" />
        </el-form-item>
        <div class="flex w-full"></div>
      </div>
    </div>

    <!-- Make payment & pledge button -->
    <!-- Buttons -->
    <div class="flex flex-row mt-3 gap-y-2 md:flex-col gap-x-3">
      <!-- Make paymnet button -->
      <MazBtn @click="submitForm(ruleFormRef)" size="sm" color="warning" class="w-full">
        <Icon name="ep:money" size="25" />
        Continue
      </MazBtn>
      <!-- select payment menthod dialog -->
      <MazDialog @close="handleClose" v-model="paymentMethodDialogVisible" :persistent="false"
        scrollable>
        <div v-if="!isOTPSuccessful" class="flex flex-col">
          <!-- payment methods -->
          <PaymentMethods :options="props.paymentOptions || []" v-model="campaignStore.selectedPaymentOption"
            class="flex-1" />
          <!-- Continue -->

          <MazBtn :loading="isSendOTPLoading" v-if="isPaymentMethodSelected" class="w-full mt-4"
            :disabled="!isPaymentMethodSelected" @click="initiateOTPRequest" size="sm" color="warning">
            <div class="flex gap-x-2">
              <Icon name="ep:money" size="25" />
              <p class="font-bold">Continue</p>
            </div>
          </MazBtn>

          <div v-else class="mt-5 text-sm text-center text-gray-500">
            Select payment to continue
          </div>
        </div>

        <!-- otp -->
        <div v-else class="flex flex-col items-center">
          <!-- OT Field -->
          <!-- <OPTInput class="w-full" :digits-pin="campaignStore.otpCode" /> -->

          <Loading v-if="isPaymentLoading" message="Initializing payment, authorize payment .." />

          <!-- OT Field -->
          <div v-else class="flex flex-col">
            <h2 class="text-2xl text-center">Enter OTP Code</h2>
            <p class="mb-10 text-center text-gray-400 dark:text-white">
              OTP code has been sent to your momo number, please enter to continue
            </p>
            <MazInputCode :code-length="6" size="xs" v-model="otpCode" class="flex flex-wrap justify-center mt-10"
              @completed="handlePayment()" color="warning" />
          </div>

          <!-- Resend button -->
          <MazBtn :loading="isSendOTPLoading" color="transparent" size="mini" @click="initiateOTPRequest()"
            class="reset-btn" link>
            <p v-if="isSendOTPLoading" class="dark:text-amber-400">Resending OTP Code ...</p>
            <p v-else class="dark:text-amber-400">Re-send OTP Code</p>
          </MazBtn>
        </div>
      </MazDialog>
    </div>

    <!-- Copy Campaign link field -->
    <div class="mt-10">
      <CampaignCopyLink :campaignLink="campaign?.campaign_link!" />
    </div>

    <!-- footer text -->
    <p class="mt-10 text-sm text-center text-gray-400">{{ props.campaign?.footnote }}</p>

    <!-- success payment modal -->








    <!-- success payment modal -->

    <MazDialog v-model="isPaymentSuccessful" width="400px" :on-close="handleClose">
      <div class="flex flex-col items-center justify-center">
        <Icon class="text-6xl text-green-700" name="ri:send-plane-line" />
        <h2 class="mt-3 text-2xl dark:text-white">Donation Made Successful</h2>
        <p class="text-center dark:text-white">You have successfully made donated to this campaign. Share this campaign by copy
          the URL below.</p>

        <div class="w-full p-5 mt-5 border border-gray-200 rounded-md">
          <p class="text-lg dark:text-white">You donated an amount of <span class="font-semibold">GHS 200 </span>to <span
              class="font-semibold dark:text-white">Fund Raising for new School Build in Newton</span>'s Campaign on
            <span>{{ formateDate(new Date, 'Mo MMM YYYY h:ss a') }}</span>
          </p>
          <div class="flex w-full">
            <CampaignCopyLink class="w-full mt-5" :campaignLink="campaign?.campaign_link!" />
          </div>
        </div>
        <div class="mt-10">

        </div>
      </div>
      <template #footer="{ close }">
        <MazBtn color="warning" @click="close">
          Go back
        </MazBtn>
      </template>
    </MazDialog>

    <MazDialog v-model="isPaymentFailed" width="400px" :on-close="handleClose">
      <div class="flex flex-col items-center justify-center">
        <Icon class="text-6xl text-red-600" name="bxs:error-alt" />
        <h2 class="mt-3 text-2xl dark:text-white">Payment failed</h2>
        <p class="text-center dark:text-white">Oops! It seems there was an issue processing your payment. Please check your payment
          details and try again..</p>
        <div class="mt-10"></div>
      </div>
      <template #footer="{ close }">
        <MazBtn color="warning" @click="close"> Go back </MazBtn>
      </template>
    </MazDialog>

  </el-form>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import {
  type Campaign,
  type CampaignPaymentForm,
  type Merchant,
  type PaymentOption,
  type SelectCountryResult,
} from '~/types/index';
import { useCampaignStore } from '~/store/campaign';
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
import { extractAbbr } from '~/utils/index';


// instance of sentOTP composable
const { isOTPSuccessful, isSendOTPLoading, sendOTP } = useSendOTP();
const { isPaymentLoading, isPaymentFailed, isPaymentSuccessful, pay } = useMomoPayment();



// instance of payment store
const campaignStore = useCampaignStore();
const { isPaymentMethodSelected, otpCode, campaign } = storeToRefs(campaignStore);
// props
const props = defineProps<{
  paymentOptions: PaymentOption[];
  campaign: Campaign;
  merchant: Merchant | undefined;
  countries: any[];
}>();

// emits
const emit = defineEmits(['on-currency-change'])

// form instance
const ruleFormRef = ref<FormInstance>();



// toggle dialog
const paymentMethodDialogVisible = ref(false);

// phone result
const phoneResult = ref<SelectCountryResult>();
// form rule validation
const rules = reactive<FormRules<CampaignPaymentForm>>({
  amount: [{ required: true, message: 'Please input amount', trigger: 'blur' }],
  phone: [
    { required: true, message: 'Please input phone number', trigger: 'blur' },
    // { min: 10, max: 10, message: 'Length should be up to 10 digits', trigger: 'blur' },
  ],
  currency: [
    {
      required: true,
      message: 'Please select the currency',
      trigger: 'change',
    },
  ],
});

// payment form fields
const paymentForm = reactive<CampaignPaymentForm>({
  amount: '',
  phone: phoneResult.value?.e164!,
  currency: 'GHS',
});

// chips data
const amountChips = reactive([
  { amount: '5000' },
  { amount: '4000' },
  { amount: '3000' },
  { amount: '2000' },
  { amount: '500' },
  { amount: '400' },
  { amount: '300' },
  { amount: '200' },
  { amount: '100' },
  { amount: '50' },
  { amount: '10' },
  { amount: '1' },
]);

//wathch
watch(
  () => paymentForm.currency,
  (newValue, oldValue) => {
    emit('on-currency-change', newValue);
  }
);


// watch for changes in the "isPaymentSuccessful" var and assign it to the store
watch(isPaymentSuccessful, (newValue, oldValue) => {
  // Trigger something when the value changes
  campaignStore.isPaymentSuccessful = newValue
});


// functions & methids
function submitForm(ruleFormRef: any) {
  ruleFormRef.validate((valid: any) => {
    if (valid) {
      paymentMethodDialogVisible.value = true
    } else {
      return false;
    }
  });
}
// initiate OTP
function initiateOTPRequest() {
  sendOTP(paymentForm.phone, campaign.value?.payment_link!, 'jamesdoe@gmail.com')
}



async function onChipClick(amount: string) {
  paymentForm.amount = amount;
}

const handleClose = () => {
  // done();
  isOTPSuccessful.value = false;
  campaignStore.selectedPaymentOption = null;
  campaignStore.isPaymentSuccessful = false;
  campaignStore.otpCode = '';
}


function handlePayment() {
  const payload = {
    payment_method_id: campaignStore.selectedPaymentOption?.id,
    payment_details: {
      momo_number: paymentForm.phone,
      description: "Payment link transaction",
      amount: paymentForm.amount,
      currency: paymentForm.currency,
      otp: otpCode.value,
      customer_firstname: "john",
      customer_lastname: "doe",
      customer_email: "me@you.com"
    },
    meta: {
      payment_type: "paymentcampaign",
      payment_type_id:  campaign.value?.id
    }
  }



  pay(payload, campaign.value?.payment_link!)
}



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

.reset-btn {
  font-weight: bold;
  font-size: 14px;
  margin-top: 15px;
  color: var(--color-primary);
}
</style>
