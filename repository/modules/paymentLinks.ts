// 3rd's
// 3rd's
import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import type { PaymentMethods } from '~/types/index';

// locals
import FetchFactory from '../factory';

class PaymentLinksModule extends FetchFactory<PaymentMethods[]> {
  private RESOURCE = '/m';
  private TEMPLATE_RESOURCE = '/paymentlinktemplates/link'
  /**
   * Return the data as array 
   * @param asyncDataOptions options for `useAsyncData`
   * @returns 
   */
  async getPaymentLinksInfo ( payment_link: String ) {
    return await this.call(
      'GET',
      `${ this.RESOURCE }/${ payment_link }`
    )
  }

  async getPaymentLinksTemplate ( template_link: String ) {
    return await this.call(
      'GET',
      `${ this.TEMPLATE_RESOURCE }/${ template_link }`
    )
  }

  async payMerchant ( payment_link: String, paylaod: {} ) {
    return await this.call(
      'POST',
      `${ this.RESOURCE }/${ payment_link }`, paylaod
    )
  }
}

export default PaymentLinksModule;