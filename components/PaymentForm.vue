<template>
  <el-form
    ref="invoicePaymentForm"
    :model="paymentForm"
    :rules="rules"
    class="demo-ruleForm max-w-"
    size="default"
    status-icon>
    <h2 class="text-2xl dark:text-white">Make payment</h2>
    <p class="mb-20 dark:text-white">Enter amount to pay and select payment method</p>

    <!-- amount & currency -->
    <p class="mb-2 font-semibold dark:text-white">Amount to be paid</p>

    <div class="flex gap-x-2 mb-2">
      <div class="flex h-fit">
        <el-form-item prop="currency">
          <MazSelect
            class="dark:text-white"
            v-model="paymentForm.value.currency"
            :disabled="disableDefaultFields"
            label="Select currency"
            color="warning"
            :options="extractAbbr(merchant?.accepted_currencies!)" />
        </el-form-item>
      </div>
      <!-- Input for amount -->
      <div class="flex-1">
        <el-form-item prop="amount">
          <MazInput
            class="w-full"
            key="lg"
            color="warning"
            :disabled="disableDefaultFields"
            v-model="paymentForm.value.amount"
            label="Enter Amount"
            size="md" />
        </el-form-item>
      </div>
    </div>

    <!-- Reference -->
    <el-form-item prop="reference">
      <p class="mb-2 font-semibold dark:text-white">Reference</p>
      <MazInput
        class="w-full"
        key="lg"
        color="warning"
        v-model="paymentForm.value.reference"
        label="Reference"
        placeholder="Pay for services"
        size="md" />
    </el-form-item>

    <div v-if="isPaymentMethodsLoading" class="flex flex-col items-center w-full gap-y-3">
      <Icon class="text-2xl text-amber-600" name="eos-icons:bubble-loading" />
      <p class="text-sm">Loading payment options</p>
    </div>

    <!-- payment_method -->
    <PaymentMethods
      v-else
      :options="paymentMethods || []"
      v-model="selectedPaymentOption"
      class="flex-1" />

    <!-- submit button -->
    <MazBtn
      color="warning"
      size="sm"
      @click="submitForm(invoicePaymentForm)"
      class="w-full mt-8">
      Proceed to payment {{ defaultValues.total }}
    </MazBtn>

    <MazDialog
      @close="handleClose"
      v-model="dialogVisible"
      :persistent="false"
      width="400px"
      scrollable>
      <!-- <p class="text-lg">Confirm Payment</p> -->
      <PaymentConfirm
        :countries="countries"
        :paymentLink="paymentCode!"
        :amount="paymentForm.value.amount"
        :currency="paymentForm.value.currency"
        v-if="!isOTPSuccessful"
        :merchant="merchant"
        @send-otp="handleSendOTP"
        @on-otp-successful="handleOTPSuccess" />

      <div v-else class="flex flex-col items-center">
        <!-- OT Field -->

        <Loading v-if="isPaymentLoading" message="initiating payment authorizations" />

        <div v-else class="flex flex-col">
          <h2 class="text-2xl text-center dark:text-white">Enter OTP Code</h2>
          <p class="mb-5 text-gray-400 text-center">
            OTP code has been sent to your momo number, please enter to continue
          </p>
          <MazInputCode
            :code-length="6"
            size="xs"
            v-model="paymentForm.value.otp"
            class="flex flex-wrap justify-center mt-10"
            @completed="handlePayment"
            color="warning" />
          <MazBtn
            :loading="isSendOTPLoading"
            @click="handleOTPResend()"
            color="transparent"
            class="mt-15"
            link
            >Resend code</MazBtn
          >
        </div>

        <!-- Resend button -->
      </div>
      <template #footer>
        <div
          class="w-full flex justify-center items-center gap-x-4 bg-gray-100 dark:bg-gray-900 p-3 rounded-md">
          <Icon class="text-xl text-teal-950 dark:text-white" name="tdesign:secured" />
          <p class="text-gray-600 font-bold text-sm dark:text-white">Secured by Brij</p>
          <img src="/img/logo-dark.png" alt="logo" class="w-6 dark:text-white" />
        </div>
      </template>
    </MazDialog>

    <!-- success payment modal -->
    <MazDialog v-model="isPaymentSuccessful" width="380px" :on-close="handleClose">
      <div class="flex flex-col justify-center items-center">
        <Icon class="text-6xl text-green-700" name="ri:send-plane-line" />
        <h2 class="text-2xl mt-3">{{ paymentSuccessTitle }}</h2>
        <p class="text-center">You have successfully made payment to this merchant.</p>

        <div class="w-full border border-gray-200 p-5 mt-5 rounded-md">
          <p class="text-lg">
            You paid an amount of
            <span class="font-semibold"
              >{{ paymentForm.value.currency }} {{ paymentForm.value.amount }} </span
            >to
            <span class="font-semibold">{{ merchant?.name }}</span>
          </p>
        </div>
        <div class="mt-10"></div>
      </div>
      <template #footer="{ close }">
        <MazBtn color="warning" @click="close"> Go back </MazBtn>
      </template>
    </MazDialog>

    <MazDialog v-model="isPaymentFailed" width="380px" :on-close="handleClose">
      <div class="flex flex-col justify-center items-center">
        <Icon class="text-6xl text-red-600" name="bxs:error-alt" />
        <h2 class="text-2xl mt-3">Payment failed</h2>
        <p class="text-center">
          Oops! It seems there was an issue processing your payment. Please check your
          payment details and try again..
        </p>
        <div class="mt-10"></div>
      </div>
      <!-- <template #footer="{ close }">
        <MazBtn color="warning" @click="close"> Go back </MazBtn>
      </template> -->
    </MazDialog>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance, FormRules } from 'element-plus';
