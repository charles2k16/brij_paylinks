import { defineStore } from "pinia";
import type {

  Merchant,
  PaymentLinkTemplate,
} from "~/types";


export const usePaymentLinkStore = defineStore( "paymentlink", () => {

  const merchant = ref<Merchant | null>( null );
  const paymentLinkTemplate = ref<PaymentLinkTemplate | null>()
  const isPaymentLinkTemplate = ref<boolean>(false)


  return {
    merchant,
    paymentLinkTemplate,
    isPaymentLinkTemplate
  };
} );
