import { useCampaignStore } from "~/store/campaign";


export default defineNuxtRouteMiddleware( async ( to ) => {
  const campaignStore = useCampaignStore();
  const campaignId = to.params.id



  if ( campaignId ) {
    const statusCode = await campaignStore.verifyCampaignLink( campaignId.toString() );

    // console.log(statusCode)
    if ( statusCode === 200 ) {
      return;
    } else {
      console.log( 'link  is invalid' );
      // return navigateTo(`/error`);
      throw createError( {
        statusCode: 404,
        statusMessage: 'Oooops, The link is either invalid',
        data: {
          myCustomField: true
        }
      } )

    }
  } else {


    throw createError( {
      statusCode: 404,
      statusMessage: 'Oooops, The link is either invalid',
      data: {
        myCustomField: true
      }
    } )
  }
} );