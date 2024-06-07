<template>

  <div>
    <div class="flex flex-col">
      <!-- Amount to be paid -->
      <h2 class="text-2xl font-semibold text-black dark:text-white">
        {{ general_form_data.amount }} {{ general_form_data.currency }}  
      </h2>
      <div class="flex flex-wrap items-center mb-20 gap-x-3">
        <p class="text-sm text-gray-400 dark:text-white ">{{ merchant?.name }}</p>
         <div class="w-1 h-1 bg-black rounded-full dark:bg-gray-400"></div>
        <p class="text-sm text-gray-400 dark:text-white">{{ general_form_data.paymentOption?.description }}</p>

      </div>
    </div>

    <MazStepper color="warning" auto-validate-steps :model-value="step">
      <template #title-1>
        Phone number & Email
      </template>
      <template #subtitle-1>
        Enter your phone number and email.
      </template>
      <!-- <template #title-info-1>
        Required
      </template> -->
      <template #content-1="{ nextStep, previousStep  }">

        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm"
          size="default" status-icon>
          <el-form-item prop="phone">
            <MazPhoneNumberInput color="warning" label="Enter momo number" class="w-full dark:text-white"
              v-model="ruleForm.phone" show-code-on-list :only-countries="countries" default-country-code="GH"
              :ignored-countries="['AC']" @update="phoneResult = $event" />
          </el-form-item>

          <!-- Email -->
          <el-form-item prop="email">
            <MazInput class="w-full mt-5" key="lg" color="warning" v-model="ruleForm.email"
              label="Enter Email (Optional)" placeholder="johndoe@gmail.com" size="md" />
          </el-form-item>

          <!-- submit button -->
          <MazBtn :loading="isSendOTPLoading" color="warning" size="sm" @click="submitForm(ruleFormRef)"
            class="w-full mt-5">
            Continue
          </MazBtn>
        </el-form>
      </template>



      <template #title-2>
        Enter OTP Code
      </template>
      <template #subtitle-2>
        Initiate payment.
      </template>
      <template v-if="isPaymentLoading" #title-info-2>
        <Icon class="text-4xl text-amber-400" name="line-md:loading-alt-loop"/>
      </template>
      <template #content-2="{ nextStep, previousStep }">
  
        <MazInputCode color="warning" size="xs" :codeLength="6" v-model="ruleForm.otp" @completed="handlePayment"  class="flex flex-wrap justify-start mt-10"/>
        <div class="flex justify-between mt-10">
          <MazBtn color="transparent" size="sm" @click="previous()" class="w-1/2">Go back</MazBtn>
          <MazBtn color="warning" size="sm" @click="initiateOTPRequest" :loading="isSendOTPLoading" class="w-1/2">Resend code</MazBtn>

        </div>
      </template>

      <template #title-3>
        Complete payment
      </template>
      <template #subtitle-3>
        Visit your internet banking app
        </template>
      <template #content-3="{ nextStep, previousStep }">
        <div>
          <Loading :message="statusText" v-if="isPaymentConfirmationLoading" />
          <div class="flex flex-col w-full p-6 border border-gray-100 rounded-md momo-fo dark:border-gray-700">
            <h3 class="mb-4 text-base">What you will do :</h3>

            <div class="flex gap-x-4 ">
              <div class="flex items-center justify-center w-5 h-5 text-black rounded-full bg-amber-400">
                <h3 class="text-base">-</h3>
              </div>
              <h3 class="text-sm w-[90%]">Please proceed to your internet banking app to complete this transaction.
              </h3>
            </div>


            <div class="flex flex-col w-full p-4 mt-10 border border-gray-100 rounded-md dark:border-gray-700 gap-y-3">
              <div v-for="(transaction, index) in transactionDetail" :key="index" class="flex justify-between">
                <p class="text-sm">{{ transaction.name }}</p>
                <h3 class="text-sm">{{ transaction.value }}</h3>
              </div>
            </div>

            <MazBtn color="warning" size="sm" :loading="isPaymentConfirmationLoading" @click="confirmNigeriaBankTransferPayment(general_form_data.paymentOption?.id!)" class="w-full mt-10">Confirm payment</MazBtn>

          </div>
        </div>
      </template>


    </MazStepper>

  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { Invoice, Merchant, MomoFormData, SelectCountryResult, PaymentLinkTemplate } from '~/types/index';
