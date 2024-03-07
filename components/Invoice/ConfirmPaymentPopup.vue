<template>
    <div class="flex flex-col">
        <!-- Amount to be paid -->
        <h2 class="text-2xl font-semibold text-black">{{ invoicePaymentForm.amount }} {{ invoicePaymentForm.currency }}
        </h2>
        <p class="text-sm text-gray-400">Pay Bloom Impact Ltd.</p>

        <hr class="my-5">
        <el-form ref="invoicePaymentPopupFormz" style="max-width: 600px" :model="invoiceStore.invoicePaymentForm"
            :rules="rules" label-width="auto" class="demo-ruleForm" size="default" status-icon>
            <!-- Phone number -->
            <p class="mb-2 font-semibold">Pay with Momo Number</p>
            <div class="flex gap-x-2 items-end">
                <div class="lg:w-[30%] w-[30%]">
                    <el-form-item prop="currency">
                        <el-select disabled v-model="invoiceStore.invoicePaymentForm.currency"
                            placeholder="Activity zone">
                            <el-option label="GHS" value="GHS" />
                            <el-option label="NGN" value="NGN" />
                            <el-option label="KSH" value="KSH" />
                        </el-select>
                    </el-form-item>
                </div>
                <div class="lg:w-[70%] w-[70%]">
                    <el-form-item prop="phone">
                        <el-input v-model="invoiceStore.invoicePaymentForm.phone" />
                    </el-form-item>
                </div>
            </div>
            <!-- Email -->
            <el-form-item prop="email">
                <p class="mb-2 font-semibold">Email (Optional)</p>
                <el-input placeholder="Eg. johndoe@mail.com" v-model="invoiceStore.invoicePaymentForm.email" />
            </el-form-item>


            <!-- submit button -->
            <button type="button" @click="submitForm(invoicePaymentPopupFormz)"
                class="flex-1 w-full secondary-custom-bg-color mt-5 px-4 flex flex-row py-2 flex-nowrap justify-center items-center gap-x-3 rounded-sm  text-teal-900 ">
                <p class="font-medium">Continue</p>
            </button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useInvoiceStore } from '~/store/invoice'
import type { PaymentOption, InvoicePaymentForm } from '~/types/index'



// instance of staore
const invoiceStore = useInvoiceStore()
const {invoicePaymentForm} = storeToRefs(invoiceStore)


// ** FORM** //
const invoicePaymentPopupFormz = ref<FormInstance>()
// rules
const rules = reactive<FormRules<InvoicePaymentForm>>({
    phone: [
        { required: true, message: 'Please input phone number', trigger: 'blur', },
        { min: 10, max: 10, message: 'Length should be up to 10 digits', trigger: 'blur' },
    ],
    email: [
        { required: true, message: 'Please input Amount to pay ', trigger: 'blur' },
    ],
})
// submit form function
function submitForm(invoicePaymentPopupFormz: any) {
    invoicePaymentPopupFormz.validate((valid: any) => {
        if (valid) {
            invoiceStore.isOTPView = true;

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
}

.button-font-weight {
    font-weight: 900;
}

.primary-custom-text-color {
    color: #04383F;
}
</style>