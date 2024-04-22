
import {ref} from 'vue';
import type { PaymentPayload } from '~/types';

export default function useSendOTP(){


    // instance of api
    const {$api} = useNuxtApp()

    const isPayingmentLoading = ref(false)
    const isPaymentSuccessfull =ref(false)
    
    async function pay (payload:PaymentPayload, paymentLink:string) {
        try {
          isPayingmentLoading.value = true;

    
          const res = await $api.paymentLinks.payMerchant(paymentLink, payload)
    
          isPaymentSuccessfull.value = true;
          ElNotification( {
            title: "Payment made successfully",
            message: `${ res.message }`,
            duration: 0,
            type: "success",
          } );
    
          isPayingmentLoading.value = false;
        } catch ( error: any ) {
     
          isPayingmentLoading.value = false;
          isPaymentSuccessfull.value = false;
    
          ElNotification( {
            title: "Failed to make transactions ",
            message: `${ error.response._data.message }`,
            duration: 0,
            type: "error",
          } );
        }
      }

      return{
        isPayingmentLoading,
        isPaymentSuccessfull,
        pay
      }
}


