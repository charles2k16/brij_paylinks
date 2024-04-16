import { usePaymentLinkStore} from "~/store/payment_links";


export default defineNuxtRouteMiddleware(async (to) => {
  const paymentLinkStore = usePaymentLinkStore();
  const paymentLink = to.params.id

  
  
  if (paymentLink) {
    const statusCode = await paymentLinkStore.verifyPaymentLink(paymentLink.toString());

    // console.log(statusCode)
    if (statusCode === 200) {
      return;
    } else {
      console.log('payment_link is invalid ');
      // return navigateTo(`/error`);
       throw createError({
        statusCode: 404,
        statusMessage: 'Oooops, The link is either invalid ',
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
      statusMessage: 'Oooops, The link is either invalid ',
      data: {
        myCustomField: true
      }
    })
  }
});