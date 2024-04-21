import { defineStore } from "pinia";
import { h } from "vue";
import { ElNotification } from "element-plus";
import { getHeaders } from "~/utils/index";
import type {
  PaymentOption,
  CampaignResponse,
  MerchantResponse,
} from "~/types/index";
import axios from "axios";

export const useCampaignStore = defineStore( "campaign", () => {
  // import runtime config
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;

  // data
  const selectedPaymentOption = ref<PaymentOption | null>( null );
  const otpCode = ref( '' );
  const isSendOTPLoading = ref( false );
  const isOTPSuccessfull = ref( false );
  const merchantResponse = ref<MerchantResponse>();
  const campaignResponse = ref<CampaignResponse | null>( null );
  const isPayingmentLoading = ref( false );
  const isPaymentSuccessfull = ref( false );

  // computed 


  const isPaymentMethodSelected = computed( () => {
    if ( selectedPaymentOption.value === null ) {
      return false;
    } else {
      return true;
    }
  } );

  const dialogueTitle = computed( () => {
    if ( isOTPSuccessfull.value === false ) {
      return "Payment Options";
    } else {
      return "Payment OTP";
    }
  } );


  // methods & functions
  async function verifyCampaignLink ( campaign_link: string ) {
    try {
      const res = await axios.get(
        `${ baseURL }/paymentcampaigns/link/${ campaign_link }`,
        {
          headers: getHeaders(),
        }
      );

      if ( res.status === 200 ) {
        campaignResponse.value = res.data;
        // get merhcant details
        getMerhant();
        return 200;
      } else {
        return res.status;
      }
    } catch ( error: any ) {
      return error.response ? error.response.status : 500;
    }
  }

  async function getMerhant () {
    try {
      // merhant details
      const response = await axios.get(
        `${ baseURL }/m/${ campaignResponse.value?.data.payment_link }`,
        { headers: getHeaders() }
      );
      merchantResponse.value = response.data;

    } catch ( error: any ) {
      console.log( error );
    }
  }


  async function sendOTP ( customer_contact: string ) {


    try {
      isSendOTPLoading.value = true;
      const payload = {
        customer_contact: customer_contact,
        payment_link: campaignResponse.value?.data.payment_link,
      };

      const res = await axios.post( `${ baseURL }/pwb/send-otp`, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      } );


      ElNotification( {
        title: "OPT Sent Successfully",
        message: `${ res.data.message }`,
        duration: 0,
        type: "success",
      } );

      isSendOTPLoading.value = false;
      isOTPSuccessfull.value = true;
    } catch ( error: any ) {
      isSendOTPLoading.value = false;
      isOTPSuccessfull.value = false;
      console.log( error );
      ElNotification( {
        title: "Failed to send OTP ",
        message: `${ error.response.data.message }`,
        duration: 0,
        type: "error",
      } );
    }
  }


  async function payDonation (
    amount: string,
    currency: string,
    momo_number: string
  ) {
    try {
      isPayingmentLoading.value = true;

      const payload = {
        payment_method_id: selectedPaymentOption.value?.id,
        payment_details: {
          momo_number: momo_number,
          description: "Payment link transaction",
          amount: amount,
          currency: currency,
          otp: otpCode.value,
          customer_firstname: "john",
          customer_lastname: "doe",
          customer_email: "me@you.com",
        },
        meta: {
          payment_type: "paymentcampaign",
          payment_type_id: campaignResponse.value?.data.id,
        },
      };

      const res = await axios.post(
        `${ baseURL }/m/${ campaignResponse.value?.data.payment_link }`,
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
        title: "OPT Donation made successfully",
        message: `${ res.data.message }`,
        duration: 0,
        type: "success",
      } );

      isPayingmentLoading.value = false;
    } catch ( error: any ) {
      isPayingmentLoading.value = false;
      isPaymentSuccessfull.value = false;

      console.log( error );
      ElNotification( {
        title: "Failed to make transactions ",
        message: `${ error.response.data.message }`,
        duration: 0,
        type: "error",
      } );
    }
  }



  return {
    isPaymentMethodSelected,
    otpCode,
    selectedPaymentOption,
    dialogueTitle,
    verifyCampaignLink,
    campaignResponse,
    sendOTP,
    isSendOTPLoading,
    payDonation,
    isOTPSuccessfull,
    isPayingmentLoading,
    merchantResponse,
    isPaymentSuccessfull,

  };
} );
