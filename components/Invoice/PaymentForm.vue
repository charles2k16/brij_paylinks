<template>
    <el-form ref="invoicePaymentFormz" style="max-width: 600px" :model="invoiceStore.invoicePaymentForm" :rules="rules"
        label-width="auto" class="demo-ruleForm mt-5" size="default" status-icon>
        <!-- amount & currency -->
        <div class="flex gap-x-2 items-end">
            <div class="lg:w-[70%] w-[65%]">
                <el-form-item prop="amount">
                    <p class="mb-2 font-semibold">Amount to pay {{ invoiceStore.invoicePaymentForm.currency }}</p>
                    <el-input v-model="invoiceStore.invoicePaymentForm.amount" />
                </el-form-item>
            </div>

            <div class="lg:w-[30%] w-[35%]">
                <el-form-item prop="currency">
                    <el-select v-model="invoiceStore.invoicePaymentForm.currency" placeholder="Activity zone">
                        <el-option label="GHS" value="GHS" />
                        <el-option label="NGN" value="NGN" />
                        <el-option label="KSH" value="KSH" />
                    </el-select>
                </el-form-item>
            </div>
        </div>

        <!-- Reference -->
        <el-form-item prop="reference">
            <p class="mb-2 font-semibold">Reference</p>
            <el-input placeholder="Eg. Paying for services" v-model="invoiceStore.invoicePaymentForm.reference" />
        </el-form-item>
        <div v-if="isPaymentMethodDataLoading" class="flex flex-col items-center w-full gap-y-3">
            <Icon class="text-2xl text-amber-600" name="eos-icons:bubble-loading" />
            <p class="text-sm">Loading payment options</p>
        </div>
        
        <!-- paymethodd -->
        <PaymentMethod v-else :options="paymentOptiosnStore.paymentOptions?.data!"
            v-model="invoiceStore.SelectedPaymentOption" class="flex-1" />


        <!-- submit button -->
        <button type="button" @click="submitForm(invoicePaymentFormz)"
            class="flex-1 w-full secondary-custom-bg-color mt-5 px-4 flex flex-row py-2 flex-nowrap justify-center items-center gap-x-3 rounded-sm  text-teal-900 ">
            <Icon name="ep:money" size="25" />
            <p class="font-medium">Proceed to payment</p>
        </button>

        <!-- Confirm Payement for dialogue -->
        <el-dialog v-model="dialogVisible" class="rounded-md" title="Confirm payment" width="400"
            :before-close="handleClose">
            <!-- Invoice popup forms -->
            <InvoiceConfirmPaymentPopup v-if="!isOTPView" />
            <!-- otp -->
            <div v-else class="flex flex-col items-center">
                <!-- OT Field -->
                <OPTInput :digits-pin="invoiceStore.OTPCode" />
                <!-- OTP submit button -->
                <el-button size="large" class="w-full secondary-custom-bg-color mt-5"
                    @click="invoiceStore.verifyOTP">Confirm
                    code</el-button>
                <!-- Resend button -->
                <el-button class="reset-btn" link>Resend code</el-button> <!-- Resend button -->
            </div>
            <template #footer>
                <div class="w-full flex justify-center items-center gap-x-4 bg-gray-100 p-3 rounded-md">
                    <Icon class="text-xl text-teal-950" name="tdesign:secured" />
                    <p class="text-gray-600 font-bold text-sm">Secured by Brij</p>
                    <img src="/img/logo-dark.png" alt="logo" class="w-6" />
                </div>
            </template>
        </el-dialog>
    </el-form>


</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useInvoiceStore } from '~/store/invoice'
import { usePaymentOptions } from '~/store/payment_options'
import type { InvoicePaymentForm } from '~/types/index'
import type { PaymentMethods } from '~/types/index'


// instance of store
const invoiceStore = useInvoiceStore()
const paymentOptiosnStore = usePaymentOptions()

const { isPaymentMethodSelected, isOTPView } = storeToRefs(invoiceStore)
const { isPaymentMethodDataLoading } = storeToRefs(paymentOptiosnStore)




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
}>()


// ** Dialogue **//
const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
    invoiceStore.isOTPView = false;
    console.log('close');
    done();
    invoiceStore.invoicePaymentForm.email = "";
    invoiceStore.invoicePaymentForm.phone = "";
    invoiceStore.OTPCode = invoiceStore.OTPCode.map(() => "");
}

// ** Form **//
const invoicePaymentFormz = ref<FormInstance>()

// rules
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

// submit form function
function submitForm(invoicePaymentFormz: any) {
    invoicePaymentFormz.validate((valid: any) => {
        if (valid) {
            if (isPaymentMethodSelected.value === true) {
                // show popup
                dialogVisible.value = true
                // alert('success')
            } else {

                alert('Select payment method')

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