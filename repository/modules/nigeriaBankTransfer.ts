// 3rd's
// 3rd's
import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import type { PaymentMethods } from '~/types/index';

// locals
import FetchFactory from '../factory';

class NigeriaBankTransferModule extends FetchFactory<PaymentMethods[]> {

  private NIGERIA_BANK_TRANSFER_RESOURCE = '/paymentlinks/confirmpayment';
  
  /**
   * Return the data as array 
   * @param asyncDataOptions options for `useAsyncData`
   * @returns 
   */
  
  // confirm nigeria bank transfer payment
  async confirmNigerianBankTransfer ( paylaod: {} ) {
    return await this.call(
      'POST',
      `${ this.NIGERIA_BANK_TRANSFER_RESOURCE }`, paylaod
    )
  }

}

export default NigeriaBankTransferModule;