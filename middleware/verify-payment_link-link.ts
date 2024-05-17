import { usePaymentLinkStore } from "~/store/payment_links";

export default defineNuxtRouteMiddleware( async ( to ) => {
  const paymentLinkStore: any = usePaymentLinkStore();
  const paymentLink = to.params.id;
  console.log(paymentLink)
  const { $api } = useNuxtApp();

  async function getMerchnat ( payment_link: string | undefined ) {
    try {
      const res = await $api.paymentLinks.getMerchantInfo( payment_link );
      if ( res.status === 200 ) {
        paymentLinkStore.merchant = res.data;
        return 200;
      } else {
        return res.status;
      }
    } catch ( error: any ) {

      throw error;
    }
  }

  if ( paymentLink ) {
    const statusCode = await getMerchnat( paymentLink.toString() );

    if ( statusCode === 200 ) {
      return;
    } else {
      throw createError( {
        statusCode: 404,
        statusMessage: 'Oops, The link is invalid',
        data: {
          myCustomField: true
        }
      } )

    }
  } else {
    throw createError( {
      statusCode: 404,
      statusMessage: "Oops, The link is invalid ",
      data: {
        myCustomField: true,
      },
    } );
  }
} );
