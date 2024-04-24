<template>
  <el-form ref="invoicePaymentFormz" :model="ruleForm"  :rules="rules" class="demo-ruleForm max-w-" size="default"
    status-icon>
    <h2 class="text-2xl">Make payment</h2>
    <p class="mb-5">Enter amount to pay and select payment method</p>

    <!-- amount & currency -->
    <div class="flex gap-x-2 mb-2">
      <div class="flex h-fit">
        <el-form-item prop="currency">
          <MazSelect v-model="ruleForm.currency" :disabled="disableDefaultFields" label="Select currency" color="warning"
            :options="['GHS', 'NGN', 'KSH']" />
        </el-form-item>
      </div>
      <!-- Input for amount -->
      <div class="flex-1">
        <el-form-item prop="amount">
          <MazInput class="w-full" key="lg" color="warning"  :disabled="disableDefaultFields"  v-model="ruleForm.amount" label="Enter Amount" size="md" />
        </el-form-item>
      </div>
    </div>

    <!-- Reference -->
    <el-form-item prop="reference">
      <p class="mb-2 font-semibold">Reference</p>
      <MazInput class="w-full" key="lg"color="warning" v-model="ruleForm.reference" label="Reference"
        placeholder="Pay for services" size="md" />
    </el-form-item>

    <div v-if="isPayentMethodsLoading" class="flex flex-col items-center w-full gap-y-3">
      <Icon class="text-2xl text-amber-600" name="eos-icons:bubble-loading" />
      <p class="text-sm">Loading payment options</p>
    </div>

    <!-- paymethodd -->
    <PaymentMethod v-else :options="paymentMethods!" v-model="selectedPaymentOption" class="flex-1" />

    <!-- submit button -->
    <MazBtn color="warning" size="sm" @click="submitForm(invoicePaymentFormz)" class="w-full mt-5">
      Proceed to payment {{ defaultValues.total }}
    </MazBtn>

    <MazDialog @close="handleClose" v-model="dialogVisible" :persistent="false" scrollable>
      <!-- <p class="text-lg">Confirm Payment</p> -->

      <PaymentConfirm :countries="countries" :paymentLink="paymentLink!" :amount="ruleForm.amount"
        :currency="ruleForm.currency" v-if="!isOTPSuccessful" :merchant="merchant" @send-otp="handleSendOTP"
        @on-opt-successfull="handleOTPSuccess" />

      <div v-else class="flex flex-col items-center">
        <!-- OT Field -->

        <Loading v-if="isPayingmentLoading" message="initiating payment authorizations" />

        <div v-else class="flex flex-col">
          <h2 class="text-2xl text-center">Enter OTP Code</h2>
          <p class="mb-5 text-gray-400 text-center">
            OTP code has been sent to your momo number, please enter to continue
          </p>
          <MazInputCode :code-length="6" size="xs" v-model="ruleForm.otp" class="flex flex-wrap justify-center"
            @completed="handlePayment" color="warning" />
        </div>

        <el-button class="reset-btn" link>Resend code</el-button>
        <!-- Resend button -->
      </div>
      <template #footer>
        <div class="w-full flex justify-center items-center gap-x-4 bg-gray-100 p-3 rounded-md">
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
import type { Invoice, InvoicePaymentForm, Merchant, PaymentDefaultValues, PaymentLinkTemplate, PaymentOption } from '~/types/index';
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'
import usePayment from '~/composables/usePayment';




// instance of pay 
const { isPayingmentLoading, isPaymentSuccessfull, pay } = usePayment();

// instance of api
const { $api } = useNuxtApp();

// togge dialog
const dialogVisible = ref(false);

// form instance
const invoicePaymentFormz = ref<FormInstance>();

// disable defualt fields
const disableDefaultFields = computed(() => {
  if(props.defaultValues.currency){
    return true;
  }else{
    return false
  }
})

// selected payment option
const selectedPaymentOption = ref<PaymentOption | null>(null);

// is OTP Successful
const isOTPSuccessful = ref(false);

// on otp successfull
function handleOTPSuccess(val: any) {
  console.log(val)
  isOTPSuccessful.value = val
}

