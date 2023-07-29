<template>
    <div v-if="user_info">
        <div id="user" class="user">
            <router-link id="cont_shopping_product" :to="{ name: 'Home' }"><i class="fa fa-arrow-left"></i> Continue
                shopping</router-link>
            <h1>Profile card for {{ user_info.username }}</h1>
            <div class="framed columnx" id="{{ user.userid }}">
                <div class="edit">
                    <a href="javascript:void(0)" @click="changeActiveComponent('update_details')"><i
                            class="fa fa-pencil-square-o" style="font-size: 40px"></i></a>
                </div>
                <div class="delete_contact">
                    <a href="javascript:void(0)" v-on:click="deleteUser(user_info.userid)"><i class="fa fa-trash-o"
                            style="font-size: 40px"></i></a>
                </div>
                <div class="item_left">
                    <img :src='userImage' v-bind:alt="user_info.username" />
                    <div class="discount">Discount : {{ user_info.discount }}%</div>
                </div>
                <div class="item_right">
                    <h3>Username : {{ user_info.username }}</h3>
                    <h5>Telephone : {{ user_info.telephone }}</h5>
                    <h5>Email : {{ user_info.email }}</h5>
                    <h6>User id : {{ user_info.userid }}.</h6>
                    <h6>Registered since {{ formatDate(user_info.created_at) }}.</h6>
                </div>

            </div>
        </div>
        <div class="container">
            <div class="wrapper wrapper-content animated fadeInRight">
                <div class="row">
                    <div class="col-md-7">
                        <div class="ibox">
                            <div class="ibox-title">
                                <span class="pull-right">(<strong>{{ bookingsHistoryCount }}</strong>)
                                    orders</span>
                                <h5>Order History</h5>
                            </div>
                            <div v-if="bookingsHistory" v-for="booking in bookingsHistory " v-bind:key="booking.oid"
                                class="ibox-content">
                                <div class="table-responsive">
                                    <table class="table shoping-cart-table order_history" id="order_history"
                                        @click="orderDetailsTable(booking.cart)">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Date: {{ formatDate(booking.created_at) }}
                                                    <p>Order number: {{ booking.oid }}</p>
                                                </td>
                                                <td :style="{ width: '65px' }">
                                                    <input type="text" :disabled="isDisabled" class="form-control"
                                                        :value="booking.cart.length">
                                                </td>
                                                <td>
                                                    <h4 :style="{ width: '130px' }">
                                                        £{{ booking.total_price }}
                                                    </h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                            </div>

                        </div>
                    </div>

                    <div class="col-md-5">
                        <div class="ibox-title">
                            <h5 v-if="bookingsHistoryCount">Click order to view products per order</h5>
                        </div>
                        <div class="table-responsive" id="items_order">


                        </div>
                        <div class="ibox-content">
                            <span>
                                Total amount spent on shopping
                            </span>
                            <h2 class="font-bold">
                                £{{ overallTotal }}
                            </h2>

                            <hr>

                            <div class="m-t-sm">
                                <div class="btn-group">
                                    <router-link id="cont_shopping" :to="{ name: 'Home' }"><i class="fa fa-arrow-left"></i>
                                        Continue
                                        shopping</router-link>
                                </div>
                            </div>
                        </div>
                        <div class="ibox">
                            <div class="ibox-title">
                                <h5>Support</h5>
                            </div>
                            <div class="ibox-content text-center">
                                <h3><i class="fa fa-phone"></i> +47 409 78 057</h3>
                                <h3><a href="mailto:elyte5star@gmail.com"><i class="fa fa-envelope-o"></i>
                                        elyte5star@gmail.com</a></h3>
                                <h3><a href="https://github.com/elyte5star"><i class="fa fa-github"></i>
                                        elyte5star</a></h3>
                                <span class="small">
                                    Please contact with us if you have any questions. We are avalible 24h.
                                </span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>
</template>


<script lang="ts">


/* eslint-disable */

import moment from 'moment'
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { userStore } from "@/stores/userAccount";
import type { User, Booking, Product, Item } from '@/helpers/my-types';

export default defineComponent({
    name: "UserProfile",
    data() {
        return {
            isDisabled: true
        }

    },
    props: {
        user_info: {
            type: Object as PropType<User>,
            required: true

        },
        user_image: {
            type: String,
            required: true
        },

        bookingsHistory: {
            type: Array<Booking>,
            required: true

        }
    },
    methods: {
        orderDetailsTable(itemsArray: Array<Item>) {
            let tableDiv = document.getElementById("items_order")!;
            tableDiv.innerHTML = "";
            tableDiv.innerHTML = '<table id=\"order_table\" class=\"table table-bordered table-sm\"><thead><tr><th>#</th><th>Name of product</th><th>Product number</th><th>Price</th></tr></thead><tfoot></tfoot><tbody></tbody></table>'
            for (let i = 0; i < itemsArray.length; i++) {
                let htmltxt = "<tr>";
                htmltxt += "<td>" + itemsArray[i].quantity + "</td>";
                htmltxt += "<td>" + itemsArray[i].name + "</td>";
                htmltxt += "<td>" + itemsArray[i].pid + "</td>";
                htmltxt += "<td>" + "£" + itemsArray[i].price + "</td>";
                htmltxt += "</tr>";
                let tableRef = document.getElementById('order_table')!.getElementsByTagName('tbody')[0];
                let newRow = tableRef.insertRow(tableRef.rows.length);
                newRow.innerHTML = htmltxt;

            }

        },
        formatDate(value: Date) {
            if (value) {
                return moment(String(value)).format("DD-MM-YYYY hh:mm");
            }
        },
        changeActiveComponent(str: string) {
            this.$emit('changeActiveComponent', str);
        },
        async deleteUser(pid: string) {
            const user_store = userStore();
            await user_store.deleteUserAccount(pid);

        }
    },

    computed: {
        overallTotal() {
            let amount: number = 0;

            for (let price of this.bookingsHistory) {
                amount += price.total_price;
            }
            return amount.toFixed(2);
        },
        userImage() {
            return new URL('../../src/assets/images/' + this.user_image, import.meta.url).href

        },
        bookingsHistoryCount() {
            return this.bookingsHistory.length
        },

    }

});
</script>
