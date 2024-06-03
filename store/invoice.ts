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
  const merchant = ref<Merchant | null>( null );
  const invoice = ref<Invoice | null>( null );





  return {
    merchant,
    invoice,
  };
} );
