

export type tokenData = {
    access_token: string;
    refresh_token: string;
    token_type: string;
    host_url: string;
    userid: string;
    username: string;
    admin: boolean

}


export type Booking = {
    total_price: number;
    cart: Array<Product>;
    owner_id: string;
    oid: string;
    created_at: Date
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

export type Product = {
    pid: string;
    details: string;
    description: string;
    created_at: Date
    stock_quantity: number
    image: string;
    name: string;
    category: string;
    price: number;
    reviews: Array<Review>;
    discount: Array<number>;

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