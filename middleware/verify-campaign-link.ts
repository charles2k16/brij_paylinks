import { useCampaignStore} from "~/store/campaign";


export default defineNuxtRouteMiddleware(async (to) => {
  const campaignStore = useCampaignStore();
  const campaignId = to.params.id

  
  
  if (campaignId) {
    const statusCode = await campaignStore.verifyCampaignLink(campaignId.toString());

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