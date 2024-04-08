import { defineStore } from "pinia";
import { h } from "vue";
import { ElNotification } from "element-plus";
import { getHeaders } from "~/utils/index";
import type {
  PaymentOption,
  CampaignResponse,
  MerchantResponse,
} from "~/types/index";
import axios from "axios";
import { getOtpCode } from "~/utils";

export const useCampaignStore = defineStore("campaign", () => {
  // import runtime config
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;

  // selected payment check
  const isPaymentMethodSelected = computed(() => {
    if (selectedPaymentOption.value === null) {
      return false;
    } else {
      return true;
    }
  });

  // compute dialoge title
  const dialogueTitle = computed(() => {
    if (isOTPSuccessfull.value === false) {
      return "Payment Options";
    } else {
      return "Payment OTP";
    }
  });

  // select payment method
  const selectedPaymentOption = ref<PaymentOption | null>(null);

  // confirmation otp code
  const otpCode = ref<string[]>(["", "", "", "", "", ""]);

  // check whether its filles
  const isOtpCodeFilled = computed(() => {
    return otpCode.value.every((code) => code !== "");
  });






  // verify incomin campaign link
  const campaignResponse = ref<CampaignResponse | null>(null);

  async function verifyCampaignLink(campaign_link: string) {
    try {

      const res = await axios.get(
        `${baseURL}/paymentcampaigns/link/${campaign_link}`,
        {
          headers: getHeaders(),
        }
      );

      if (res.status === 200) {
        console.log("campaign link verified successfully");
        campaignResponse.value = res.data;
        // get merhcant details
        getMerhant();
        return 200;
      } else {
        return res.status;
      }
    } catch (error: any) {

      console.error("Error verifying campaign link:", error);
      // showToast('Failed to verify link', `${error.response.data.message}`, true)
      return error.response ? error.response.status : 500;
    }
  }




  // fetch merhcant details
  const merchantResponse = ref<MerchantResponse>();

  async function getMerhant() {
    try {
      // merhant details
      const response = await axios.get(
        `${baseURL}/m/${campaignResponse.value?.data.payment_link}`,
        { headers: getHeaders() }
      );
      merchantResponse.value = response.data;
      console.log(response);
    } catch (error: any) {
      console.log(error);
    }
  }

  const isSendOTPLoading = ref(false);
  const isOTPSuccessfull = ref(false);
  async function sendOTP(customer_contact: string) {
    console.log("hitting .. otp");

    try {
      isSendOTPLoading.value = true;
      const payload = {
        customer_contact: customer_contact,
        payment_link: campaignResponse.value?.data.payment_link,
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

  const isPayingmentLoading = ref(false);
  async function payDonation(amount: string, currency:string, momo_number: string) {
    try {
      isPayingmentLoading.value = true;

      const payload = {
        payment_method_id: selectedPaymentOption.value?.id,
        payment_details: {
          momo_number: momo_number,
          description: "Payment link transaction",
          amount: amount,
          currency: currency,
          otp: getOtpCode(otpCode),
          customer_firstname: "john",
          customer_lastname: "doe",
          customer_email: "me@you.com",
        },
        meta: {
          payment_type: "paymentcampaign",
          payment_type_id: campaignResponse.value?.data.id,
        },
      };

      const res = await axios.post(
        `${baseURL}/m/${campaignResponse.value?.data.payment_link}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log(res);
      ElNotification({
        title: "OPT Donation made successfully",
        message: `${res.data.message}`,
        duration: 0,
        type: "success",
      });

      isPayingmentLoading.value = false;
    } catch (error: any) {
      isPayingmentLoading.value = false;
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
    isPaymentMethodSelected,
    otpCode,
    selectedPaymentOption,
    dialogueTitle,
    verifyCampaignLink,
    campaignResponse,
    sendOTP,
    isSendOTPLoading,
    payDonation,
    isOTPSuccessfull,
    isOtpCodeFilled,
    isPayingmentLoading,
    merchantResponse,
  
  };
});
