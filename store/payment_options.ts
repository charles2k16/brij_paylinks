import { defineStore } from "pinia";
import type { PaymentMethods } from "~/types";
import axios  from "axios";


export const usePaymentOptions = defineStore("payment_options", () => {
  // instance of runtime-config
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;

  // check loading state for payment options
  const isPaymentMethodDataLoading = ref(false);

  // select payment options
  const paymentOptions = ref<PaymentMethods>();

  // payment options
  async function getPaymentMethod(currency: string) {
    try {
      isPaymentMethodDataLoading.value = true;
      const res = await axios.get(
        `${baseURL}/paymentlinks/paymentmethods?currency=${currency}`
      );
      if (res.data.status === 200) {
        console.log(res.data);
        paymentOptions.value = res.data;
        isPaymentMethodDataLoading.value = false;
      } else {
        console.log(res);
        isPaymentMethodDataLoading.value = false;
      }
    } catch (error: any) {
      console.log(error);
      isPaymentMethodDataLoading.value = false;
    }
  }

  return{
    getPaymentMethod,
    isPaymentMethodDataLoading,
    paymentOptions
  }
});