import useSendOTP from '~/composables/useSendOTP';
import useNigeriaBankTransferPayment from '~/composables/useNigeriaBankTransferPayment';
import { usePaymentForm } from '~/store/payment_forms'
import MazInputCode from 'maz-ui/components/MazInputCode'

const paymentForm = usePaymentForm();
const { general_form_data } = storeToRefs(paymentForm)
// use otp
const { isOTPSuccessful, isSendOTPLoading, sendOTP } = useSendOTP();
// use Momo payment
const { isPaymentFailed, isPaymentLoading, isPaymentSuccessful, transactionDetail, confirmNigeriaBankTransferPayment, failedReceiptData, isPaymentConfirmationLoading, successReceiptData, isPaymentPromptInitiated, pay, statusText } = useNigeriaBankTransferPayment()

// props

const props = defineProps<{
  countries: any[];
  paymentCode: string | null;
  merchant: Merchant | null;
  invoice: Invoice | null;
  paymentLinkTemplate: PaymentLinkTemplate | null;
  routeName: string | null;
}>();

const step = ref(1);
const phoneResult = ref<SelectCountryResult>();
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<MomoFormData>({
  phone: '',
  email: '',
  otp: '',


})


// rules
const rules = reactive<FormRules<MomoFormData>>({
  phone: [{ required: true, message: 'Please input phone number', trigger: 'blur' }],
  email: [{ required: false, message: 'Please input  a valid email ', trigger: 'blur' }],
});


// initiate OTP
function initiateOTPRequest() {
  console.log('hit confirm');
  console.log(props.paymentCode!.toString()!);
  sendOTP(ruleForm.phone!, props.paymentCode!.toString()!);
}

// submit form function
function submitForm(ruleFormRef: any) {
  ruleFormRef.validate((valid: any) => {
    if (valid) {
      // send otp
      initiateOTPRequest();

      if(isOTPSuccessful.value === true){
        next()
      }

    } else {
      return false;
    }
  });
}

// get +233****** from entered number
function onPhoneUpdate(val:any){
  ruleForm.phone = val.e164
}



function next() {
  return step.value ++;
}

function previous() {
  isOTPSuccessful.value = false;
  return step.value --;
}


// handle payment
function handlePayment() {
  if (props.routeName === 'paymentlinks-id-business') {
    if (props.paymentLinkTemplate?.amount) {
      handlePaymentLinksTemplatePayment();
    } else {
      handlePaymentLinksPayment();
    }
  } else {
    handlePaymentInvoice();
  }

  if(isPaymentPromptInitiated.value === true){
    next()
  }
}

function handlePaymentLinksPayment() {
  const payload = {
    payment_method_id: general_form_data.value.paymentOption?.id,
    payment_details: {
      momo_number: ruleForm.phone,
      description: 'Payment link transaction',
      amount: general_form_data.value.amount,
      currency: general_form_data.value.currency,
      otp: ruleForm.otp,
      customer_firstname: 'john',
      customer_lastname: 'doe',
      customer_email: ruleForm.email
        ? ruleForm.email
        : 'me@you.com',
    },
  };

  pay(payload!, props.paymentCode?.toString()!);


}

function handlePaymentLinksTemplatePayment() {
  const payload = {
    payment_method_id: general_form_data.value.paymentOption?.id,
    payment_details: {
      momo_number: ruleForm.phone,
      description: 'Payment link transaction',
      amount: general_form_data.value.amount,
      currency: general_form_data.value.currency,
      otp: ruleForm.otp,
      customer_firstname: 'john',
      customer_lastname: 'doe',
      customer_email: ruleForm.email
        ? ruleForm.email
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
    payment_method_id: general_form_data.value.paymentOption?.id,
    payment_details: {
      momo_number: ruleForm.phone,
      description: 'Payment link transaction',
      amount: general_form_data.value.amount,
      currency: general_form_data.value.currency,
      otp: ruleForm.otp,
      customer_firstname: 'john',
      customer_lastname: 'doe',
      customer_email: ruleForm.email
        ? ruleForm.email
        : 'me@you.com',
    },
    meta: {
      payment_type: 'invoice',
      payment_type_id: `${props.invoice?.id}`,
    },
  };

  pay(payload!, props.paymentCode?.toString()!);
}






// next 
watch(isOTPSuccessful, (newValue, oldValue) => {
  console.log(newValue, oldValue)
  if (isOTPSuccessful.value === true) {
    next();
  }
});
</script>
<style>
  
</style>