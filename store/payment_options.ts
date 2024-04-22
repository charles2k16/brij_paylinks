import { defineStore } from "pinia";
import type { PaymentMethods } from "~/types";
import axios from "axios";


export const usePaymentOptions = defineStore( "payment_options", () => {
  // instance of runtime-config
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;

  // instance of api
  const { $api } = useNuxtApp();

  // check loading state for payment options
  const isPaymentMethodDataLoading = ref( false );

  // select payment options
  const paymentOptions = ref<PaymentMethods>();

  // payment options
  async function getPaymentMethod ( currency: string ) {
    try {
    isPaymentMethodDataLoading.value = true;
      const  res = await $api.paymentMethods.getPaymentMethods(currency)
      console.log(res)
      if ( res.status === 200 ) {
        paymentOptions.value = res;
        isPaymentMethodDataLoading.value = false;
      } else {
        isPaymentMethodDataLoading.value = false;
      }
    } catch ( error: any ) {
      console.log()
      isPaymentMethodDataLoading.value = false;
    }
  }

  return {
    getPaymentMethod,
    isPaymentMethodDataLoading,
    paymentOptions
  }
} );
