<template>
  <el-form ref="ruleFormRef" :model="paymentForm" :rules="rules">
    <p class="text-gray-700 text-sm mt-5 mb-2">Amount to donate</p>
    <div class="flex w-full gap-x-2 mb-2">
      <div class="flex h-fit">
        <el-form-item prop="currency">
          <MazSelect
            v-model="paymentForm.currency"
            label="Select currency"
            color="warning"
            :options="extractAbbr(merchant?.data.accepted_currencies!)" />
        </el-form-item>
      </div>
      <!-- Input for amount -->
      <div class="flex-1">
        <el-form-item prop="amount">
          <MazInput
            class="w-full"
            key="lg"
            color="warning"
            v-model="paymentForm.amount"
            label="Enter Amount"
            placeholder="200"
            size="md" />
        </el-form-item>
      </div>
    </div>

    <!-- chips -->
    <div class="flex flex-wrap rounded-md mt-1">
      <div v-for="(chip, index) in amountChips" :key="index" class="group">
        <button
          type="button"
          class="border-2 me-2 mb-2 border-teal-900 group-hover:bg-teal-900 py-0.5 px-3 rounded-md">
          <p
            class="text-teal-950 font-bold text-sm group-hover:text-white"
            @click="onChipClick(chip.amount)">
            {{ chip.amount }}
          </p>
        </button>
      </div>
    </div>

    <!--Phone number field-->
    <p class="text-gray-700 text-sm mt-10 mb-2">Phone number</p>
    <div class="flex w-full gap-x-2 mb-2">
      <!-- Input for amount -->
      <div class="flex-1">
        <el-form-item prop="phone">
          <MazPhoneNumberInput
            color="warning"
            class="w-full"
            v-model="paymentForm.phone"
            show-code-on-list
            :only-countries="countries"
            default-country-code="GH"
            :ignored-countries="['AC']"
            @update="phoneResult = $event" />
        </el-form-item>
        <div class="flex w-full"></div>
      </div>
    </div>

    <!-- Make payment & pledge button -->
    <!-- Buttons -->
    <div class="flex flex-row gap-y-2 md:flex-col gap-x-3 mt-3">
      <!-- Make paymnet button -->
      <MazBtn
        @click="submitForm(ruleFormRef)"
        size="sm"
        color="warning"
        class="w-full"
        rounded>
        <Icon name="ep:money" size="25" />
        Continue
      </MazBtn>
      <!-- select payment menthod dialog -->
      <MazDialog
        @close="handleClose"
        v-model="paymentMethodialogVisible"
        :title="dialogueTitle"
        :persistent="false"
        scrollable>
        <div v-if="!isOTPSuccessfull" class="flex flex-col">
          <!-- payment methods -->
          <PaymentMethod
            :options="props.paymentOptions.data"
            v-model="campaignStore.selectedPaymentOption"
            class="flex-1" />
          <!-- Continue -->

          <MazBtn
            :loading="isSendOTPLoading"
            v-if="isPaymentMethodSelected"
            class="w-full mt-4"
            :disabled="!isPaymentMethodSelected"
            @click="initiateOTPRequest"
            size="sm"
            color="warning"
            rounded>
            <div class="flex gap-x-2">
              <Icon name="ep:money" size="25" />
              <p class="font-bold">Continue</p>
            </div>
          </MazBtn>

          <div v-else class="text-sm text-gray-500 mt-5 text-center">
            Select payment to continue
          </div>
        </div>

        <!-- otp -->
        <div v-else class="flex flex-col items-center">
          <!-- OT Field -->
          <!-- <OPTInput class="w-full" :digits-pin="campaignStore.otpCode" /> -->

          <Loading
            v-if="isPayingmentLoading"
            message="Initializing payment, authorize payment .." />

          <!-- OT Field -->
          <div v-else class="flex flex-col">
            <h2 class="text-2xl text-center">Enter OTP Code</h2>
            <p class="mb-5 text-gray-400 text-center">
              OTP code has been sent to your momo number, please enter to continue
            </p>
            <MazInputCode
              :code-length="6"
              size="sm"
              v-model="otpCode"
              class="flex flex-wrap justify-center"
              @completed="handlePayment()"
              color="warning" />
          </div>

          <!-- Resend button -->
          <MazBtn
            :loading="isSendOTPLoading"
            color="transparent"
            size="mini"
            @click="initiateOTPRequest()"
            class="reset-btn"
            link>
            <p v-if="isSendOTPLoading">Resending OTP Code ...</p>
            <p v-else>Re-send OTP Code</p>
          </MazBtn>
        </div>
      </MazDialog>
    </div>

    <!-- Copy Campaign link field -->
    <div class="mt-10">
      <CampaignCopyLink :campaignLink="campaign?.campaign_link!" />
    </div>

    <!-- footer text -->
    <p class="text-center mt-10 text-gray-400 text-sm">{{ props.campaign?.footnote }}</p>

    <!-- success payment modal -->

    <MazDialog v-model="isPaymentSuccessfull" :on-close="handleClose">
      <div class="flex flex-col justify-center items-center">
        <Icon class="text-6xl text-green-700" name="ri:send-plane-line" />
        <h2 class="text-2xl mt-3">Donation Made Successfull</h2>
        <p class="text-center">
          You have successfully made donated to this campaign. Share this campaign by copy
          the URL below.
        </p>

        <div class="w-full border border-gray-200 p-5 mt-5 rounded-md">
          <p class="text-lg">
            You donated an amount of <span class="font-semibold">GHS 200 </span>to
            <span class="font-semibold">Fund Raising for new School Build in Newton</span
            >'s Campaign on
            <span>{{ formateDate(new Date(), 'Mo MMM YYYY h:ss a') }}</span>
          </p>
          <div class="flex w-full">
            <CampaignCopyLink
              class="w-full mt-5"
              :campaignLink="campaign?.campaign_link!" />
          </div>
        </div>
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
  type MerchantResponse,
  type SelectCountryResult,
} from '~/types/index';
import { useCampaignStore } from '~/store/campaign';
import { type PaymentMethods } from '~/types/index';
import { usePaymentOptions } from '~/store/payment_options';
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
import { extractAbbr } from '~/utils/index';

