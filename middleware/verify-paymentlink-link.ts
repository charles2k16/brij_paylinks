import { usePaymentLinkStore} from "~/store/payment_links";


export default defineNuxtRouteMiddleware(async (to) => {
  const paymentLinkStore = usePaymentLinkStore();
  const paymentLink = to.params.id

  
  if (paymentLink) {
    const statusCode = await paymentLinkStore.verifyPaymentLink(paymentLink.toString());

    if (statusCode === 200) {
      return;
    } else {
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

    throw createError({
      statusCode: 404,
      statusMessage: 'Oooops, The link is either invalid ',
      data: {
        myCustomField: true
      }
    })
  }
});