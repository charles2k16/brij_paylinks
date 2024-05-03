<template>
  <div class="flex flex-col">
    <!-- Amount to be paid -->
    <h2 class="text-2xl font-semibold text-black dark:text-white">{{ amount }} {{ currency }}</h2>
    <p class="text-sm text-gray-400 dark:text-white mb-20">{{ merchant?.name }}</p>
    <el-form
      ref="invoicePaymentPopupForms"
      style="max-width: 600px"
      :model="ruleForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      size="default"
      status-icon>
      <!-- Phone number -->
      <el-form-item prop="phone">
        <MazPhoneNumberInput
          color="warning"
          label="Enter momo number"
          class="w-full dark:text-white"
          v-model="ruleForm.phone"
          show-code-on-list
          :only-countries="countries"
          default-country-code="GH"
          :ignored-countries="['AC']"
          @update="phoneResult = $event" />
      </el-form-item>

      <!-- Email -->
      <el-form-item prop="email">
        <MazInput
          class="w-full mt-5"
          key="lg"
          color="warning"
          v-model="ruleForm.email"
          label="Enter Email (Optional)"
          placeholder="johndoe@gmail.com"
          size="md" />
      </el-form-item>

      <!-- submit button -->
      <MazBtn
        :loading="isSendOTPLoading"
        color="warning"
        size="sm"
        @click="submitForm(invoicePaymentPopupForms)"
        class="w-full mt-5">
        Continue
      </MazBtn>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import type { InvoicePaymentForm, Merchant, SelectCountryResult } from '~/types/index';
import useSendOTP from '~/composables/useSendOTP'
// props
const props = defineProps<{
  countries: any[];
  paymentLink: string | string[];
  merchant: Merchant | undefined;
  amount: string;
  currency: string;
}>();

// emit

const emit = defineEmits(['send-otp', 'on-otp-successful']);

const invoicePaymentPopupForms = ref<FormInstance>();
const phoneResult = ref<SelectCountryResult>();
const { isOTPSuccessful, isSendOTPLoading, sendOTP } = useSendOTP();


// forms
const ruleForm = ref({
  phone: '',
  email: '',
  phoneResult: `${phoneResult.value?.e164}`,
});

// rules
const rules = reactive<FormRules<InvoicePaymentForm>>({
  phone: [{ required: true, message: 'Please input phone number', trigger: 'blur' }],
  email: [{ required: false, message: 'Please input  a valid email ', trigger: 'blur' }],
});

// Watch for changes in the 'isOTPSuccessful' variable and assign it to the store var
watch(isOTPSuccessful, (newValue, oldValue) => {
  // Trigger something when the value changes
  emit('on-otp-successful', isOTPSuccessful.value);
});

// initiate OTP
function initiateOTPRequest() {
  console.log('hit confirm')
  console.log(phoneResult.value?.e164!)
  console.log(props.paymentLink.toString()!)
  sendOTP(phoneResult.value?.e164!, props.paymentLink.toString()!)
}


// submit form function
function submitForm(invoicePaymentPopupForms: any) {
  invoicePaymentPopupForms.validate((valid: any) => {
    if (valid) {

      emit('send-otp', ruleForm.value);

      // send otp
      initiateOTPRequest()
    } else {
      return false;
    }
  });
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
</style>