// props
const props = defineProps<{
  paymentMethods: PaymentOption[];
  isPayentMethodsLoading: boolean;
  countries: any[];
  paymentLink?: string | string[];
  merchant: Merchant | undefined;
  routeName: string | null;
  invoice?: Invoice | undefined;
  paymentLinkTemplateLink?: PaymentLinkTemplate | undefined;
  paymentCode: string | undefined,
  defaultValues: PaymentDefaultValues

}>();

// emit
const emit = defineEmits(['on-currency-change'])




// forms
const ruleForm = ref({
  amount: props.defaultValues.total,
  reference: '',
  currency: props.defaultValues.currency,
  payment_method: '',
  otp: '',
  phone: '',
  email: '',
  phoneResult: '',
})

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
  () => ruleForm.value.currency,
  (newValue, oldValue) => {
    console.log(newValue)
    emit('on-currency-change', newValue)

  }
);






// ** Dialogue **//
const handleClose = (done: () => void) => {
  isOTPSuccessful.value = false;
  resetForm()
  selectedPaymentOption.value = null
  // paymentLinkStore.isOTPView = false;
  // paymentLinkStore.invoicePaymentForm.email = '';
  // paymentLinkStore.invoicePaymentForm.phone = '';
  // paymentLinkStore.OTPCode = '';
  // paymentLinkStore.isOTPSuccessfull = false;
};


function handleSendOTP(data: any) {
  console.log(data)
  ruleForm.value.phone = data.phone
  ruleForm.value.email = data.email

  console.log(ruleForm.value)
}

// watch to update pto
watch(isOTPSuccessful, (newValue, oldValue) => {
  // Trigger something when the value changes
  isOTPSuccessful.value = newValue
});



// submit form function
function submitForm(invoicePaymentFormz: any) {
  invoicePaymentFormz.validate((valid: any) => {
    if (valid) {
      if (selectedPaymentOption.value !== null) {
        console.log(selectedPaymentOption.value)
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

function resetForm() {
  invoicePaymentFormz.value!.resetFields();
}


function handlePayment() {
  console.log('hit')
  if (props.routeName === 'paymentlinks-id') {
      console.log('its payment link')
      
    if (props.paymentLinkTemplateLink) {
        console.log('hit regular')

      handlePaymentLinksTemplatePayment()

    } else {
      handlePaymentLinksPayment()
      console.log('hit templaye')

    }
  } else {
    console.log('its not payment link')

    handlePaymentInvoice()
  }
}



function handlePaymentLinksPayment() {

  const payload = {
    payment_method_id: selectedPaymentOption.value?.id,
    payment_details: {
      momo_number: ruleForm.value.phone,
      description: "Payment link transaction",
      amount: ruleForm.value.amount,
      currency: ruleForm.value.currency,
      otp: ruleForm.value.otp,
      customer_firstname: "john",
      customer_lastname: "doe",
      customer_email: ruleForm.value.email
    },
  }

  console.log(payload)
  console.log(payload)

  pay(payload!, props.paymentCode?.toString()!)
}

function handlePaymentLinksTemplatePayment() {

  const payload = {
    payment_method_id: selectedPaymentOption.value?.id,
    payment_details: {
      momo_number: ruleForm.value.phone,
      description: "Payment link transaction",
      amount: ruleForm.value.amount,
      currency: ruleForm.value.currency,
      otp: ruleForm.value.otp,
      customer_firstname: "john",
      customer_lastname: "doe",
      customer_email: ruleForm.value.email,
    },
    meta: {
        payment_type: "paymentlinktemplate"
      }
  }

  console.log(payload)
  console.log(payload)

  pay(payload!, props.paymentCode?.toString()!)
}

function handlePaymentInvoice() {

  const payload = {
    payment_method_id: selectedPaymentOption.value?.id,
    payment_details: {
      momo_number: ruleForm.value.phone,
      description: "Payment link transaction",
      amount: ruleForm.value.amount,
      currency: ruleForm.value.currency,
      otp: ruleForm.value.otp,
      customer_firstname: "john",
      customer_lastname: "doe",
      customer_email: ruleForm.value.email,
    },
    meta: {
        payment_type: "invoice",
        payment_type_id: `${props.invoice?.id}`
    }
  }

  console.log(payload)
  console.log(payload)

  pay(payload!, props.paymentCode?.toString()!)
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

.reset-btn {
  font-weight: bold;
  font-size: 14px;
  margin-top: 15px;
  color: var(--color-primary);
}
</style>
