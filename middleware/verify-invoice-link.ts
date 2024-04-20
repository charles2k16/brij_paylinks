import { useInvoiceStore} from "~/store/invoice";


export default defineNuxtRouteMiddleware(async (to) => {
  const invoiceStore = useInvoiceStore();
  const invoice_id = to.params.id

  
  
  if (invoice_id) {
    const statusCode = await invoiceStore.verifyInvoiceLink(invoice_id.toString());

    // console.log(statusCode)
    if (statusCode === 200) {
      return;
    } else {
      console.log('link  is invalid');
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
    console.log('link  is invalid or expired');

    throw createError({
      statusCode: 404,
      statusMessage: 'Oooops, The link is either invalid',
      data: {
        myCustomField: true
      }
    })
  }
});