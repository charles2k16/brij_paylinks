import { defineStore } from "pinia";
import type {GeneralFormData,} from "~/types";


export const usePaymentForm = defineStore( "paymentForm", () => {


  const general_form_data = ref<GeneralFormData>({
    currency:'GHS',
    amount:'',
    reference:'',
    paymentOption:null,
  })




  return {
    general_form_data,
  };
} );
