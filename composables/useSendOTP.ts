import {ref} from 'vue';

export default function useSendOTP(){

    // instance of api
    const {$api} = useNuxtApp()

    const isSendOTPLoading = ref(false)
    const isOTPSuccessful =ref(false)
    
    async function sendOTP( phone_number:string, payment_link:string) {
        try {
          console.log('hit')
          isSendOTPLoading.value = true;
          const payload = {
            customer_contact: phone_number,
            payment_link: payment_link,
          };
          
          const res = await $api.otp.sendOTP(payload)
       
          
          ElNotification({
            title: "OTP Sent Successfully",
            message: `${res.message}`,
            type: "success",
          });
    
          isSendOTPLoading.value = false;
          isOTPSuccessful.value = true;
        } catch (error: any) {
          isSendOTPLoading.value = false;
          isOTPSuccessful.value = false;
          ElNotification({
            title: "Failed to send OTP ",
            message: `${error.response._data.message}`,
            type: "error",
          });
        }
      }

      return{
        isSendOTPLoading,
        isOTPSuccessful,
        sendOTP
      }
}