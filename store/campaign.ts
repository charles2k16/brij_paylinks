import { defineStore } from "pinia";
import type {
  PaymentOption,
  Campaign,
  Merchant,
} from "~/types/index";
import axios from "axios";

export const useCampaignStore = defineStore( "campaign", () => {

  // data
  const selectedPaymentOption = ref<PaymentOption | null>( null );
  const otpCode = ref( '' );
  const merchant = ref<Merchant>();
  const campaign = ref<Campaign | null>( null );
  const isPaymentSuccessful = ref( false );

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







  return {
    isPaymentMethodSelected,
    otpCode,
    selectedPaymentOption,
    campaign,
    merchant,
    isPaymentSuccessful,

  };
} );
