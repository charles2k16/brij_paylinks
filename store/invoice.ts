import { defineStore } from "pinia";
import type {
  PaymentOption,
  InvoicePaymentForm,
  Invoice,
  Merchant,
} from "~/types";
import axios from "axios";


export const useInvoiceStore = defineStore( "invoice", () => {
  // import runtime config
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;



  // Data
  const SelectedPaymentOption = ref<PaymentOption | null>( null );
  const merchant = ref<Merchant | null>( null );
  const invoice = ref<Invoice | null>( null );
  const OTPCode = ref();
  const isOTPView = ref( false );
  const isOTPSuccessfull = ref( false );
  const isPayingmentLoading = ref( false );
  const isPaymentSuccessfull = ref( false );
  const invoicePaymentForm = ref<InvoicePaymentForm>( {
    amount: "50",
    phone: "",
    currency: "GHS",
    reference: "",
    email: "",
  } );


  // computed
  const isPaymentMethodSelected = computed( () => {
    if ( SelectedPaymentOption.value === null ) {
      return false;
    } else {
      return true;
    }
  } );




  return {
    invoicePaymentForm,
    isPaymentMethodSelected,
    SelectedPaymentOption,
    OTPCode,
    isOTPView,
    merchant,
    invoice,
    isOTPSuccessfull,
    isPayingmentLoading,
    isPaymentSuccessfull,
  };
} );
