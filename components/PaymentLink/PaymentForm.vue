<template>
  <el-form
    ref="invoicePaymentFormz"
    :model="paymentLinkStore.invoicePaymentForm"
    :rules="rules"
    class="demo-ruleForm max-w-"
    size="default"
    status-icon>
    <h2 class="text-2xl">Make payment</h2>
    <p class="mb-5">Enter amount to pay and select payment method</p>

    <!-- amount & currency -->

    <div class="flex gap-x-2 mb-2">
      <div class="flex h-fit">
        <el-form-item prop="currency">
          <MazSelect
            v-model="paymentLinkStore.invoicePaymentForm.currency"
            :disabled="isPaymentLinktemplate"
            label="Select currency"
            color="warning"
            :options="['GHS', 'NGN', 'KSH']" />
        </el-form-item>
      </div>
      <!-- Input for amount -->
      <div class="flex-1">
        <el-form-item prop="amount">
          <MazInput
            class="w-full"
            key="lg"
            :disabled="isPaymentLinktemplate"
            color="warning"
            v-model="paymentLinkStore.invoicePaymentForm.amount"
            label="Enter Amount"
            size="md" />
        </el-form-item>
      </div>
    </div>

    <!-- Reference -->
    <el-form-item prop="reference">
      <p class="mb-2 font-semibold">Reference</p>
      <MazInput
        class="w-full"
        key="lg"
        color="warning"
        v-model="paymentLinkStore.invoicePaymentForm.reference"
        label="Reference"
        placeholder="Pay for services"
        size="md" />
    </el-form-item>

    <div
      v-if="isPaymentMethodDataLoading"
      class="flex flex-col items-center w-full gap-y-3">
      <Icon class="text-2xl text-amber-600" name="eos-icons:bubble-loading" />
      <p class="text-sm">Loading payment options</p>
    </div>

    <!-- paymethodd -->
    <PaymentMethod
      v-else
      :options="paymentOptiosnStore.paymentOptions?.data!"
      v-model="paymentLinkStore.selectedPaymentOption"
      class="flex-1" />

    <!-- submit button -->
    <MazBtn
      color="warning"
      size="sm"
      @click="submitForm(invoicePaymentFormz)"
      class="w-full mt-5">
      Procedd to payment
    </MazBtn>

    <MazDialog
      @close="handleClose"
      v-model="dialogVisible"
      :persistent="false"
      scrollable>
      <!-- <p class="text-lg">Confirm Payment</p> -->

      <PaymentLinkConfirmPayment
        :countries="countries"
        :paymentLink
        v-if="!isOTPSuccessfull"
        :merchant="merchant" />
      <div v-else class="flex flex-col items-center">
        <!-- OT Field -->

        <Loading v-if="isPayingmentLoading" message="initiating payment authorizations" />

        <div v-else class="flex flex-col">
          <h2 class="text-2xl text-center">Enter OTP Code</h2>
          <p class="mb-5 text-gray-400 text-center">
            OTP code has been sent to your momo number, please enter to continue
          </p>
          <MazInputCode
            :code-length="6"
            size="xs"
            v-model="paymentLinkStore.OTPCode"
            class="flex flex-wrap justify-center"
            @completed="handlePayment()"
            color="warning" />
        </div>

        <el-button class="reset-btn" link>Resend code</el-button>
        <!-- Resend button -->
      </div>
      <template #footer>
        <div
          class="w-full flex justify-center items-center gap-x-4 bg-gray-100 p-3 rounded-md">
          <Icon class="text-xl text-teal-950" name="tdesign:secured" />
          <p class="text-gray-600 font-bold text-sm">Secured by Brij</p>
          <img src="/img/logo-dark.png" alt="logo" class="w-6" />
        </div>
      </template>
    </MazDialog>

    <!-- success payment modal -->
    <MazDialog v-model="isPaymentSuccessfull" :on-close="handleClose">
      <div class="flex flex-col justify-center items-center">
        <Icon class="text-6xl text-green-700" name="ri:send-plane-line" />
        <h2 class="text-2xl mt-3">Merchant Paid Successfull</h2>
        <p class="text-center">You have successfully made payment to this merchant.</p>

        <div class="w-full border border-gray-200 p-5 mt-5 rounded-md">
          <p class="text-lg">
            You paid an amount of <span class="font-semibold">GHS 200 </span>to
            <span class="font-semibold">Gentech Corp Ghana</span>'s on
            <span>{{ formateDate(new Date(), 'Mo MMM YYYY h:ss a') }}</span>
          </p>
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
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { usePaymentLinkStore } from '~/store/payment_links';
import { usePaymentOptions } from '~/store/payment_options';
import type { InvoicePaymentForm, Merchant } from '~/types/index';
import type { PaymentMethods } from '~/types/index';
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'
import usePayment from '~/composables/usePayment';

