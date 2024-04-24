import { usePaymentLinkStore } from "~/store/payment_links";

export default defineNuxtRouteMiddleware(async (to) => {
  const paymentLinkStore = usePaymentLinkStore();
  const paymentLink = to.params.id;
  const { $api } = useNuxtApp();

  async function getMerchnat(payment_link: string | undefined) {
    try {
      const res = await $api.paymentLinks.getMerchantInfo(payment_link);
      console.log(res)
      if (res.status === 200) {
        paymentLinkStore.merchant = res.data;
        return 200;
      } else {
        return res.status;
      }
    } catch (error: any) {
      console.log(error)
      throw error;
      // return error.response ? error.response.status : 500;
    }
  }

  if (paymentLink) {
     const statusCode = await getMerchnat(paymentLink.toString());

     if(statusCode === 200){
        return;
     }else {
      // return navigateTo(`/error`);
       throw createError({
        statusCode: 404,
        statusMessage: 'Oooops, The link is invalid',
        data: {
          myCustomField: true
        }
      })
      
    }
  } else {
    // return navigateTo(`/error`);

    throw createError({
      statusCode: 404,
      statusMessage: "Oooops, The link is invalid ",
      data: {
        myCustomField: true,
      },
    });
  }
});
