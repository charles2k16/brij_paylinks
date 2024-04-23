import { defineStore } from "pinia";
import type {
  PaymentOption,
  Campaign,
  Merchant,
} from "~/types/index";
import axios from "axios";

export const useCampaignStore = defineStore( "campaign", () => {
  // import runtime config
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;

  // data
  const selectedPaymentOption = ref<PaymentOption | null>( null );
  const otpCode = ref( '' );
  const isOTPSuccessfull = ref( false );
  const merchant = ref<Merchant>();
  const campaign = ref<Campaign | null>( null );
  const isPaymentSuccessfull = ref( false );

  // instance of api
  const { $api } = useNuxtApp();

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






  return {
    isPaymentMethodSelected,
    otpCode,
    selectedPaymentOption,
    dialogueTitle,
    campaign,
    isOTPSuccessfull,
    merchant,
    isPaymentSuccessfull,

  };
} );
