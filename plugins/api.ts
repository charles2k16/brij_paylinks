// 3rd's
import { $fetch, type FetchOptions } from 'ofetch';
import PaymentMethodsModule from '~/repository/modules/paymentMethods';
import PaymentLinksModule from '~/repository/modules/paymentLinks';

export default defineNuxtPlugin( ( nuxtApp ) => {
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
    baseURL: config.public.baseURL,
  };

  // Create a new instance of $fecther with custom option
  const apiFecther = $fetch.create( fetchOptions );

  // An object containing all repositories we need to expose
  const modules: any = {
    paymentMethods: new PaymentMethodsModule( apiFecther ),
    paymentLinks: new PaymentLinksModule( apiFecther )
  };

  return {
    provide: {
      api: modules
    }
  };
} );