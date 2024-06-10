import { ref } from 'vue';
import type { NGNBankTxDetails, PaymentPayload } from '~/types';
import Pusher from 'pusher-js'


export default function useNigeriaBankTransferPayment () {

  const { $api } = useNuxtApp()

  const isPaymentInitiatedLoading = ref( false )
  const isPaymentInitiated = ref( false )
  const isPaymentConfirmationLoading =ref(false)
  const isPaymentSuccessful = ref( false )
  const isPaymentFailed = ref( false )
  const statusText = ref( 'Confirm payment' )
  const isPaymentPromptInitiated = ref(false)
  const isPaymentPromptInitiatedLoading = ref(false)
  const transactionId = ref('')
  const socketChannel = ref('')
  const transactionDetail = ref<NGNBankTxDetails | null>(null)
  const successReceiptData = ref<any>()
  const failedReceiptData = ref<any>()


  async function pay ( payload: PaymentPayload | any, paymentLink: string ) {
    try {
      isPaymentInitiatedLoading.value = true;

      const res = await $api.paymentLinks.payMerchant( paymentLink, payload )

      console.log(res)
       var tx_details = res?.data?.meta?.transaction_details;
       transactionId.value = res?.data?.transaction_id;
       socketChannel.value = res?.data?.socket_channel;

       console.log(tx_details)
       transactionDetail.value = tx_details

      isPaymentInitiatedLoading.value = false;
      isPaymentInitiated.value = true;


    } catch ( error: any ) {
      isPaymentInitiatedLoading.value = false;
      isPaymentInitiated.value = false;

      
      ElNotification( {
        title: "Failed to initiate payment. please try again ",
        message: `${ error.response._data.message }`,
        type: "error",
      } );
    }
  }

  async function confirmNigeriaBankTransferPayment ( paymentMethodId: string,  ) {

    try{
      console.log('confirm start')
    isPaymentConfirmationLoading.value = true;
    statusText.value = 'Confirming payment ...';

    const res =  await $api.nigeriaBankTransfer.confirmNigerianBankTransfer({
        transaction_id: transactionId.value,
        payment_method_id: paymentMethodId,
    })

    console.log(res)

    ElNotification({
      title: "Payment initiated",
      message: `${ res.message}`,
      type: "warning",
    } );

    // complete payment - initiate web socket
    var data = { data: { socket_channel: socketChannel.value } };

    completePayment(data)
    
    isPaymentConfirmationLoading.value = false;


    }catch(error:any){
    statusText.value = 'Confirm Payment';
    
    isPaymentConfirmationLoading.value = false;

        ElNotification( {
            title: "Failed to process payment. please try again ",
            message: `${ error.response._data.message }`,
            type: "error",
          } );
    }
  } 



  const completePayment = ( res: any ) => {

    // prompt initiated
    isPaymentPromptInitiated.value = true;
    isPaymentPromptInitiatedLoading.value = true;

    const { socket_channel } = res.data;
    const channel = socket_channel;

    // waiting to receive payment notification
    statusText.value = 'Complete the payment in your internet banking app ...';

    Pusher.logToConsole = true;

    var pusher = new Pusher( '4f9d3b832ddf4e8ca29a', {
      cluster: 'mt1',
    } );

    pusher.subscribe( channel );
    pusher.bind( 'Domain\\PayMerchant\\Events\\MerchantPaidEvent', ( data: any ) => {
      if ( data.status == 200 ) {
        isPaymentPromptInitiatedLoading.value = false;
        isPaymentSuccessful.value = true;
        statusText.value = 'Payment Made successfully :)';
        successReceiptData.value = data;
        console.log(successReceiptData)
        console.log( data );

        ElNotification( {
          title: "Payment made successfully",
          message: `${ data.message }`,
          // duration: 0,
          type: "success",
        } );

      } else {
        isPaymentPromptInitiatedLoading.value = false;
        statusText.value = 'Payment Failed :(';
        failedReceiptData.value = data
        console.log(failedReceiptData)
        statusText.value = 'Confirm Payment';
        isPaymentFailed.value = true;

        ElNotification( {
          title: "Payment Failed",
          message: `${ data.message }`,
          // duration: 0,
          type: "error",
        } );
      }
    } );

  }

  return {
    isPaymentInitiatedLoading,
    isPaymentInitiated,
    isPaymentSuccessful,
    isPaymentConfirmationLoading,
    isPaymentFailed,
    isPaymentPromptInitiated,
    statusText,
    successReceiptData,
    failedReceiptData,
    transactionDetail,
    pay,
    confirmNigeriaBankTransferPayment,
    isPaymentPromptInitiatedLoading
  }
}


