import { defineStore } from "pinia";
import type {
  PaymentMethods,
  PaymentOption,
  InvoicePaymentForm,
} from "~/types";
import axios from "axios";

export const useInvoiceStore = defineStore("invoice", () => {
  // instance of runtime-config
  const config = useRuntimeConfig();
  const baseURL = config.public.baseURL;

  // invoice form data
  const invoicePaymentForm = reactive<InvoicePaymentForm>({
    amount: "50",
    phone: "",
    currency: "GHS",
    paymentOption: "",
    reference: "",
    email: "",
  });

  // confirmation otp code
  const otpCode = ref<string[]>(["", "", "", "", "", ""]);

  // select payment options
  const paymentMethodData = ref<PaymentMethods | null>(null);

  // select payment method
  const SelectedPaymentOption = ref<PaymentOption | null>(null);

  // check loading state for payment options
  const isPaymentMethodDataLoading = ref(false);

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
  async function getPaymentMethod() {
    try {
      isPaymentMethodDataLoading.value = true;
      const res = await axios.get(
        `${baseURL}/paymentlinks/paymentmethods?currency=${invoicePaymentForm.currency}`
      );

      if (res.data.status === 200) {
        console.log(res.data.data);
        paymentMethodData.value = res.data;
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

  return {
    invoicePaymentForm,
    isPaymentMethodSelected,
    SelectedPaymentOption,
    paymentMethodData,
    getPaymentMethod,
    isPaymentMethodDataLoading,
    OTPCode,
    isOTPView,
    verifyOTP
  };
});
