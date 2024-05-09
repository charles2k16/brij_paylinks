// 3rd's
// 3rd's
import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import type { PaymentMethods } from '~/types/index';

// locals
import FetchFactory from '../factory';

class PaymentMethodsModule extends FetchFactory<PaymentMethods[]> {
  private RESOURCE = '/paymentlinks/paymentmethods';
  
  /**
   * Return the data as array 
   * @param asyncDataOptions options for `useAsyncData`
   * @returns 
   */
  async getPaymentMethods ( currency: String ) {
    return await this.call(
      'GET',
      `${ this.RESOURCE }?currency=${ currency }`
    )
  }
}

export default PaymentMethodsModule;