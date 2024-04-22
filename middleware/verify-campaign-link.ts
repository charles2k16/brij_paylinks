import { useCampaignStore } from "~/store/campaign";


export default defineNuxtRouteMiddleware( async ( to ) => {
  const campaignStore = useCampaignStore();
  const campaignId = to.params.id
  // instance of api
  const { $api } = useNuxtApp();
  

  // get campaign
  async function getCampaign ( campaign_link: string ) {
    try {
      const res = await $api.campaign.getCampaign(campaign_link)
   

      if ( res.status === 200 ) {
        campaignStore.campaign = res.data;
        // get merhcant details
        getMerhant();
        return 200;
      } else {
        return res.status;
      }
    } catch ( error: any ) {
      console.error( "Error verifying campaign link:", error );
      // showToast('Failed to verify link', `${error.response.data.message}`, true)
      return error.response ? error.response.status : 500;
    }
  }

  // get merchant
  async function getMerhant () {
    try {
      // merhant details
      const res = await $api.campaign.getMerchantInfo(campaignStore.campaign?.payment_link)
      if(res.status === 200){
        campaignStore.merchant = res.data
      }
    } catch ( error: any ) {
      console.log(error)
    }
  }

  
  if ( campaignId ) {
    const statusCode = await getCampaign( campaignId.toString() );

    if ( statusCode === 200 ) {
      return;
    } else {
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
    // return navigateTo(`/error`);


    throw createError( {
      statusCode: 404,
      statusMessage: 'Oooops, The link is either invalid',
      data: {
        myCustomField: true
      }
    } )
  }
} );