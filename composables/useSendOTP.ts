import {ref} from 'vue';

export default function useSendOTP(){

    // instance of api
    const {$api} = useNuxtApp()

    const isSendOTPLoading = ref(false)
    const isOTPSuccessfull =ref(false)
    
    async function sendOTP( phone_number:string, payment_link:string) {
        try {
          isSendOTPLoading.value = true;
          const payload = {
            customer_contact: phone_number,
            payment_link: payment_link,
          };
          
          const res = await $api.paymentMethods.sendOTP(payload)
          console.log(res)
          
          ElNotification({
            title: "OPT Sent Successfully",
            message: `${res.message}`,
            duration: 0,
            type: "success",
          });
    
          isSendOTPLoading.value = false;
          isOTPSuccessfull.value = true;
        } catch (error: any) {
          isSendOTPLoading.value = false;
          isOTPSuccessfull.value = false;
          ElNotification({
            title: "Failed to send OTP ",
            message: `${error.response._data.message}`,
            duration: 0,
            type: "error",
          });
        }
      }

      return{
        isSendOTPLoading,
        isOTPSuccessfull,
        sendOTP
      }
}