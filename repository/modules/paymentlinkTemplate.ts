// 3rd's
// 3rd's
import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import type { PaymentMethods } from '~/types/index';

// locals
import FetchFactory from '../factory';

class campaignModule extends FetchFactory<PaymentMethods[]> {
  private RESOURCE = '/paymentLinkTemplates/link';

  /**
   * Return the data as array 
   * @param asyncDataOptions options for `useAsyncData`
   * @returns 
   */


  async getPaymentLinksTemplate ( template_link: String ) {
    return await this.call(
      'GET',
      `${ this.RESOURCE }/${ template_link }`
    )
  }
}

export default campaignModule;