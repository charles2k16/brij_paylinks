

export interface User {
  name: string,
  email: string,
  phone: string
}

export interface Tag {
  name: string
}

export interface Currency {
  name: string,
  code: string,
  flag_url: string
}

export interface CampaignPaymentForm {
  amount: string
  phone: string,
  currency: string
}

export interface InvoicePaymentForm {
  amount: string,
  phone?: string,
  currency: string,
  paymentOption?: PaymentOption | null,
  reference?: string,
  email?: string,
}




// payment options
export interface PaymentMethods {
  status: number;
  data: PaymentOption[];
  message: string;
}

export interface PaymentOption {
  id: string;
  name: string;
  channel: string;
  fund_type: string;
  description: string;
  icon_url: string;
  bank_code: null | string;
  supported_currencies: string[];
  country_abbreviations: string[];
  active_state: string;
}


export interface CampaignResponse {
  status: number;
  data: Campaign;
  message: string;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  footnote: string;
  campaign_link: string;
  payment_link: string;
  expires_at: Date;
  created_at: Date;
  status: string;
  tags: string[];
  images: Image[];
}

export interface Image {
  id: string;
  url: string;
}

export interface CampaignPaymentData {
  payment_method_id: string;
  payment_details: PaymentDetails;
  meta?: Meta;
}

export interface Meta {
  payment_type?: string;
  payment_type_id?: string;
}

export interface PaymentDetails {
  momo_number: string;
  description: string;
  amount: string;
  currency: string;
  otp: string;
  customer_firstname: string;
  customer_lastname: string;
  customer_email: string;
}

export interface MerchantResponse {
  status: number;
  data: Merchant;
  message: string;
}

export interface Merchant {
  name: string;
  contact: string;
  logo: null;
  address: string;
  merchant_id: string;
  socials: Socials;
  merchant_category: string;
  merchant_industry: null;
  country: Country;
  accepted_currencies: AcceptedCurrency[];
}

export interface AcceptedCurrency {
  abbreviation: string;
  icon_url: string;
}

export interface Country {
  name: string;
  abbreviation: string;
  icon_url: string;
}

export interface Socials {
  facebook: null;
  twitter: null;
  instagram: null;
}

export interface SelectCountryResult {
  isValid: boolean
  isPossible?: boolean
  countryCode?: CountryCode
  countryCallingCode?: string
  nationalNumber?: string
  type?: string
  formatInternational?: string
  formatNational?: string
  uri?: string
  e164?: string
  rfc3966?: string
}

export type CountryCode = 'AC' | 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TA' | 'TC' | 'TD' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'XK' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW';


export interface AcceptedCurrencies {
  abbreviation: string,
  icon_url: string
}

export interface InvoiceResponse {
  status: number;
  data: Invoice;
  message: string;
}

export interface Invoice {
  id: string;
  invoice_no: string;
  invoice_name: string;
  invoice_note: string;
  additional_note: null;
  issue_date: Date;
  due_date: Date;
  currency: string;
  status: string;
  created_at: string;
  updated_at: string;
  customer: Customer;
  payment_code: string;
  subtotal: string;
  discount: null;
  taxes: Tax[];
  discount_type: null;
  discount_value: string;
  amount_after_discount: string;
  discount_amount: string;
  tax_amount: string;
  amount_after_tax: string;
  total: string;
  invoice_items: InvoiceItem[];
  invoice_payment_logs: any[];
}

export interface Customer {
  id: string;
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  country_name: null;
  country_flag: CountryFlag;
}

export interface CountryFlag {
}

export interface InvoiceItem {
  id: string;
  item_description: string;
  quantity: number;
  unit_price: string;
  subtotal: string;
}

export interface Tax {
  id: string;
  name: string;
  percentage: string;
  status: string;
  created_at: string;
}

export interface PaymentLinkTemplate {
  id: string;
  name: string;
  amount: number;
  currency: string;
  status: string;
  template_link: string;
  payment_link: string;
}

export interface PaymentPayload {
  payment_method_id?: string
  payment_details?: {
    momo_number: string
    description: string,
    amount: string,
    currency: string
    otp: string,
    customer_firstname: string,
    customer_lastname: string,
    customer_email: string
  },
  meta?: Meta
}


export interface PaymentDefaultValues {
  total?: string,
  currency?: string,
  isDefault?:boolean
}


export interface GeneralFormData {
  currency: string,
  amount:string,
  reference:string,
  paymentOption:PaymentOption | null,
  isDefaultValues?: boolean
}

export interface MomoFormData {
  phone: string,
  phoneResult?:string,
  email:string,
  otp?:string
}

export interface  NGNBankTxDetails {
  amount: string,
  bank_name: string,
  account_number: string,
  beneficiary: string,
  currency: string
}






