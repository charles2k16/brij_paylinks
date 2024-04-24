// 3rd's
// 3rd's
import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import type { PaymentMethods } from '~/types/index';

// locals
import FetchFactory from '../factory';

class InvoiceModule extends FetchFactory<PaymentMethods[]> {
  private RESOURCE = '/merchants/invoices';
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
}

export default InvoiceModule;