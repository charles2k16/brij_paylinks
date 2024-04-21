<template>
  <div class="flex flex-col">
    <!-- Amount to be paid -->
    <h2 class="text-2xl font-semibold text-black">
      {{ invoicePaymentForm.amount }} {{ invoicePaymentForm.currency }}
    </h2>
    <p class="text-sm text-gray-400">Pay Bloom Impact Ltd.</p>
    {{ paymentLink }}

    <hr class="my-5" />
    <el-form
      ref="invoicePaymentPopupFormz"
      style="max-width: 600px"
      :model="paymentLinkStore.invoicePaymentForm"
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
      size="default"
      status-icon>
      <!-- Phone number -->
      <el-form-item prop="phone">
        <MazPhoneNumberInput
          color="warning"
          label="Emter momo number"
          class="w-full"
          v-model="paymentLinkStore.invoicePaymentForm.phone"
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
          v-model="paymentLinkStore.invoicePaymentForm.email"
          label="Enter Email (Optional)"
          placeholder="johndoe@gmail.com"
          size="md" />
      </el-form-item>

      <!-- submit button -->
      <MazBtn
        :loading="isSendOTPLoading"
        color="warning"
        size="sm"
        @click="submitForm(invoicePaymentPopupFormz)"
        class="w-full mt-5">
        Continue
      </MazBtn>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';
import { usePaymentLinkStore } from '~/store/payment_links';
import type { InvoicePaymentForm, SelectCountryResult } from '~/types/index';

// props
const props = defineProps<{
  countries: any[];
  paymentLink: string | string[];
}>();

// instance of staore
const paymentLinkStore = usePaymentLinkStore();
const { invoicePaymentForm, isSendOTPLoading } = storeToRefs(paymentLinkStore);
const invoicePaymentPopupFormz = ref<FormInstance>();
const phoneResult = ref<SelectCountryResult>();

// rules
const rules = reactive<FormRules<InvoicePaymentForm>>({
  phone: [{ required: true, message: 'Please input phone number', trigger: 'blur' }],
  email: [{ required: true, message: 'Please input Amount to pay ', trigger: 'blur' }],
});

// submit form function
function submitForm(invoicePaymentPopupFormz: any) {
  invoicePaymentPopupFormz.validate((valid: any) => {
    if (valid) {
      paymentLinkStore.isOTPView = true;
      paymentLinkStore.invoicePaymentForm.phone = phoneResult.value?.e164!;

      paymentLinkStore.sendOTP(props.paymentLink.toString());
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
