import type { UseFetchOptions } from 'nuxt/app'

export const apiService = (request: any, opts: any) => {
  const config = useRuntimeConfig()

  return useFetch(request, { baseURL: config.public.baseURL, ...opts })
}