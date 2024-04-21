// 3rd's
import type { $Fetch, FetchOptions } from 'ofetch';

class FetchFactory<T> {
  private $fetch: $Fetch;

  constructor ( fetcher: $Fetch ) {
    this.$fetch = fetcher;
  }

  /**
   * The HTTP client is utilized to control the process of making API requests.
   * @param method the HTTP method (GET, POST, ...)
   * @param url the endpoint url
   * @param data the body data
   * @param fetchOptions fetch options
   * @returns 
   */
  async call (
    method: string,
    url: string,
    data?: object,
    fetchOptions?: FetchOptions<'json'>
  ): Promise<T> {
    return this.$fetch<T>(
      url,
      {
        method,
        body: data,
        ...fetchOptions
      }
    )
  }
}

export default FetchFactory;