// instance of store
const paymentLinkStore = usePaymentLinkStore();
const paymentOptiosnStore = usePaymentOptions();
const { isPaymentMethodSelected, isOTPSuccessfull, isPaymentLinktemplate, selectedPaymentOption, invoicePaymentForm, OTPCode } = storeToRefs(paymentLinkStore);
const { isPaymentMethodDataLoading } = storeToRefs(paymentOptiosnStore);

// instance of pay 
const { isPayingmentLoading, isPaymentSuccessfull, pay } = usePayment();

// instance of api
const { $api } = useNuxtApp();

// togge dialog
const dialogVisible = ref(false);

// form instance
const invoicePaymentFormz = ref<FormInstance>();

// validation rukes
const rules = reactive<FormRules<InvoicePaymentForm>>({
  amount: [{ required: true, message: 'Please input Amount to pay ', trigger: 'blur' }],
  reference: [{ required: true, message: 'Please input Reference ', trigger: 'blur' }],
  currency: [
    {
      required: true,
      message: 'Please select Currency',
      trigger: 'change',
    },
  ],
});

// watch the selected currency and request the payment options from api
watch(
  () => paymentLinkStore.invoicePaymentForm.currency,
  (newValue, oldValue) => {
    paymentOptiosnStore.getPaymentMethod(paymentLinkStore.invoicePaymentForm.currency);
  }
);

watch(isPaymentSuccessfull, (newValue, oldValue) => {
    // Trigger something when the value changes
    paymentLinkStore.isPaymentSuccessfull = newValue
});

// props
const props = defineProps<{
  paymentOptions: PaymentMethods;
  countries: any[];
  paymentLink: string | string[];
  merchant: Merchant | undefined;
}>();

// ** Dialogue **//
const handleClose = (done: () => void) => {
  paymentLinkStore.isOTPView = false;
  paymentLinkStore.invoicePaymentForm.email = '';
  paymentLinkStore.invoicePaymentForm.phone = '';
  paymentLinkStore.OTPCode = '';
  paymentLinkStore.isOTPSuccessfull = false;
};


// submit form function
function submitForm(invoicePaymentFormz: any) {
  invoicePaymentFormz.validate((valid: any) => {
    if (valid) {
      if (isPaymentMethodSelected.value === true) {
        // show popup
        dialogVisible.value = true;
        // alert('success')
      } else {
        ElMessage({
          message: 'Please select a payment method to continue.',
          type: 'warning',
        });
      }

      //asign form values to store values
    } else {
      return false;
    }
  });
}

function handlePayment() {
  const payload = {
    payment_method_id: selectedPaymentOption.value?.id,
    payment_details: {
      momo_number: invoicePaymentForm.value.phone!,
      description: "Payment link transaction",
      amount: invoicePaymentForm.value.amount!,
      currency: invoicePaymentForm.value.currency!,
      otp: OTPCode.value,
      customer_firstname: "john",
      customer_lastname: "doe",
      customer_email:invoicePaymentForm.value.email!
    },
    // meta: {
    //   payment_type: "paymentcampaign",
    //   payment_type_id:  "campaign.value?.id"
    // }
  }



  pay(payload, props.paymentLink.toString())
}



// make payment
async function payMerchant () {
    try {
      isPayingmentLoading.value = true;

      const payload = {
        payment_method_id: selectedPaymentOption.value?.id,
        payment_details: {
          momo_number: invoicePaymentForm.value.phone,
          description: invoicePaymentForm.value.reference,
          amount: invoicePaymentForm.value.amount,
          currency: invoicePaymentForm.value.currency,
          otp: OTPCode.value,
          customer_firstname: "john",
          customer_lastname: "doe",
          customer_email: invoicePaymentForm.value.email
        },
        // meta: {
        //   payment_type: "paymentcampaign",
        //   payment_type_id: campaignResponse.value?.data.id,
        // },
      };

      const res = await $api.paymentLinks.payMerchant(props.paymentLink, payload)

      isPaymentSuccessfull.value = true;
      ElNotification( {
        title: "Payment made successfully",
        message: `${ res.message }`,
        duration: 0,
        type: "success",
      } );

      isPayingmentLoading.value = false;
    } catch ( error: any ) {
      isPayingmentLoading.value = false;
      isPaymentSuccessfull.value = false;

      ElNotification( {
        title: "Failed to make transactions ",
        message: `${ error.response._data.message }`,
        duration: 0,
        type: "error",
      } );
    }
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
  color: #04383f;
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
