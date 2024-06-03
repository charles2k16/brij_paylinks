import { ref } from 'vue';
import type { PaymentPayload } from '~/types';
import Pusher from 'pusher-js'


export default function useNigeriaBankTransferPayment () {

  const { $api } = useNuxtApp()

  const isPaymentLoading = ref( false )
  const isPaymentConfirmationLoading =ref(false)
  const isPaymentSuccessful = ref( false )
  const isPaymentFailed = ref( false )
  const statusText = ref( '' )
  const isPaymentPromptInitiated = ref(false)
  const transactionId = ref('')
  const socketChannel = ref('')
  const transactionDetail = reactive<any>([])
  const successReceiptData = ref<any>()
  const failedReceiptData = ref<any>()


  async function pay ( payload: PaymentPayload | any, paymentLink: string ) {
    try {
      isPaymentLoading.value = true;

      const res = await $api.paymentLinks.payMerchant( paymentLink, payload )

       var tx_details = res?.data?.meta?.transaction_details;
       transactionId.value = res?.data?.transaction_id;
       socketChannel.value = res?.data?.socket_channel;

       transactionDetail.value = [
        {
          name: "Amount",
          value: tx_details.amount,
        },
        {
          name: "Bank Name",
          value: tx_details.bank_name,
        },
        {
          name: "Account Number",
          value: tx_details.account_number,
        },
        {
          name: "Beneficiary",
          value: tx_details.beneficiary,
        },
        {
          name: "Currency",
          value: tx_details.currency,
        },
      ];

      isPaymentLoading.value = false;


    } catch ( error: any ) {
      isPaymentLoading.value = false;
      
      ElNotification( {
        title: "Failed to initiate payment. please try again ",
        message: `${ error.response._data.message }`,
        type: "error",
      } );
    }
  }

  async function confirmNigeriaBankTransferPayment ( paymentMethodId: string,  ) {

    isPaymentConfirmationLoading.value = true;
    statusText.value = 'Confirming payment ...';

    const res =  await $api.nigeriaBankTransfer.confirmNigerianBankTransfer({
        transaction_id: transactionId.value,
        payment_method_id: paymentMethodId,
    })


    // complete payment - initiate web socket
    var data = { data: { socket_channel: socketChannel.value } };

    completePayment(data)
    
    isPaymentConfirmationLoading.value = false;

    try{

    }catch(error:any){
    statusText.value = '';
    
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
        isPaymentSuccessful.value = true;
        statusText.value = 'Payment Made successfully :)';
        successReceiptData.value = data;
        console.log( data );

        ElNotification( {
          title: "Payment made successfully",
          message: `${ res.message }`,
          // duration: 0,
          type: "success",
        } );

      } else {
        statusText.value = 'Payment Failed :(';
        failedReceiptData.value = data
        statusText.value = '';
        isPaymentFailed.value = true;
      }
    } );

  }

  return {
    isPaymentLoading,
    isPaymentSuccessful,
    isPaymentConfirmationLoading,
    isPaymentFailed,
    isPaymentPromptInitiated,
    statusText,
    successReceiptData,
    failedReceiptData,
    transactionDetail,
    pay,
    confirmNigeriaBankTransferPayment
  }
}


