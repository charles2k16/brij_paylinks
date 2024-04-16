import { defineStore } from "pinia";
import type {
  PaymentMethods,
  PaymentOption,
  InvoicePaymentForm,
  MerchantResponse,
} from "~/types";
import axios from "axios";

export const usePaymentLinkStore = defineStore("paymentlink", () => {

  // import runtime config
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;

  // data
  const paymentLinkResponse = ref<MerchantResponse | null>(null);
  const selectedPaymentOption = ref<PaymentOption | null>(null);
  const isOTPView = ref(false);
  const OTPCode = ref();
  const isSendOTPLoading = ref(false);
  const isOTPSuccessfull = ref(false);
  const isPaymentSuccessfull = ref(false);
  const isPayingmentLoading = ref(false);
  const invoicePaymentForm = ref<InvoicePaymentForm>({
    amount: "50",
    phone: "",
    currency: "GHS",
    reference: "",
    email: "",
  });




  // computed
  const isPaymentMethodSelected = computed(() => {
    if (selectedPaymentOption.value === null) {
      return false;
    } else {
      return true;
    }
  });

  

  // confirmation otp code

  // verify OTP
  const verifyOTP = () => {
    ElNotification({
      title: "Payment made successfully",
      type: "success",
      message: "You  have successfully donated to this campaign",
      duration: 0,
    });
  };

  // verify and get merchant info
  async function verifyPaymentLink(payment_link: string) {
    try {
      const res = await axios.get(
        `${baseURL}/m/${payment_link}`,
        {
          headers: getHeaders(),
        }
      );

      if (res.status === 200) {
        console.log("payment link verified successfully");
        paymentLinkResponse.value = res.data;
        return 200;
      } else {
        return res.status;
      }
    } catch (error: any) {
      console.error("Error verifying payment link:", error);
      // showToast('Failed to verify link', `${error.response.data.message}`, true)
      return error.response ? error.response.status : 500;
    }
  }
  

  //send otp
  async function sendOTP( payment_link:string) {
    console.log("hitting .. otp");

    try {
      isSendOTPLoading.value = true;
      const payload = {
        customer_contact: invoicePaymentForm.value.phone,
        payment_link: payment_link,
      };

      const res = await axios.post(`${baseURL}/pwb/send-otp`, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      console.log(res.data);
      ElNotification({
        title: "OPT Sent Successfully",
        message: `${res.data.message}`,
        duration: 0,
        type: "success",
      });

      isSendOTPLoading.value = false;
      isOTPSuccessfull.value = true;
    } catch (error: any) {
      isSendOTPLoading.value = false;
      isOTPSuccessfull.value = false;
      console.log(error);
      ElNotification({
        title: "Failed to send OTP ",
        message: `${error.response.data.message}`,
        duration: 0,
        type: "error",
      });
    }
  }

  async function payMerchant(payment_link: string) {
    try {
      isPayingmentLoading.value = true;
      
      const payload = {
        payment_method_id: selectedPaymentOption.value?.id,
        payment_details: {
          momo_number: invoicePaymentForm.value.phone,
          description: invoicePaymentForm.value.reference,
          amount: invoicePaymentForm.value.amount,
          currency: invoicePaymentForm.value.currency,
          otp: OTPCode,
          customer_firstname: "john",
          customer_lastname: "doe",
          customer_email: invoicePaymentForm.value.email
        },
        // meta: {
        //   payment_type: "paymentcampaign",
        //   payment_type_id: campaignResponse.value?.data.id,
        // },
      };

      const res = await axios.post(
        `${baseURL}/m/${payment_link}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log(res);
      isPaymentSuccessfull.value = true;
      ElNotification({
        title: "Payment made successfully",
        message: `${res.data.message}`,
        duration: 0,
        type: "success",
      });

      isPayingmentLoading.value = false;
    } catch (error: any) {
      isPayingmentLoading.value = false;
      isPaymentSuccessfull.value = false;

      console.log(error);
      ElNotification({
        title: "Failed to make transactions ",
        message: `${error.response.data.message}`,
        duration: 0,
        type: "error",
      });
    }
  }


  return {
    invoicePaymentForm,
    isPaymentMethodSelected,
    selectedPaymentOption,
    OTPCode,
    isOTPView,
    verifyOTP,
    verifyPaymentLink,
    paymentLinkResponse,
    isSendOTPLoading,
    isOTPSuccessfull,
    isPayingmentLoading,
    isPaymentSuccessfull,
    sendOTP,
    payMerchant
  };
});
