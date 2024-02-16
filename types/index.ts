export interface Campaign {
    title:string,
    description:string,
    images:string[],
    createdAt:string,
    user:User,
    tags:Tag[],
    currency:Curreancy
}

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

export interface PaymentForm {
    amount: string
    phone: string
  }

export interface paymentOption {
    name:string,
    image:string,
    value:string
}
  