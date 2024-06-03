<template>
  <el-form
    ref="ruleForm"
    :model="general_form_data"
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
            v-model="general_form_data.currency"
            label="Select currency"
            color="warning"
            :disabled="defaultValues?.isDefault"
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
            :disabled="defaultValues?.isDefault"
            v-model="general_form_data.amount"
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
        v-model="general_form_data.reference"
        label="Reference"
        placeholder="Pay for services"
        size="md" />
    </el-form-item>

    <div v-if="isPaymentMethodDataLoading" class="flex flex-col items-center w-full gap-y-3">
      <Icon class="text-2xl text-amber-600" name="eos-icons:bubble-loading" />
      <p class="text-sm">Loading payment options</p>
    </div>

    <!-- payment_method -->
    <PaymentMethods
      v-else
      :options="paymentMethods || []"
      v-model="general_form_data.paymentOption"
      class="flex-1" />

    <!-- submit button -->
    <MazBtn
      color="warning"
      size="sm"
      @click="submitForm(ruleForm)"
      class="w-full mt-8">
      Proceed to payment {{ general_form_data.amount }}
    </MazBtn>

    <MazDialog
      @close="handleClose"
      v-model="dialogVisible"
      :persistent="false"
      width="500px"
      scrollable>
      
      <!-- momo pay form -->

      <MomoPayForm v-if="general_form_data.paymentOption?.fund_type == 'momo' || general_form_data.paymentOption?.fund_type == 'nigeriaussd' "
        :countries="countries"
        :payment-code="paymentCode"
        :merchant="merchant"
        :invoice="props.invoice"
        :payment-link-template="paymentLinkTemplate"
        :route-name="routeName"
    />
      <NigeriaBankTransferForm v-if="general_form_data.paymentOption?.fund_type == 'ngbanktransfer' "
        :countries="countries"
        :payment-code="paymentCode"
        :merchant="merchant"
        :invoice="props.invoice"
        :payment-link-template="paymentLinkTemplate"
        :route-name="routeName"
    />


    <!-- nigeria bank transfer fpr -->
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
    <!-- <MazDialog v-model="isPaymentSuccessful" width="380px" :on-close="handleClose">
      <div class="flex flex-col justify-center items-center">
        <Icon class="text-6xl text-green-700" name="ri:send-plane-line" />
        <h2 class="text-2xl mt-3">{{ paymentSuccessTitle }}</h2>
        <p class="text-center">You have successfully made payment to this merchant.</p>

        <div class="w-full border border-gray-200 p-5 mt-5 rounded-md">
          <p class="text-lg">
            You paid an amount of
            <span class="font-semibold"
              >{{ general_form_data.currency }} {{ general_form_data.amount }} </span
            >to
            <span class="font-semibold">{{ merchant?.name }}</span>
          </p>
        </div>
        <div class="mt-10"></div>
      </div>
      <template #footer="{ close }">
        <MazBtn color="warning" @click="close"> Go back </MazBtn>
      </template>
    </MazDialog> -->

    <!-- <MazDialog v-model="isPaymentFailed" width="380px" :on-close="handleClose">
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
    <!-- </MazDialog> -->
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
  PaymentLinkTemplate,
  PaymentOption,
} from '~/types/index';
import { ElMessage } from 'element-plus';
import useMomoPayment from '~/composables/useMomoPayment';
import {usePaymentForm} from '~/store/payment_forms';
// instance of payment forms
const paymentForm = usePaymentForm()

const {general_form_data} = storeToRefs(paymentForm)

// instance of momo pay
const { isPaymentFailed, isPaymentLoading, isPaymentSuccessful } = useMomoPayment()


// toggle dialog
const dialogVisible = ref(false);


// form instance
const ruleForm = ref<FormInstance>();



// props
const props = defineProps<{
  paymentMethods: PaymentOption[];
  isPaymentMethodDataLoading: boolean;
  countries: any[];
  merchant: Merchant | null;
  routeName: string | null;
  invoice: Invoice | null;
  paymentLinkTemplate: PaymentLinkTemplate | null;
  paymentCode: string | null;
  defaultValues: PaymentDefaultValues | null;
}>();

const emit = defineEmits(['on-currency-change']);

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
  () => general_form_data.value.currency,
  (newValue, oldValue) => {
    emit('on-currency-change', newValue);
  }
);



const isDefaultValues = computed(() => {
  if(props.defaultValues?.currency){
    return true;
  }else{
    return false
  }
})


// ** Dialogue **//
const handleClose = () => {
  isPaymentSuccessful.value = false;
  general_form_data.value.paymentOption  = null;
  isPaymentFailed.value = false;
  isPaymentLoading.value = false;
  // paymentForm.value.value.otp = '';
};



// submit form function
function submitForm(ruleForm: any) {
  ruleForm.validate((valid: any) => {
    if (valid) {
      if (general_form_data.value.paymentOption !== null) {
        // show popup
      dialogVisible.value = true;

        // alert('success')
        console.log(dialogVisible)
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
