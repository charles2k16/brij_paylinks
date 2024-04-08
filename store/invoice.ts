import { defineStore } from "pinia";
import type {
  PaymentMethods,
  PaymentOption,
  InvoicePaymentForm,
} from "~/types";
import axios from "axios";

export const useInvoiceStore = defineStore("invoice", () => {

  // invoice form data
  const invoicePaymentForm = ref<InvoicePaymentForm>({
    amount: "50",
    phone: "",
    currency: "GHS",
    paymentOption: "",
    reference: "",
    email: "",
  });


  // select payment method
  const SelectedPaymentOption = ref<PaymentOption | null>(null);



  // check wether payment is selected
  const isPaymentMethodSelected = computed(() => {
    if (SelectedPaymentOption.value === null) {
      return false;
    } else {
      return true;
    }
  });

  // check between OTP View state or Form view state
  const isOTPView = ref(false);

  // confirmation otp code
  const OTPCode = ref<string[]>(["", "", "", "", "", ""]);

  // verify OTP
  const verifyOTP = () => {
    ElNotification({
      title: "Payment made successfully",
      type: "success",
      message: "You  have successfully donated to this campaign",
      duration: 0,
    });
  };

  // payment options


  return {
    invoicePaymentForm,
    isPaymentMethodSelected,
    SelectedPaymentOption,
    OTPCode,
    isOTPView,
    verifyOTP
  };
});
