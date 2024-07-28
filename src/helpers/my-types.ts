import type { AxiosRequestHeaders } from 'axios'


export type tokenData = {
    accessToken: string
    tokenType: string
    username: string
    email: string;
    enabled: boolean
    accountNonLocked: boolean
    admin: boolean
    userid: string
}
export type Registration = {
    username: string | null
    email: string | null
    password: string | null
    confirmPassword: string | null
    telephone: string | null
}

export type PasswordChange = {
    password: string | null
    confirmPassword: string | null
    resetToken: string | null
}

export interface User {
    createdBy: string
    createdAt: Date
    lastModifiedBy: string
    lastModifiedAt: Date
    userid: string
    username: string
    email: string
    accountNonLocked: boolean
    failedAttempt: number
    lockTime: Date
    admin: boolean
    enabled: boolean
    bookings: Array<Booking>
    locations: Array<string>
    telephone: string
    userDiscount: null
    using2FA: false
    address: UserAddress
}

export type CreditCard = {
    cardType: null
    cardNumber: null
    expiryDate: null
    cardCvv: null
    nameOnCard: null

}

export type PaymentDetails = {
    cardDetails: CreditCard
    billingAddress: BillingAddress
}

export type UpdateUserPassword = {
    newPassword: string | null
    oldPassword: string | null
}

export interface BillingAddress extends UserAddress {

}

export interface ShippingDetails extends UserAddress {

}
export type UserAddress = {
    fullName: string
    streetAddress: string
    country: string
    zip: string
    state: string
    email?: string

}
export type ModifyUserInfo = {
    username: string | null
    telephone: string | null
    address: UserAddress

}

export interface AuthHeader extends AxiosRequestHeaders {
    Authorization: string;
    Accept: string;
    'Content-Type': string;
}

export type UserReservation = {
    userid: string | undefined;
    totalPrice: number;
    cart: Array<ItemInCart>;
    paymentDetails: PaymentDetails;
    shippingAddress?: ShippingDetails;

}


export type Alert = {
    type: string;
    message: string;
}

export type Booking = {
    totalPrice: number;
    cart: Array<ItemInCart>;
    oid: string;
    created: Date
    shippingDetails: ShippingDetails
}

export type CreateReview = {
    rating: number;
    pid: string;
    email: string;
    reviewerName: string;
    comment: string;
}

export type Review = {
    createdBy: string
    createdAt: Date
    lastModifiedBy: string
    lastModifiedAt: string
    rating: number;
    rid: string;
    email: string;
    reviewerName: string;
    comment: string;
}


export type Enquiry = {
    clientName: string;
    clientEmail: string;
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
    price: number;
    reviews: Array<Review> | number;
    stockQuantity: number
    productDiscount: number
}
export type ItemInCart = {
    pid: string;
    name: string;
    image: string;
    category: string;
    description: string;
    details: string;
    stockQuantity: number
    price: number;
    productDiscount: number
    quantity: number
    calculatedPrice: number

}

export interface ProductsQuery {
    page: number;
    size: number
    sort?: string

}


export type CloudLogin = {
    authType: string
    token: string | undefined
}
export type Sort = {
    empty: boolean
    sorted: boolean
    unsorted: boolean
}

export type Pageable = {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    sort: Sort
    unpaged: boolean
}

export type ProductsResponse = {
    empty: boolean
    first: boolean
    last: boolean
    numberOfElements: number
    products: Array<Product>
    size: number
    number: number
    totalElements: number
    totalPages: number

}