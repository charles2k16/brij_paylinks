import { defineStore } from "pinia";
import type {
  PaymentOption,
  InvoicePaymentForm,
  MerchantResponse,
  PaymentLinkTemplate,
  Merchant,
} from "~/types";
import axios from "axios";
import useSendOTP from '~/composables/useSendOTP';

export const usePaymentLinkStore = defineStore( "paymentlink", () => {

  // import runtime config
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;

  // data
  const merchant = ref<Merchant | null>( null );
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

  return {
    invoicePaymentForm,
    isPaymentMethodSelected,
    selectedPaymentOption,
    OTPCode,
    isOTPView,
    merchant,
    isOTPSuccessfull,
    isPayingmentLoading,
    isPaymentSuccessfull,
    isPaymentLinktemplate,
    paymentLinktemplate
  };
} );
