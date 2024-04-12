<template>
  <el-form ref="invoicePaymentFormz" :model="invoiceStore.invoicePaymentForm" :rules="rules" 
      class="demo-ruleForm max-w-" size="default" status-icon>

  <h2 class="text-2xl">Make payment</h2>
  <p class="mb-5">Enter amount to pay and select payment method</p>

      <!-- amount & currency -->

      <div class="flex w- gap-x-2 mb-2">
          <div class="flex h-fit">
              <el-form-item prop="currency">
                  <MazSelect v-model="invoiceStore.invoicePaymentForm.currency" label="Select currency"
                      color="warning" :options="['GHS', 'NGN', 'KSH']" />
              </el-form-item>
          </div>
          <!-- Input for amount -->
          <div class="flex-1">
              <el-form-item prop="amount">
                  <MazInput class="w-full" key="lg" color="warning" v-model="invoiceStore.invoicePaymentForm.amount"
                      label="Enter Amount" size="md" />
              </el-form-item>
          </div>
      </div>

      <!-- Reference -->
      <el-form-item prop="reference">
          <p class="mb-2 font-semibold">Reference</p>
          <MazInput class="w-full" key="lg" color="warning" v-model="invoiceStore.invoicePaymentForm.reference"
              label="Reference" placeholder="Pay for services" size="md" />
      </el-form-item>

      <div v-if="isPaymentMethodDataLoading" class="flex flex-col items-center w-full gap-y-3">
          <Icon class="text-2xl text-amber-600" name="eos-icons:bubble-loading" />
          <p class="text-sm">Loading payment options</p>
      </div>

      <!-- paymethodd -->
      <PaymentMethod v-else :options="paymentOptiosnStore.paymentOptions?.data!"
          v-model="invoiceStore.SelectedPaymentOption" class="flex-1" />


      <!-- submit button -->


      <MazBtn color="warning" size="sm" @click="submitForm(invoicePaymentFormz)" class="w-full mt-5" rounded>
          Procedd to payment
      </MazBtn>

      <MazDialog @close="handleClose" v-model="dialogVisible" :persistent="false" >
          <!-- <p class="text-lg">Confirm Payment</p> -->
          <InvoiceConfirmPaymentPopup :countries="countries" v-if="!isOTPView" />
          <div v-else class="flex flex-col items-center">
              <!-- OT Field -->
              <MazInputCode  :code-length="6" size="xs" v-model="invoiceStore.OTPCode" class="flex flex-wrap justify-center" @completed="invoiceStore.verifyOTP" color="warning"  />

              <el-button class="reset-btn" link>Resend code</el-button> <!-- Resend button -->
          </div>
          <template #footer>
              <div class="w-full flex justify-center items-center gap-x-4 bg-gray-100 p-3 rounded-md">
                  <Icon class="text-xl text-teal-950" name="tdesign:secured" />
                  <p class="text-gray-600 font-bold text-sm">Secured by Brij</p>
                  <img src="/img/logo-dark.png" alt="logo" class="w-6" />
              </div>
          </template>
      </MazDialog>

      <!-- Confirm Payement for dialogue -->
  </el-form>



</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useInvoiceStore } from '~/store/invoice'
import { usePaymentOptions } from '~/store/payment_options'
import type { InvoicePaymentForm } from '~/types/index'
import type { PaymentMethods } from '~/types/index'
import { ElMessage } from 'element-plus'


// instance of store
const invoiceStore = useInvoiceStore()
const paymentOptiosnStore = usePaymentOptions()
const { isPaymentMethodSelected, isOTPView } = storeToRefs(invoiceStore)
const { isPaymentMethodDataLoading } = storeToRefs(paymentOptiosnStore)
const dialogVisible = ref(false)
const invoicePaymentFormz = ref<FormInstance>()
  const rules = reactive<FormRules<InvoicePaymentForm>>({
  amount: [
      { required: true, message: 'Please input Amount to pay ', trigger: 'blur' },
  ],
  reference: [
      { required: true, message: 'Please input Reference ', trigger: 'blur' },
  ],
  currency: [
      {
          required: true,
          message: 'Please select Currency',
          trigger: 'change',
      },
  ],
})



// watch the selected currency and request the payment options from api
watch(
  () => invoiceStore.invoicePaymentForm.currency,
  (newValue, oldValue) => {
      console.log(`Age changed from ${oldValue} to ${newValue}`);
      paymentOptiosnStore.getPaymentMethod(invoiceStore.invoicePaymentForm.currency)
  }
);

// props
const props = defineProps<{
  paymentOptions: PaymentMethods
  countries:any[]
}>()


// ** Dialogue **//
const handleClose = (done: () => void) => {
  invoiceStore.isOTPView = false;
  console.log('close');
  done();
  invoiceStore.invoicePaymentForm.email = "";
  invoiceStore.invoicePaymentForm.phone = "";
  invoiceStore.OTPCode = ""
}

// ** Form **//

// rules


// submit form function
function submitForm(invoicePaymentFormz: any) {
  invoicePaymentFormz.validate((valid: any) => {
      if (valid) {
          if (isPaymentMethodSelected.value === true) {
              // show popup
              dialogVisible.value = true
              // alert('success')
          } else {

              ElMessage({
                  message: 'Please select a payment method to continue.',
                  type: 'warning',
              })


          }

          //asign form values to store values
      } else {
          console.log('error submit!!');
          return false;
      }
  });
}





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
  color: #04383F;
}

.button-font-weight {
  font-weight: 900;
}

.primary-custom-text-color {
  color: #04383F;
}

.reset-btn {
  font-weight: bold;
  font-size: 14px;
  margin-top: 15px;
  color: var(--color-primary);
}
</style>