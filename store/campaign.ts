import { defineStore } from "pinia";
import type { CampaignPaymentForm, PaymentOption } from "~/types/index";

export const useCampaignStore = defineStore("campaign", () => {
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
    if (isOTPView.value === false) {
      return "Payment Options";
    } else {
      return "Payment OTP";
    }
  });

  // select payment method
  const selectedPaymentOption = ref<PaymentOption | null>(null);

  // payment info
  const paymentData = ref<CampaignPaymentForm>({
    amount: "",
    phone: "",
  });

  // confirmation otp code
  const otpCode = ref<string[]>(["", "", "", "", "", ""]);

  // payment option // Ghana options
  const paymentOptions = reactive<PaymentOption[]>([
    {
      id: "8514eb55-8b78-4ad5-81a8-621d26fc1d8a",
      name: "MTN Mobile Money GH",
      channel: "mtnghana",
      fund_type: "momo",
      description: "Mobile Money",
      icon_url:
        "https://api.brij.money/media/icons/payment_methods/mtn_momo.png",
      bank_code: null,
      supported_currencies: ["GHS"],
      country_abbreviations: ["GH"],
      active_state: "active",
    },
    {
      id: "42bd10b3-ec64-40a7-8477-f429f3ec60cc",
      name: "AirtelTigo Cash GH",
      channel: "airteltigoghana",
      fund_type: "momo",
      description: "Mobile Money",
      icon_url:
        "https://api.brij.money/media/icons/payment_methods/airtel_tigo.png",
      bank_code: null,
      supported_currencies: ["GHS"],
      country_abbreviations: ["GH"],
      active_state: "active",
    },
    {
      id: "f947a944-28ea-41d6-b492-3690be60ff1d",
      name: "Vodafone Cash GH",
      channel: "vodafoneghana",
      fund_type: "momo",
      description: "Mobile Money",
      icon_url:
        "https://api.brij.money/media/icons/payment_methods/vodafone_cash.png",
      bank_code: null,
      supported_currencies: ["GHS"],
      country_abbreviations: ["GH"],
      active_state: "active",
    },
  ]);

  // show otp check
  const isOTPView = ref(false);

  // show otp function
  function toggleOTPView() {
    isOTPView.value = !isOTPView.value;
  }

  // verify OTP
  const verifyOTP = () => {
    ElNotification({
      title: "Payment made successfully",
      type: "success",
      message: "You  have successfully donated to this campaign",
      duration: 0,
    });
  };

  return {
    isPaymentMethodSelected,
    otpCode,
    paymentData,
    selectedPaymentOption,
    toggleOTPView,
    isOTPView,
    dialogueTitle,
    paymentOptions,
    verifyOTP
  };
});
