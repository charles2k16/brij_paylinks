<template>
    <div class="flex flex-col gap-y-8  items-start">
        <!-- text -->
        <div class="flex flex-col">
            <p class="text-2xl font-bold text-teal-900">Confirm OTP</p>
            <p class="text-sm">A 6-digit Code has been sent to your number</p>
        </div>
        <!-- Pin code fields -->
        <div class="pin-code flex flex-row gap-x-1">
            <input class="pin-code" v-for="(digit, index) in digitPin" :key="index" :ref="`digitInput${index}`"
                v-model="digitPin[index]" type="number" maxlength="1" @input="handleInput(index)"
                @keydown="handleKeydown(index, $event)" />
        </div>
        <!-- Resend button -->

        <el-button size="large" class="w-full secondary-custom-bg-color" @click="verifyOTP" round>Resend code</el-button>

        <el-button class="reset-btn" link >Resend code</el-button>

    </div>
</template>
<script setup lang="ts">
import { ElNotification } from 'element-plus'
import {usePaymentStore} from '~/store/payment'

// intsance of payment store
const paymentStore = usePaymentStore();

const emit = defineEmits(['sendOtp'])
const digitPin = reactive(['', '', '', '', '', ''])


function handleInput(index: number) {
    if (digitPin[index] !== '') {
        if (index < digitPin.length - 1) {
            const nextInput: any = document.querySelector(
                `.pin-code input:nth-child(${index + 2})`
            )
            if (nextInput) {
                nextInput.focus()
            }
        } else {
            // All inputs are filled, trigger your action here
            emit('sendOtp', digitPin.join(''))
        }
    }
}

function handleKeydown(index: number, event: any) {
    if (
        event.key === 'Backspace' &&
        digitPin[index] === '' &&
        index > 0
    ) {
        const previousInput: any = document.querySelector(
            `.pin-code input:nth-child(${index})`
        )
        if (previousInput) {
            previousInput.focus()
        }
    }
}

const verifyOTP = () => {
    ElNotification({
    title: 'Payment made successfully',
    message: 'You have successfully donated to New Gate Fundraiser Campaign :)',
    type: 'success',
    duration: 0,
  })

  // make showOTP var false after its successfull
  paymentStore.showOtp = false;
}

    //  async function resendOtp() {
    //   this.pageLoading = true

    //   try {
    //     const payload = {
    //       phone: '+' + this.phoneNumber,
    //     }
    //     const response = await this.$usersApi.resendOtp(payload)
    //     this.mixins.getNotification(response.message, 'success')
    //     this.pageLoading = false
    //   } catch (error) {
    //     this.pageLoading = false
    //     this.mixins.catchError(error)
    //   }
    // }
</script>
<style scoped>
.pin-code input {
    border: 1.5px solid #c8cace;
    border-radius: 8px;
    text-align: center;
    width: 55px;
    height: 60px;
    font-size: 34px;
    color: var(--color-primary);

    /* @media (min-device-width: 700px) and (max-device-width: 1524px) {
    width: 43px !important;
    height: 50px !important;
    font-size: 24px !important;
  } */
}

.pin-code input:focus {
    border: 1px solid var(--color-primary);
    outline: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
}

.reset-btn {
    font-weight: bold;
    font-size: 14px;
    color: var(--color-primary);
}

.secondary-custom-bg-color {
    background-color: #F9AB10;
    color: var(--color-primary);
}

.secondary-custom-bg-color:hover {
    background-color: #f0af2c;
}
</style>