// instance of tpayment store
const campaignStore = useCampaignStore();
const paymentOptiosnStore = usePaymentOptions();
const {
  dialogueTitle,
  isOTPSuccessfull,
  isPaymentMethodSelected,
  isPayingmentLoading,
  otpCode,
  isSendOTPLoading,
  isPaymentSuccessfull,
} = storeToRefs(campaignStore);
// props
const props = defineProps<{
  paymentOptions: PaymentMethods;
  campaign: Campaign;
  merchant: MerchantResponse | undefined;
  countries: any[];
}>();

// data
const ruleFormRef = ref<FormInstance>();
const paymentMethodialogVisible = ref(false);
const phoneResult = ref<SelectCountryResult>();
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
const paymentForm = reactive<CampaignPaymentForm>({
  amount: '',
  phone: phoneResult.value?.e164!,
  currency: '',
});
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
    console.log(`Age changed from ${oldValue} to ${newValue}`);
    paymentOptiosnStore.getPaymentMethod(paymentForm.currency);
  }
);

// functions & methids
function submitForm(ruleFormRef: any) {
  ruleFormRef.validate((valid: any) => {
    if (valid) {
      paymentMethodialogVisible.value = true;
    } else {
      console.log('error submit!!');
      return false;
    }
  });
}
// initiate OTP
function initiateOTPRequest() {
  console.log('send ot test');
  campaignStore.sendOTP(paymentForm.phone);
}

async function onChipClick(amount: string) {
  paymentForm.amount = amount;
}

const handleClose = () => {
  // done();
  console.log('closing modal ..');
  campaignStore.isOTPSuccessfull = false;
  campaignStore.selectedPaymentOption = null;
  campaignStore.isPaymentSuccessfull = false;
  campaignStore.otpCode = '';
};

// on complete pin field
function handlePayment() {
  campaignStore.payDonation(paymentForm.amount, paymentForm.currency, paymentForm.phone);
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
