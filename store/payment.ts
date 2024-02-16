import { defineStore } from 'pinia'
import type { PaymentForm, paymentOption} from '~/types/index'


export const usePaymentStore = defineStore('payment', () => {

  // selected payment check
  const isPaymentMethodSelected = computed(() => {
    if(SelectedPayment.value === null ){
      return true
    }else{
      return false
    }
  })

  // compute dialoge title
  const dialogueTitle = computed(() => {
    if(showOtp.value === false ){
      return 'Payment Options'
    }else{
      return 'Payment OTP'
    }
  })

  // select payment method
  const SelectedPayment = ref<paymentOption | null>(null)

  // payment info
  const paymentData = ref<PaymentForm>({
      amount:'',
      phone:''
  })

  // show otp chec
  const showOtp = ref<boolean>(false)

  // confirmation code
  const otpCode = ref('')





  return { isPaymentMethodSelected, otpCode, paymentData, SelectedPayment, showOtp, dialogueTitle,   }
})