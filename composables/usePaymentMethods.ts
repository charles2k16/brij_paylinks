import { ref } from 'vue';
import type { PaymentMethods, PaymentOption } from '~/types';

export default function usePaymentMethods () {

  // instance of api
  const { $api } = useNuxtApp()

  const isPaymentMethodDataLoading = ref( false )
  const isGetPaymentMethodsSuccessfull = ref( false )
  const paymentMethods = ref<PaymentOption[] | null>();

  async function getPaymentMethod ( currency: string ) {
    try {

      isPaymentMethodDataLoading.value = true;
      const res = await $api.paymentMethods.getPaymentMethods( currency )

      if ( res.status === 200 ) {
        paymentMethods.value = res.data;
        isGetPaymentMethodsSuccessfull.value = true;
        isPaymentMethodDataLoading.value = false;
      } else {
        isPaymentMethodDataLoading.value = false;
      }
    } catch ( error: any ) {
      console.log( error )

      isPaymentMethodDataLoading.value = false;
    }
  }

  return {
    isPaymentMethodDataLoading,
    isGetPaymentMethodsSuccessfull,
    getPaymentMethod,
    paymentMethods
  }
}