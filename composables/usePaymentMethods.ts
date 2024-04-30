import { ref } from 'vue';
import type { PaymentOption } from '~/types';

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


      paymentMethods.value = res.data;
      isGetPaymentMethodsSuccessfull.value = true;
      isPaymentMethodDataLoading.value = false;

    } catch ( error: any ) {


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