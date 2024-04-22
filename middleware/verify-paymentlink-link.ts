import { usePaymentLinkStore } from "~/store/payment_links";

export default defineNuxtRouteMiddleware(async (to) => {
  const paymentLinkStore = usePaymentLinkStore();
  const paymentLink = to.params.id;
  const { $api } = useNuxtApp();

  if (paymentLink) {
    // const statusCode = await paymentLinkStore.verifyPaymentLink(paymentLink.toString());
    const res = await $api.paymentLinks.getPaymentLinksInfo(
      paymentLink,
    );

    console.log(res)

    if (res.status === 200) {
      paymentLinkStore.merchant = res
      console.log(paymentLinkStore.merchant)
      // return;
    } else {
      // return navigateTo(`/error`);
      throw createError({
        statusCode: 404,
        statusMessage: "Oooops, The link is either invalid ",
        data: {
          myCustomField: true,
        },
      });
    }
  } else {
    // return navigateTo(`/error`);

    throw createError({
      statusCode: 404,
      statusMessage: "Oooops, The link is either invalid ",
      data: {
        myCustomField: true,
      },
    });
  }
});
