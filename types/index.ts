

export interface User {
    name:string,
    email:string,
    phone:string
}

export interface Tag {
    name:string
}

export interface Curreancy {
    name:string,
    code:string,
    flag_url:string
}

export interface CampaignPaymentForm {
    amount: string
    phone: string,
    currency:string
  }

export interface InvoicePaymentForm{
    amount: string,
    phone: string,
    currency:string,
    paymentOption:string,
    reference:string,
    email:string
}




// payment options
export interface PaymentMethods {
    status:  number;
    data:    PaymentOption[];
    message: string;
}

export interface PaymentOption {
    id:                    string;
    name:                  string;
    channel:               string;
    fund_type:             string;
    description:           string;
    icon_url:              string;
    bank_code:             null | string;
    supported_currencies:  string[];
    country_abbreviations: string[];
    active_state:          string;
}


export interface CampaignResponse {
    status:  number;
    data:    Campaign;
    message: string;
}

export interface Campaign {
    id:            string;
    title:         string;
    description:   string;
    footnote:      string;
    campaign_link: string;
    payment_link:  string;
    expires_at:    Date;
    created_at:    Date;
    status:        string;
    tags:          string[];
    images:        Image[];
}

export interface Image {
    id:  string;
    url: string;
}

export interface CampaignPaymentData {
    payment_method_id: string;
    payment_details:   PaymentDetails;
    meta:              Meta;
}

export interface Meta {
    payment_type:    string;
    payment_type_id: string;
}

export interface PaymentDetails {
    momo_number:        string;
    description:        string;
    amount:             string;
    currency:           string;
    otp:                string;
    customer_firstname: string;
    customer_lastname:  string;
    customer_email:     string;
}

export interface MerchantResponse{
    status:  number;
    data:    Merchant;
    message: string;
}

export interface Merchant {
    name:                string;
    contact:             string;
    logo:                null;
    address:             string;
    merchant_id:         string;
    socials:             Socials;
    merchant_category:   string;
    merchant_industry:   null;
    country:             Country;
    accepted_currencies: AcceptedCurrency[];
}

export interface AcceptedCurrency {
    abbreviation: string;
    icon_url:     string;
}

export interface Country {
    name:         string;
    abbreviation: string;
    icon_url:     string;
}

export interface Socials {
    facebook:  null;
    twitter:   null;
    instagram: null;
}


  