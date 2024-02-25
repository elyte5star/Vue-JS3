import type { AxiosRequestHeaders } from 'axios'


export type tokenData = {
    access_token: string
    token_type: string
    username: string
    email: string;
    enabled: boolean
    admin: boolean
    userid:string
}

export type User = {
    createdBy: string
    createdAt: Date
    lastModifiedBy: string
    lastModifiedAt: Date
    userid: string
    username: string
    email: string
    accountNonLocked: boolean
    failedAttempt: number
    lockTime: Date,
    admin: boolean
    enabled: boolean
    bookings: Array<Booking>
    locations: Array<string>
    telephone: string
    discount: null,
    using2FA: false
}

export type CreditCard = {
    cardType: null
    cardNumber: null
    expiryDate: null
    cardCvv: null
    nameOnCard: null

}

export type Address = {
    fname: null,
    baddress: null,
    bemail: null,
    bcountry: null,
    bzip: null,
    bcity: null,

}
export interface BillingAddress extends Address {

}

export type ModifyUserInfo ={
    email:string|null
    telephone: string|null
    fullName:string|null
    address:string|null
    city:string
    country:string|null
    zip:string|null

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
    shipping_details?: Address;

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
    createdAt: Date
    shipping_details: Address
}

export type CreateReview = {
    rating: number;
    pid: string;
    email: string;
    reviewerName: string;
    comment: string;
}

export type Review = {
    createdBy:string
    createdAt: Date
    lastModifiedBy:string
    lastModifiedAt:string
    rating: number;
    rid: string;
    email: string;
    reviewerName: string;
    comment: string;
}


export type Enquiry = {
    client_name: string;
    client_email: string;
    country: string;
    subject: string;
    message: string;
}

export type Product = {
    category: string;
    description: string;
    details: string;
    image: string;
    name: string;
    pid: string;
    price:number;
    reviews: Array<Review>;
    stock_quantity: number
}

export interface ProductsQuery{
    page:number;
    size:number
    sort?:string
    
}

export interface Item extends Product {
    quantity: number
    calculated_price: number
}
export type CloudLogin = {
    type:string
    token:string | undefined
}
export type Sort ={
    empty:boolean
    sorted:boolean
    unsorted:boolean
}

export type Pageable ={
    offset:number
    pageNumber:number
    pageSize:number
    paged:boolean
    sort:Sort
    unpaged:boolean
}

export type ProductsResponse={
    empty:boolean
    first:boolean
    last:boolean
    numberOfElements:number
    products:Array<Product>
    size:number
    number:number
    totalElements:number
    totalPages:number

}