import { extractAbbr } from '~/utils/index';

import type {
  Invoice,
  InvoicePaymentForm,
  Merchant,
  PaymentDefaultValues,
  paymentLinkTemplate,
  PaymentOption,
} from '~/types/index';
import { ElMessage } from 'element-plus';
import usePayment from '~/composables/usePayment';

// instance of pay
const { isPaymentLoading, isPaymentFailed, isPaymentSuccessful, pay } = usePayment();

// instance of otp
const { isSendOTPLoading, sendOTP } = useSendOTP();

// togge dialog
const dialogVisible = ref(false);

// payment success title
const paymentSuccessTitle = computed(() => {
  if (props.routeName === 'paymentlinks-id-business') {
    return 'Merchant paid Successfully';
  } else {
    return 'Invoice paid Successfully';
  }
});

watch(
  () => isPaymentSuccessful.value,
  (newValue, oldValue) => {
    isPaymentSuccessful.value = newValue;
  }
);

watch(
  () => isPaymentFailed.value,
  (newValue, oldValue) => {
    isPaymentFailed.value = newValue;
  }
);

// form instance
const invoicePaymentForm = ref<FormInstance>();

// disable default fields
const disableDefaultFields = computed(() => {
  if (props.defaultValues.currency) {
    return true;
  } else {
    return false;
  }
});

// selected payment option
const selectedPaymentOption = ref<PaymentOption | null>(null);

// is OTP Successful
const isOTPSuccessful = ref(false);

// on otp successful
function handleOTPSuccess(val: any) {
  isOTPSuccessful.value = val;
}

// initiate otp

// props
const props = defineProps<{
  paymentMethods: PaymentOption[];
  isPaymentMethodsLoading: boolean;
  countries: any[];
  paymentLink?: string | string[];
  merchant: Merchant | undefined;
  routeName: string | null;
  invoice?: Invoice | undefined;
  paymentLinkTemplateLink?: paymentLinkTemplate | undefined;
  paymentCode: string | undefined;
  defaultValues: PaymentDefaultValues;
}>();

const emit = defineEmits(['on-currency-change']);

