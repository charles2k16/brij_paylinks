import { defineStore } from "pinia";
import type {
  PaymentOption,
  InvoicePaymentForm,
  paymentLinkTemplate,
  Merchant,
} from "~/types";


export const usePaymentLinkStore = defineStore( "paymentlink", () => {

  // import runtime config
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;

  // data
  const merchant = ref<Merchant | null>( null );
  const selectedPaymentOption = ref<PaymentOption | null>( null );
  const isOTPView = ref( false );
  const OTPCode = ref();
  const isPaymentLinkTemplate = ref( false );
  const paymentLinkTemplate = ref<paymentLinkTemplate | null>()
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
    isPaymentLinkTemplate,
    paymentLinkTemplate
  };
} );
