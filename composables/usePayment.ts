import { ref } from 'vue';
import type { PaymentPayload } from '~/types';
import Pusher from 'pusher-js'


export default function useSendOTP () {


  // instance of api
  const { $api } = useNuxtApp()

  const isPayingmentLoading = ref( false )
  const isPaymentSuccessfull = ref( false )

  async function pay ( payload: PaymentPayload | any, paymentLink: string ) {
    try {
      isPayingmentLoading.value = true;


      const res = await $api.paymentLinks.payMerchant( paymentLink, payload )

      // waiting for payment confirmation nortification
      completePayment( res );

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

  const completePayment = ( res: any ) => {

    const { socket_channel } = res.data;
    const channel = socket_channel;
    console.log( channel )
    // waiting to receive payment notification

    Pusher.logToConsole = true;

    var pusher = new Pusher( '4f9d3b832ddf4e8ca29a', {
      cluster: 'mt1',
    } );

    pusher.subscribe( channel );
    pusher.bind( 'Domain\\PayMerchant\\Events\\MerchantPaidEvent', ( data: any ) => {
      if ( data.status == 200 ) {
        isPaymentSuccessfull.value = true;
        isPayingmentLoading.value = false;
        console.log( 'paym', data )
        ElNotification( {
          title: "Payment made successfully",
          message: `${ res.message }`,
          duration: 0,
          type: "success",
        } );

      } else {
        isPayingmentLoading.value = false;
        //  show a failed pop up
      }
    } );

  }

  return {
    isPayingmentLoading,
    isPaymentSuccessfull,
    pay
  }
}


