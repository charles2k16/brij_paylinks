<template>
    <div class="flex flex-col">
        <!-- Amount to be paid -->
        <h2 class="text-2xl font-semibold text-black">{{ invoicePaymentForm.amount }} {{ invoicePaymentForm.currency }}
        </h2>
        <p class="text-sm text-gray-400">{{ merchant?.data.name }}</p>

        <hr class="my-5">
        <el-form ref="invoicePaymentPopupFormz" style="max-width: 600px" :model="invoiceStore.invoicePaymentForm"
            :rules="rules" label-width="auto" class="demo-ruleForm" size="default" status-icon>
            <!-- Phone number -->
            <el-form-item prop="phone">
                <MazPhoneNumberInput color="warning" label="Emter momo number" class="w-full"
                    v-model="invoiceStore.invoicePaymentForm.phone" show-code-on-list :only-countries="countries"
                    default-country-code="GH" :ignored-countries="['AC']" @update="phoneResult = $event" />
            </el-form-item>

            <!-- Email -->
            <el-form-item prop="email">
                <MazInput class="w-full mt-5" key="lg" color="warning" v-model="invoiceStore.invoicePaymentForm.email"
                    label="Enter Email (Optional)" placeholder="johndoe@gmail.com" size="md" />
            </el-form-item>


            <!-- submit button -->
            <MazBtn color="warning" :loading="isSendOTPLoading" size="sm" @click="submitForm(invoicePaymentPopupFormz)"
                class="w-full mt-5">
                Continue
            </MazBtn>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useInvoiceStore } from '~/store/invoice'
import type { InvoicePaymentForm, SelectCountryResult } from '~/types/index'

// props
const props = defineProps<{
    countries: any[]
}>()

// instance of staore
const invoiceStore = useInvoiceStore()
const { invoicePaymentForm, merchant, invoice,  } = storeToRefs(invoiceStore)
const invoicePaymentPopupFormz = ref<FormInstance>()
const phoneResult = ref<SelectCountryResult>()
const { isOTPSuccessfull, isSendOTPLoading, sendOTP } = useSendOTP();


// rules
const rules = reactive<FormRules<InvoicePaymentForm>>({
    phone: [
        { required: true, message: 'Please input phone number', trigger: 'blur', },
    ],
    email: [
        { required: true, message: 'Please input Email address', trigger: 'blur' },
    ],
})



// submit form function
function submitForm(invoicePaymentPopupFormz: any) {
    invoicePaymentPopupFormz.validate((valid: any) => {
        if (valid) {
            invoiceStore.isOTPView = true;
            invoiceStore.invoicePaymentForm.phone = phoneResult.value?.e164!

            sendOTP(invoicePaymentForm.value.phone!, invoice.value?.payment_code!)

            // Watch for changes in the 'isOTPSuccessfull' variable and assign it to the store var
            watch(isOTPSuccessfull, (newValue, oldValue) => {
                // Trigger something when the value changes
                invoiceStore.isOTPSuccessfull = newValue
            });

            //asign form values to store values
        } else {
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
}

.button-font-weight {
    font-weight: 900;
}

.primary-custom-text-color {
    color: #04383F;
}
</style>