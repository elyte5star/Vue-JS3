import type { AxiosRequestHeaders } from 'axios'


export type tokenData = {
    access_token: string;
    token_type: string;
    host_url: string;
    userid: string;
    username: string;
    admin: boolean

}
export type User = {
    username: string;
    email: string;
    active: boolean;
    discount: null;
    created_at: Date;
    userid: string;
    admin: boolean,
    telephone: string;
    bookings: Array<Booking>

};
export type CreditCard = {
    cardType: null
    cardNumber: null
    expiryDate: null
    cardCvv: null
    nameOnCard: null

}

export type ShippingAddress = {
    bfname: null,
    baddress: null,
    bemail: null,
    bcountry: null,
    bzip: null,
    bcity: null,

}
export interface BillingAddress extends ShippingAddress {

}

export interface AuthHeader extends AxiosRequestHeaders {
    Authorization: string;
    Accept: string;
    'Content-Type': string;
}

export type userReservation = {
    total_price: number;
    cart: Array<Item>;
    payment_details: CreditCard;
    billing_address: BillingAddress;
    shipping_details?: ShippingAddress;

}


export type Alert = {
    type: string;
    message: string;
}
export type Booking = {
    total_price: number;
    cart: Array<Item>;
    owner_id: string;
    oid: string;
    created_at: Date
    shipping_details: ShippingAddress
}

export type Review = {
    rating: number;
    rid: string;
    created_at: Date;
    email: string;
    reviewer_name: string;
    comment: string;
    product_id: string;

}
export type Enquiry = {
    client_name: string;
    client_email: string;
    country: string;
    subject: string;
    message: string;
}
export type Product = {
    pid: string;
    details: string;
    description: string;
    stock_quantity: number
    image: string;
    name: string;
    category: string;
    price: number;
    reviews: Array<Review>;
    

}

export interface Item extends Product {
    quantity: number
    calculated_price: number
}

export type Sort ={
    unsorted:boolean
    sorted:boolean
    empty:boolean
}

export type Pageable ={
    offset:number
    pageNumber:number
    pageSize:number
    paged:boolean
    sort:Sort
    unpaged:boolean
}

export type ProductsResponse ={
    empty:boolean
    first:boolean
    last:boolean
    numberOfElements:number
    pageable:Pageable
    products:Array<Product>
    size:number
    sort:Sort
    totalElements:number
    totalPages:number

}