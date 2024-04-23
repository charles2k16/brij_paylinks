// 3rd's
// 3rd's
import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import type { PaymentMethods } from '~/types/index';

// locals
import FetchFactory from '../factory';

class InvoiceModule extends FetchFactory<PaymentMethods[]> {
  private RESOURCE = '/merchants/invoices';
  private MERCHANT_RESOURCE = '/m';
  /**
   * Return the data as array 
   * @param asyncDataOptions options for `useAsyncData`
   * @returns 
   */
  async getInvoice( invoice_id: String ) {
    return await this.call(
      'GET',
      `${ this.RESOURCE }/${ invoice_id }`
    )
  }

  async getMerchantInfo( payment_link: String | undefined ) {
    return await this.call(
      'GET',
      `${ this.MERCHANT_RESOURCE}/${ payment_link }`
    )
  }

  async payMerchantInvoice ( payment_link: String, paylaod: {} ) {
    return await this.call(
      'POST',
      `${ this.MERCHANT_RESOURCE }/${ payment_link }`, paylaod
    )
  }
}

export default InvoiceModule;