const paymentForm = computed(() => {
  if (props.defaultValues.currency) {
    return paymentFormWithDefaultValues;
  } else {
    return paymentFormWithoutDefaultValues;
  }
});
const paymentFormWithDefaultValues = ref({
  amount: props.defaultValues.total,
  reference: '',
  currency: props.defaultValues.currency,
  payment_method: '',
  otp: '',
  phone: '',
  email: '',
  phoneResult: '',
});

const paymentFormWithoutDefaultValues = ref({
  amount: '',
  reference: '',
  currency: 'GHS',
  payment_method: '',
  otp: '',
  phone: '',
  email: '',
  phoneResult: '',
});

// validation rules
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

watch(
  () => paymentForm.value.value.currency,
  (newValue, oldValue) => {
    emit('on-currency-change', newValue);
  }
);

watch(isOTPSuccessful, (newValue, oldValue) => {
  // Trigger something when the value changes
  isOTPSuccessful.value = newValue;
});

// ** Dialogue **//
const handleClose = () => {
  isOTPSuccessful.value = false;
  isPaymentSuccessful.value = false;
  selectedPaymentOption.value = null;
  isPaymentFailed.value = false;
  isPaymentLoading.value = false;
  paymentForm.value.value.otp = '';
};

function handleSendOTP(data: any) {
  paymentForm.value.value.phone = data.phone;
  console.log(data.phone);
  console.log(paymentForm.value.value.phone);
  paymentForm.value.value.email = data.email;
}

// opt re-send
function handleOTPResend() {
  sendOTP(paymentForm.value.value.phone, props.paymentLink?.toString()!);
}

// submit form function
function submitForm(invoicePaymentForm: any) {
  invoicePaymentForm.validate((valid: any) => {
    if (valid) {
      if (selectedPaymentOption.value !== null) {
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
  if (props.routeName === 'paymentlinks-id-business') {
    if (props.paymentLinkTemplateLink) {
      handlePaymentLinksTemplatePayment();
    } else {
      handlePaymentLinksPayment();
    }
  } else {
    handlePaymentInvoice();
  }
}

function handlePaymentLinksPayment() {
  const payload = {
    payment_method_id: selectedPaymentOption.value?.id,
    payment_details: {
      momo_number: paymentForm.value.value.phone,
      description: 'Payment link transaction',
      amount: paymentForm.value.value.amount,
      currency: paymentForm.value.value.currency,
      otp: paymentForm.value.value.otp,
      customer_firstname: 'john',
      customer_lastname: 'doe',
      customer_email: paymentForm.value.value.email
        ? paymentForm.value.value.email
        : 'me@you.com',
    },
  };

  pay(payload!, props.paymentCode?.toString()!);
}

function handlePaymentLinksTemplatePayment() {
  const payload = {
    payment_method_id: selectedPaymentOption.value?.id,
    payment_details: {
      momo_number: paymentForm.value.value.phone,
      description: 'Payment link transaction',
      amount: paymentForm.value.value.amount,
      currency: paymentForm.value.value.currency,
      otp: paymentForm.value.value.otp,
      customer_firstname: 'john',
      customer_lastname: 'doe',
      customer_email: paymentForm.value.value.email
        ? paymentForm.value.value.email
        : 'me@you.com',
    },
    meta: {
      payment_type: 'paymentLinkTemplate',
    },
  };

  pay(payload!, props.paymentCode?.toString()!);
}

function handlePaymentInvoice() {
  const payload = {
    payment_method_id: selectedPaymentOption.value?.id,
    payment_details: {
      momo_number: paymentForm.value.value.phone,
      description: 'Payment link transaction',
      amount: paymentForm.value.value.amount,
      currency: paymentForm.value.value.currency,
      otp: paymentForm.value.value.otp,
      customer_firstname: 'john',
      customer_lastname: 'doe',
      customer_email: paymentForm.value.value.email
        ? paymentForm.value.value.email
        : 'me@you.com',
    },
    meta: {
      payment_type: 'invoice',
      payment_type_id: `${props.invoice?.id}`,
    },
  };

  pay(payload!, props.paymentCode?.toString()!);
}

// make payment
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
</style>
