import axios from 'axios';
import {ref} from 'vue';

export default function useSendOTP(){

      // import runtime config
    const runtimeConfig = useRuntimeConfig();
    const baseURL = runtimeConfig.public.baseURL;

    const isSendOTPLoading = ref(false)
    const isOTPSuccessfull =ref(false)
    
    async function sendOTP( phone_number:string, payment_link:string) {
        try {
          isSendOTPLoading.value = true;
          const payload = {
            customer_contact: phone_number,
            payment_link: payment_link,
          };
    
          const res = await axios.post(`${baseURL}/pwb/send-otp`, payload, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });
    
   
          ElNotification({
            title: "OPT Sent Successfully",
            message: `${res.data.message}`,
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
            message: `${error.response.data.message}`,
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