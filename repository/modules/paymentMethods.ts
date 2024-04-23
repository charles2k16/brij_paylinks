// 3rd's
// 3rd's
import type { FetchOptions } from 'ofetch';
import type { AsyncDataOptions } from '#app';
import type { PaymentMethods } from '~/types/index';

// locals
import FetchFactory from '../factory';

class PaymentMethodsModule extends FetchFactory<PaymentMethods[]> {
  private RESOURCE = '/paymentlinks/paymentmethods';
  private PAY_RESOURCE = '/m';
  private OTP_RESOURCE = '/pwb/send-otp';
  
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

  async payMerchantInvoice ( payment_link: String, paylaod: {} ) {
    return await this.call(
      'POST',
      `${ this.PAY_RESOURCE }/${ payment_link }`, paylaod
    )
  }

  async sendOTP ( paylaod: {} ) {
    return await this.call(
      'POST',
      `${ this.OTP_RESOURCE }/`, paylaod
    )
  }
}

export default PaymentMethodsModule;