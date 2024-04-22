import { useInvoiceStore} from "~/store/invoice";


export default defineNuxtRouteMiddleware(async (to) => {
  const invoiceStore = useInvoiceStore();
  const invoice_id = to.params.id
  const { $api } = useNuxtApp();
  
    // get invoice
    async function getInvoice ( invoice_id: string ) {
      try {
  
        const res = await $api.invoice.getInvoice(invoice_id)
        console.log(res)
  
        if ( res.status === 200 ) {
          invoiceStore.invoice = res.data;
          return 200;
        } else {
          return res.status;
        }
      } catch ( error: any ) {
        console.log(error)
        throw error
      }
    }
  
  
    // get merchnat
    async function getMerchnat ( payment_link: string | undefined ) {
      try {
        const res = await $api.invoice.getMerchantInfo(payment_link)
        console.log(res)
  
        if ( res.status === 200 ) {
          invoiceStore.merchant = res.data;
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

     // get invoice and the merchant who created it
    async function verifyInvoiceLink ( invoice_id: string ) {
      try {
  
        await getInvoice( invoice_id )
  
        await getMerchnat( invoiceStore.invoice?.payment_code )
  
        return 200;
  
      } catch ( error: any ) {
        // throw error
        console.error( "Error verifying invoice link:", error );
        // showToast('Failed to verify link', `${error.response.data.message}`, true)
        return error.response ? error.response.status : 500;
      }
    }
  
  
  if (invoice_id) {
    const statusCode = await verifyInvoiceLink(invoice_id.toString());

    if (statusCode === 200) {
      return;
    } else {
      // return navigateTo(`/error`);
       throw createError({
        statusCode: 404,
        statusMessage: 'Oooops, The link is either invalid',
        data: {
          myCustomField: true
        }
      })
      
    }
  } else {
    // return navigateTo(`/error`);

    throw createError({
      statusCode: 404,
      statusMessage: 'Oooops, The link is either invalid',
      data: {
        myCustomField: true
      }
    })
  }
});