import { defineStore } from "pinia";
import type {
  PaymentMethods,
  PaymentOption,
  InvoicePaymentForm,
  MerchantResponse,
  Invoice,
} from "~/types";
import axios from "axios";


export const useInvoiceStore = defineStore( "invoice", () => {
  // import runtime config
  const runtimeConfig = useRuntimeConfig();
  const baseURL = runtimeConfig.public.baseURL;


  // Data
  const SelectedPaymentOption = ref<PaymentOption | null>( null );
  const merchant = ref<MerchantResponse | null>( null );
  const invoice = ref<Invoice | null>( null );
  const OTPCode = ref();
  const isOTPView = ref( false );
  const isOTPSuccessfull = ref( false );
  const isPayingmentLoading = ref( false );
  const isPaymentSuccessfull = ref( false );
  const invoicePaymentForm = ref<InvoicePaymentForm>( {
    amount: "50",
    phone: "",
    currency: "GHS",
    reference: "",
    email: "",
  } );


  // computed
  const isPaymentMethodSelected = computed( () => {
    if ( SelectedPaymentOption.value === null ) {
      return false;
    } else {
      return true;
    }
  } );



  async function verifyInvoiceLink ( invoice_id: string ) {
    try {

      await getInvoice( invoice_id )

      await getMerchnat( invoice.value?.payment_code! )

      return 200;

    } catch ( error: any ) {
      // throw error
      console.error( "Error verifying invoice link:", error );
      // showToast('Failed to verify link', `${error.response.data.message}`, true)
      return error.response ? error.response.status : 500;
    }
  }

  // get invoice
  async function getInvoice ( invoice_id: string ) {
    try {
      const res = await axios.get(
        `${ baseURL }/merchants/invoices/${ invoice_id }`,
        {
          headers: getHeaders(),
        }
      );

      if ( res.status === 200 ) {
        invoice.value = res.data.data;
        return 200;
      } else {
        return res.status;
      }
    } catch ( error: any ) {
      throw error
    }
  }



  // get merchnat
  async function getMerchnat ( payment_link: string ) {
    try {
      const res = await axios.get(
        `${ baseURL }/m/${ payment_link }`,
        {
          headers: getHeaders(),
        }
      );

      if ( res.status === 200 ) {
        merchant.value = res.data;
        return 200;
      } else {
        return res.status;
      }
    } catch ( error: any ) {
      throw error
      // console.error("Error verifying payment link:", error);
      // showToast('Failed to verify link', `${error.response.data.message}`, true)
      // return error.response ? error.response.status : 500;
    }
  }



  async function payInvoice (
    amount: string,
    currency: string,
    momo_number: string
  ) {
    try {
      isPayingmentLoading.value = true;

      const payload = {
        payment_method_id: SelectedPaymentOption.value?.id,
        payment_details: {
          momo_number: invoicePaymentForm.value.phone,
          description: invoicePaymentForm.value.reference,
          amount: invoicePaymentForm.value.amount,
          currency: invoicePaymentForm.value.currency,
          otp: OTPCode.value,
          customer_firstname: "john",
          customer_lastname: "doe",
          customer_email: invoicePaymentForm.value.email,
        },
        meta: {
          payment_type: "invoice",
          payment_type_id: invoice.value?.id,
        },
      };


      const res = await axios.post(
        `${ baseURL }/m/${ invoice.value?.payment_code }`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      isPaymentSuccessfull.value = true;
      ElNotification( {
        title: "OPT Donation made successfully",
        message: `${ res.data.message }`,
        duration: 0,
        type: "success",
      } );

      isPayingmentLoading.value = false;
    } catch ( error: any ) {
      isPayingmentLoading.value = false;
      isPaymentSuccessfull.value = false;

      ElNotification( {
        title: "Failed to make transactions ",
        message: `${ error.response.data.message }`,
        duration: 0,
        type: "error",
      } );
    }
  }


  return {
    invoicePaymentForm,
    isPaymentMethodSelected,
    SelectedPaymentOption,
    OTPCode,
    isOTPView,
    verifyInvoiceLink,
    merchant,
    invoice,
    isOTPSuccessfull,
    isPayingmentLoading,
    isPaymentSuccessfull,
    payInvoice
  };
} );
