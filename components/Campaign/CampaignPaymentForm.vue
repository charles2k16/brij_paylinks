<template>
    <el-form ref="ruleFormRef" :model="paymentForm" :rules="rules">
        <p class="text-gray-400 text-sm mt-5 mb-2">Amount to donate</p>
        <div class="flex w-full gap-x-2 mb-2">
            <div class="flex h-fit border border-gray-300 rounded-sm py-3 px-3 gap-x-3 items-center">
                <!-- flag -->
                <img src="~/assets/images/ghana.png" height="25" width="25" alt="ghana_flag">
                <!-- currency code -->
                <p class="font-bold">GHC</p>
            </div>
            <!-- Input for amount -->
            <div class="flex-1">
                <el-form-item  prop="amount">
                    <el-input placeholder="Eg. 100" v-model="paymentForm.amount" clearable></el-input>
                </el-form-item>
            </div>
        </div>

        <!-- chips -->
        <div class="flex flex-wrap  rounded-md mt-5">
            <div v-for="(chip, index) in amountChips" :key="index" class="group">
                <button class="border-2 me-2 mb-2 border-teal-900 group-hover:bg-teal-900 py-0.5 px-3 rounded-md">
                    <p class="text-teal-950 font-bold text-sm group-hover:text-white">{{ chip.amount }}</p>
                </button>
            </div>
        </div>

        <!--Phone number field-->
        <p class="text-gray-400 text-sm mt-5 mb-2">Amount to donate</p>
        <div class="flex w-full gap-x-2 mb-2">
            <div class="flex h-fit border border-gray-300 rounded-sm py-3 px-3 gap-x-3 items-center">
                <!-- flag -->
                <img src="~/assets/images/ghana.png" height="25" width="25" alt="ghana_flag">
                <!-- currency code -->
                <p class="font-bold">+233</p>
            </div>
            <!-- Input for amount -->
            <div class="flex-1">
                <el-form-item  prop="phone">
                     <el-input placeholder="Eg. 0553904533" v-model="paymentForm.phone" clearable></el-input> 
                </el-form-item>
            </div>
        </div>


        <!-- Male payment & pledge button -->
        <!-- Buttons -->
        <div class="flex flex-row gap-y-2 md:flex-col gap-x-3 mt-8">
            <!-- Make paymnet button -->
            <button type="button" @click="submitForm(ruleFormRef)" 
                class="flex-1 secondary-custom-bg-color  px-4 flex flex-row py-2 flex-nowrap justify-center items-center gap-x-3 rounded-full  text-teal-900 ">
                <Icon name="ep:money" size="25" />
                <p class="font-medium">Make payment</p>
            </button>

            <!-- select payment menthod dialog -->
            <el-dialog v-model="paymentMethodialogVisible" :title="dialogueTitle" width="400" :before-close="handleClose">
                <!-- payment methods -->
                <CampaignPaymentMethod v-if="!showOtp"/>
                <CampaignOTP v-else/>
            </el-dialog>

            <!-- Pledge -->
            <button type="button"
                
                class=" flex-1 border border-teal-900 px-4 flex flex-row py-2 justify-center items-center gap-x-3 rounded-full hover:bg-teal-900 hover:text-white text-teal-900">
                <Icon name="majesticons:money-hand" size="25" />
                <p class="font-medium">Make Pledge</p>
            </button>
        </div>


        <!-- Copy Campaign link field -->
        <p class="text-gray-400 text-sm mt-16 mb-2">Campaign Link</p>
        <div class="flex justify-between  w-full gap-x-2 mb-2">
            <!-- Input for link -->
            <div class="flex-1">
                <el-input placeholder="Eg. 0553904533" v-model="campaignUrl" clearable></el-input>
            </div>
            <div>
                <button type="button"
                    class="flex-1 secondary-custom-bg-color px-4 flex flex-row py-3 flex-nowrap justify-center items-center gap-x-3 rounded-full  text-teal-900 ">
                    <Icon name="clarity:copy-to-clipboard-line" size="25" />
                    <p class="font-medium">Copy</p>
                </button>
            </div>
        </div>

        <!-- footer text -->
        <p class="text-center mt-10 text-sm">@ A collaboration by the Music Director, Youth Cordinator
            and Instrument Committee.</p>
    </el-form>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import {type PaymentForm} from '~/types/index';
import {usePaymentStore} from '~/store/payment';



// instance of tpayment store
const paymentStore = usePaymentStore();
const {showOtp,dialogueTitle} = storeToRefs(paymentStore);

// form instance
const ruleFormRef = ref<FormInstance>()

// payment forms model
const paymentForm = reactive<PaymentForm>({
    amount: '0',
    phone: ''
})

// validation rules
const rules = reactive<FormRules<PaymentForm>>({
  amount: [
    { required: true, message: 'Please input amount', trigger: 'blur',  },
  ],
  phone: [
    { required: true, message: 'Please input phone number', trigger: 'blur', },
    { min: 3, max: 10, message: 'Length should be up to 10 digits', trigger: 'blur' },
  ]

})

// submit form function
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {

      // toggle dialogue
      paymentMethodialogVisible.value = true

      // asign form values to store values
      paymentStore.paymentData = paymentForm

    } else {
      console.log('error submit!', fields)
    }
  })
}
// dummy url
const campaignUrl = ref('https://icones.js.org/collection/all?s=copy')

// amount chips
const amountChips = reactive([
    { amount: 7000 },
    { amount: 6000 },
    { amount: 5000 },
    { amount: 4000 },
    { amount: 3000 },
    { amount: 2000 },
    { amount: 500 },
    { amount: 400 },
    { amount: 300 },
    { amount: 200 },
    { amount: 100 },
    { amount: 50 },
    { amount: 10 },
    { amount: 1 },
])

// dialogue 
const paymentMethodialogVisible = ref(false)

  // on dialogue close
  const handleClose = (done: () => void) => {
    paymentStore.showOtp = false;
    done();
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