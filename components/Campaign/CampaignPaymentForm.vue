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
                <el-form-item prop="amount">
                    <el-input placeholder="Eg. 100" v-model="paymentForm.amount" clearable></el-input>
                </el-form-item>
            </div>
        </div>

        <!-- chips -->
        <div class="flex flex-wrap  rounded-md mt-1">
            <div v-for="(chip, index) in amountChips" :key="index" class="group">
                <button type="button"
                    class="border-2 me-2 mb-2 border-teal-900 group-hover:bg-teal-900 py-0.5 px-3 rounded-md">
                    <p class="text-teal-950 font-bold text-sm group-hover:text-white">{{ chip.amount }}</p>
                </button>
            </div>
        </div>

        <!--Phone number field-->
        <p class="text-gray-400 text-sm mt-5 mb-2">Phone number</p>
        <div class="flex w-full gap-x-2 mb-2">
            <div class="flex h-fit border border-gray-300 rounded-sm py-3 px-3 gap-x-3 items-center">
                <!-- flag -->
                <img src="~/assets/images/ghana.png" height="25" width="25" alt="ghana_flag">
                <!-- currency code -->
                <p class="font-bold">+233</p>
            </div>
            <!-- Input for amount -->
            <div class="flex-1">
                <el-form-item prop="phone">
                    <el-input placeholder="Eg. 0553904533" v-model="paymentForm.phone" clearable></el-input>
                </el-form-item>
            </div>
        </div>


        <!-- Make payment & pledge button -->
        <!-- Buttons -->
        <div class="flex flex-row gap-y-2 md:flex-col gap-x-3 mt-8">
            <!-- Make paymnet button -->
            <button type="button" @click="submitForm(ruleFormRef)"
                class="flex-1 secondary-custom-bg-color  px-4 flex flex-row py-2 flex-nowrap justify-center items-center gap-x-3 rounded-full  text-teal-900 ">
                <Icon name="ep:money" size="25" />
                <p class="font-medium">Make payment</p>
            </button>


            <!-- select payment menthod dialog -->
            <el-dialog v-model="paymentMethodialogVisible" :title="dialogueTitle" width="440"
                :before-close="handleClose">
                    <pre>
                        {{ selectedPaymentOption }}
                    </pre>
                <div  v-if="!isOTPSuccessfull"  class="flex flex-col justify-center items-center">
                    <!-- payment methods -->
                    <PaymentMethod :options="props.paymentOptions.data"
                        v-model="campaignStore.selectedPaymentOption" class="flex-1" />
                    <!-- Continue -->
                    <!-- <button v-if="isPaymentMethodSelected" :disabled="!isPaymentMethodSelected" @click="initiateOTPRequest" type="button"
                        class="flex-1 secondary-custom-bg-color w-full mt-5 px-4 flex flex-row py-2 flex-nowrap justify-center items-center gap-x-3 rounded-full  text-teal-900 ">
                        <p v-if="isSendOTPLoading">Sending OTP .....</p>
                        <p v-else class="font-bold">Continue</p>
                    </button> -->
                    <el-button :loading="isSendOTPLoading" v-if="isPaymentMethodSelected" :disabled="!isPaymentMethodSelected" @click="initiateOTPRequest" size="large" class="w-full secondary-custom-bg-color mt-5" round>
                        <p v-if="isSendOTPLoading">Sending OTP .....</p>
                        <p v-else class="font-bold">Continue</p>
                    </el-button>
                    

                    <div v-else class="text-sm text-gray-500 mt-5">Select payment to  continue</div>
                </div>

                <!-- otp -->
                <div v-else class="flex flex-col items-center">
                    <!-- OT Field -->
                    <OPTInput :digits-pin="campaignStore.otpCode" />
                    <!-- OTP submit button -->
                    <el-button v-if="isOtpCodeFilled" :loading="isPayingmentLoading" size="large" class="w-full secondary-custom-bg-color mt-5"
                        @click="campaignStore.payDonation(paymentForm.amount, paymentForm.phone)" round>Enter OTP Code to continue</el-button>
                    <!-- Resend button -->
                    <el-button :loading="isSendOTPLoading" @click="initiateOTPRequest()" class="reset-btn" link>
                        <p v-if="isSendOTPLoading">Resending OTP Code ...</p>
                         <p v-else>Re send OTP Code</p>
                    </el-button> <!-- Resend button -->
                </div>
                <!-- button -->

            </el-dialog>
        </div>


        <!-- Copy Campaign link field -->
        <div class="mt-10" >
            <CampaignCopyLink :url="campaignUrl"/>
        </div>

        
        <!-- footer text -->
        <p class="text-center mt-10 text-gray-400 text-sm">{{ props.campaign?.footnote }}</p>
    </el-form>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { type Campaign, type CampaignPaymentForm } from '~/types/index';
import { useCampaignStore } from '~/store/campaign';
import { type PaymentMethods } from '~/types/index'



// instance of tpayment store
const campaignStore = useCampaignStore();
const { dialogueTitle, isOTPSuccessfull,  isPaymentMethodSelected, selectedPaymentOption, isPayingmentLoading, isOtpCodeFilled, isSendOTPLoading } = storeToRefs(campaignStore);

// form instance
const ruleFormRef = ref<FormInstance>()


// payment forms model
const paymentForm = reactive<CampaignPaymentForm>({
    amount: '1',
    phone: ''
})

// props
const props = defineProps<{
    paymentOptions: PaymentMethods,
    campaign: Campaign | null
}>()

  // campaign url
  const campaignUrl = ref(
    `https://pay.brij.money/campaign/${props.campaign?.campaign_link}`
  );


// validation rules
const rules = reactive<FormRules<CampaignPaymentForm>>({
    amount: [
        { required: true, message: 'Please input amount', trigger: 'blur', },
    ],
    phone: [
        { required: true, message: 'Please input phone number', trigger: 'blur', },
        { min: 10, max: 10, message: 'Length should be up to 10 digits', trigger: 'blur' },
    ]
})


function submitForm(ruleFormRef: any) {
    ruleFormRef.validate((valid: any) => {
        if (valid) {
            // alert('submit!');

            //asign form values to store values
            paymentMethodialogVisible.value = true

        } else {
            console.log('error submit!!');
            return false;
        }
    });
}

function initiateOTPRequest() {
    console.log('send ot test')
    campaignStore.sendOTP(paymentForm.phone)
}

function makePayment(){
    console.log('hitting payment')
    campaignStore.payDonation(paymentForm.amount, paymentForm.phone)
}


// amount chips
const amountChips = reactive([
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
    done();
    campaignStore.isOTPSuccessfull = false;
    campaignStore.selectedPaymentOption = null;
    campaignStore.otpCode = campaignStore.otpCode.map(() => "");

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

.reset-btn {
    font-weight: bold;
    font-size: 14px;
    margin-top: 15px;
    color: var(--color-primary);
}
</style>