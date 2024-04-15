export interface Campaign {
  title: string,
  description: string,
  images: string[],
  createdAt: string,
  user: User,
  tags: Tag[],
  currency: Curreancy
}

export interface User {
  name: string,
  email: string,
  phone: string
}

export interface Tag {
  name: string
}

export interface Curreancy {
  name: string,
  code: string,
  flag_url: string
}

export interface CampaignPaymentForm {
  amount: string
  phone: string
}

export interface InvoicePaymentForm {
  amount: string,
  phone: string,
  currency: string,
  paymentOption: string,
  reference: string,
  email: string
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
