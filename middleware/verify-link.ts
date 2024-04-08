import { useCampaignStore} from "~/store/campaign";


export default defineNuxtRouteMiddleware(async (to) => {
  const campaignStore = useCampaignStore();
  const campaignId = to.params.id

  
  
  if (campaignId) {
    const statusCode = await campaignStore.verifyCampaignLink(campaignId.toString());

    // console.log(statusCode)
    if (statusCode === 200) {
      return;
    } else {
      console.log('link  is invalid or expired');
      // return navigateTo(`/error`);
       throw createError({
        statusCode: 404,
        statusMessage: 'Oooops, The link is either expired or Invalid',
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
      statusMessage: 'Oooops, The link is either expired or Invalid',
      data: {
        myCustomField: true
      }
    })
  }
});