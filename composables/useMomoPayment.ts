import { ref } from 'vue';
import type { PaymentPayload } from '~/types';
import Pusher from 'pusher-js'


export default function useMomoPay () {

  const { $api } = useNuxtApp()

  const isPaymentLoading = ref( false )
  const isPaymentSuccessful = ref( false )
  const isPaymentFailed = ref( false )
  const statusText = ref( '' )
  const isPaymentPromptInitiated = ref(false)

  async function pay ( payload: PaymentPayload | any, paymentLink: string ) {
    try {
      isPaymentLoading.value = true;

      const res = await $api.paymentLinks.payMerchant( paymentLink, payload )

      statusText.value = 'Waiting for payment confirmation notification';
      completePayment( res );

    } catch ( error: any ) {
      isPaymentLoading.value = false;
      

      statusText.value = '';
      ElNotification( {
        title: "Failed to make transactions ",
        message: `${ error.response._data.message }`,
        // duration: 0,
        type: "error",
      } );
    }
  }

  const completePayment = ( res: any ) => {

    // prompt initated
    isPaymentPromptInitiated.value = true;

    const { socket_channel } = res.data;
    const channel = socket_channel;

    // waiting to receive payment notification
    statusText.value = 'Enter your PIN to make payment';

    Pusher.logToConsole = true;

    var pusher = new Pusher( '4f9d3b832ddf4e8ca29a', {
      cluster: 'mt1',
    } );

    pusher.subscribe( channel );
    pusher.bind( 'Domain\\PayMerchant\\Events\\MerchantPaidEvent', ( data: any ) => {
      if ( data.status == 200 ) {
        isPaymentSuccessful.value = true;
        isPaymentLoading.value = false;
        statusText.value = '';

        ElNotification( {
          title: "Payment made successfully",
          message: `${ res.message }`,
          // duration: 0,
          type: "success",
        } );

      } else {
        isPaymentLoading.value = false;
        statusText.value = '';
        isPaymentFailed.value = true;
      }
    } );

  }

  return {
    isPaymentLoading,
     isPaymentSuccessful,
    isPaymentFailed,
    isPaymentPromptInitiated,
    statusText,
    pay
  }
}


