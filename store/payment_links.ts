import { defineStore } from "pinia";
import type {
  PaymentOption,
  InvoicePaymentForm,
  MerchantResponse,
  PaymentLinkTemplate,
} from "~/types";
import axios from "axios";
import useSendOTP from '~/composables/useSendOTP';

export const usePaymentLinkStore = defineStore( "paymentlink", () => {

  // import runtime config
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;

  // data
  const paymentLinkResponse = ref<MerchantResponse | null>( null );
  const selectedPaymentOption = ref<PaymentOption | null>( null );
  const isOTPView = ref( false );
  const OTPCode = ref();
  const isOTPSuccessfull = ref( false );
  const isPaymentSuccessfull = ref( false );
  const isPayingmentLoading = ref( false );
  const isPaymentLinktemplate = ref( false );
  const paymentLinktemplate = ref<PaymentLinkTemplate | null>()
  const invoicePaymentForm = ref<InvoicePaymentForm>( {
    amount: "0",
    phone: "",
    currency: "GHS",
    reference: "",
    email: "",
  } );




  // computed
  const isPaymentMethodSelected = computed( () => {
    if ( selectedPaymentOption.value === null ) {
      return false;
    } else {
      return true;
    }
  } );





  // verify and get merchant info
  async function verifyPaymentLink ( payment_link: string ) {
    try {
      const res = await axios.get(
        `${ baseURL }/m/${ payment_link }`,
        {
          headers: getHeaders(),
        }
      );

      if ( res.status === 200 ) {
        paymentLinkResponse.value = res.data;
        return 200;
      } else {
        return res.status;
      }
    } catch ( error: any ) {
      console.error( "Error verifying payment link:", error );
      // showToast('Failed to verify link', `${error.response.data.message}`, true)
      return error.response ? error.response.status : 500;
    }
  }


  //send otp



  async function payMerchant ( payment_link: string ) {
    try {
      isPayingmentLoading.value = true;

      const payload = {
        payment_method_id: selectedPaymentOption.value?.id,
        payment_details: {
          momo_number: invoicePaymentForm.value.phone,
          description: invoicePaymentForm.value.reference,
          amount: invoicePaymentForm.value.amount,
          currency: invoicePaymentForm.value.currency,
          otp: OTPCode,
          customer_firstname: "john",
          customer_lastname: "doe",
          customer_email: invoicePaymentForm.value.email
        },
        // meta: {
        //   payment_type: "paymentcampaign",
        //   payment_type_id: campaignResponse.value?.data.id,
        // },
      };

      const res = await axios.post(
        `${ baseURL }/m/${ payment_link }`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      isPaymentSuccessfull.value = true;
      ElNotification( {
        title: "Payment made successfully",
        message: `${ res.data.message }`,
        duration: 0,
        type: "success",
      } );

      isPayingmentLoading.value = false;
    } catch ( error: any ) {
      isPayingmentLoading.value = false;
      isPaymentSuccessfull.value = false;

      ElNotification( {
        title: "Failed to make transactions ",
        message: `${ error.response.data.message }`,
        duration: 0,
        type: "error",
      } );
    }
  }

  async function getPaymentLinkTemplate ( template_link: string ) {

    try {

      const res = await axios.get( `${ baseURL }/paymentlinktemplates/link/${ template_link }`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
      );

      paymentLinktemplate.value = res.data.data
      invoicePaymentForm.value.amount = res.data.data.amount.toString()
      invoicePaymentForm.value.currency = res.data.data.currency.toString()
      isPaymentLinktemplate.value = true;
    } catch ( error: any ) {
      console.log( error )
    }
  }


  return {
    invoicePaymentForm,
    isPaymentMethodSelected,
    selectedPaymentOption,
    OTPCode,
    isOTPView,
    verifyPaymentLink,
    paymentLinkResponse,
    isOTPSuccessfull,
    isPayingmentLoading,
    isPaymentSuccessfull,
    payMerchant,
    isPaymentLinktemplate,
    getPaymentLinkTemplate,
    paymentLinktemplate
  };
} );
