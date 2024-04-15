<template>
  <div v-if="user_info">
    <div id="user" class="user">
      <router-link id="cont_shopping_product" :to="{ name: 'Home' }"
        ><i class="fa fa-arrow-left"></i> Continue shopping</router-link
      >
      <h1>Profile card for {{ user_info.username }}</h1>
      <div class="framed columnx" id="{{ user.userid }}">
        <div class="edit">
          <a href="javascript:void(0)" @click="changeActiveComponent('update_details')"
            ><i class="fa fa-pencil-square-o" style="font-size: 40px"></i
          ></a>
        </div>
        <div class="delete_contact">
          <a href="javascript:void(0)" v-on:click="deleteUser(user_info.userid)"
            ><i class="fa fa-trash-o" style="font-size: 40px"></i
          ></a>
        </div>
        <div class="item_left">
          <img :src="userImage" v-bind:alt="user_info.username" />
          <div class="discount">Discount : {{ user_info.userDiscount }}%</div>
        </div>
        <div class="item_right">
          <h3>USERNAME : {{ user_info.username }}</h3>
          <h5>TELEPHONE : {{ user_info.telephone }}</h5>
          <h5>EMAIL : {{ user_info.email }}</h5>
          <h6>CLIENT ID : {{ user_info.userid }}.</h6>
          <h6>MEMBER SINCE : {{ formatDate(user_info.createdAt) }}.</h6>
          <h6>LAST MODIFIED : {{ formatDate(user_info.lastModifiedAt) }}.</h6>
        </div>
      </div>
      <div class="d-grid col-12 mx-auto">
        <button
          id="using2F"
          @click="twoFactorLogin(user_info.username)"
          type="button"
          class="btn btn-outline-secondary"
        >
          {{ btnText }}
        </button>
      </div>
    </div>
    <div class="container">
      <div class="wrapper wrapper-content animated fadeInRight">
        <div class="row">
          <div class="col-md-7">
            <div class="ibox">
              <div class="ibox-title">
                <span class="pull-right"
                  >(<strong>{{ bookingsHistoryCount }}</strong
                  >) orders</span
                >
                <h5>Order History</h5>
              </div>
              <div v-if="bookingsHistory">
                <div
                  v-for="booking in bookingsHistory"
                  v-bind:key="booking.oid"
                  class="ibox-content"
                >
                  <div class="table-responsive">
                    <h5 v-if="bookingsHistoryCount">Click order to view items per order</h5>
                    <table
                      class="table shoping-cart-table order_history"
                      id="order_history"
                      @click="orderDetailsTable(booking.cart)"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <p>
                              <strong>Date of order:</strong> {{ formatDate(booking.created) }}
                            </p>
                            <p><strong>Order number:</strong> {{ booking.oid }}</p>
                            <p>
                              <strong>Shipping details</strong> <i class="fa fa-institution"></i>
                            </p>
                            <p>
                              Name: <span>{{ booking.shippingDetails.fname }}</span>
                            </p>
                            <p>
                              Email: <span>{{ booking.shippingDetails.bemail }}</span>
                            </p>

                            <p>
                              Address:
                              <span
                                >{{ booking.shippingDetails.baddress }},
                                {{ booking.shippingDetails.bzip }}
                                {{ booking.shippingDetails.bcity }}.
                                {{ booking.shippingDetails.bcountry }}.</span
                              >
                            </p>
                          </td>
                          <td :style="{ width: '65px' }">
                            <input
                              type="text"
                              :disabled="isDisabled"
                              class="form-control"
                              :value="booking.cart.length"
                            />
                          </td>
                          <td>
                            <h4 :style="{ width: '130px' }">£{{ booking.totalPrice }}</h4>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-5">
            <div class="ibox-title">
              <h5 v-if="bookingsHistoryCount">Items per order</h5>
            </div>
            <div class="table-responsive" id="items_order"></div>
            <div class="ibox-content">
              <span> Total amount spent on shopping </span>
              <h2 class="font-bold">£{{ overallTotal }}</h2>

              <hr />

              <div class="m-t-sm">
                <div class="btn-group">
                  <router-link id="cont_shopping" :to="{ name: 'Home' }"
                    ><i class="fa fa-arrow-left"></i> Continue shopping</router-link
                  >
                </div>
              </div>
            </div>
            <div class="ibox">
              <div class="ibox-title">
                <h5>Support</h5>
              </div>
              <div class="ibox-content text-center">
                <h3><i class="fa fa-phone"></i> +47 409 78 057</h3>
                <h3>
                  <a href="mailto:elyte5star@gmail.com"
                    ><i class="fa fa-envelope-o"></i> elyte5star@gmail.com</a
                  >
                </h3>
                <h3>
                  <a href="https://github.com/elyte5star"
                    ><i class="fa fa-github"></i> elyte5star</a
                  >
                </h3>
                <span class="small">
                  Please contact with us if you have any questions. We are avalible 24h.
                </span>
              </div>
            </div>
            <div v-if="products" class="ibox">
              <p class="font-bold">Products you may be interested</p>
              <div
                id="recommendation_list"
                v-for="item in Array.prototype.slice.call(products, 1, 3)"
                v-bind:key="item.pid"
                class="ibox-content"
              >
                <div class="table-responsive">
                  <table class="table shoping-cart-table">
                    <tbody>
                      <tr>
                        <td :style="{ width: '90px' }">
                          <div class="cart-product-imitation">
                            <img
                              :src="'../../src/assets/images/products/' + item.image"
                              v-bind:alt="item.name"
                            />
                          </div>
                        </td>
                        <td class="desc">
                          <h3>
                            <router-link
                              :to="{ name: 'oneProduct', params: { pid: item.pid } }"
                              class="text-navy"
                            >
                              {{ item.name }}
                            </router-link>
                          </h3>
                          <p class="small">
                            {{ item.details }}
                          </p>
                          <dl class="small m-b-none">
                            <dt>Description</dt>
                            <dd>{{ item.description }}</dd>
                          </dl>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
import { userStore } from '@/stores/userAccount'
import type { User, Booking, ItemInCart, Product } from '@/helpers/my-types'

export default defineComponent({
  name: 'UserProfile',
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
    btnText: {
      type: String,
      required: true
    },
    bookingsHistory: {
      type: Array<Booking>,
      required: true
    },
    products: {
      type: Array<Product>,
      required: true
    }
  },
  methods: {
    orderDetailsTable(itemsArray: Array<ItemInCart>) {
      console.log(itemsArray);
      let tableDiv = document.getElementById('items_order')!
      tableDiv.innerHTML = ''
      tableDiv.innerHTML =
        '<table id="order_table" class="table table-bordered table-sm"><thead><tr><th>Qty</th><th>Name of product</th><th>Product number</th><th>Price</th></tr></thead><tfoot></tfoot><tbody></tbody></table>'
      for (const item of itemsArray) {
        let htmltxt = '<tr>'
        htmltxt += '<td>' + item.quantity + '</td>'
        htmltxt += '<td>' + item.name + '</td>'
        htmltxt += '<td>' + item.pid + '</td>'
        htmltxt += '<td>' + '£' + item.price + ' (' + item.calculatedPrice + ')' + '</td>'
        htmltxt += '</tr>'
        let tableRef = document.getElementById('order_table')!.getElementsByTagName('tbody')[0]
        let newRow = tableRef.insertRow(tableRef.rows.length)
        newRow.innerHTML = htmltxt
      }
    },
    formatDate(value: Date) {
      if (value) {
        return moment(String(value)).format('DD-MM-YYYY hh:mm')
      }
    },
    changeActiveComponent(str: string) {
      this.$emit('changeActiveComponent', str)
    },
    async twoFactorLogin(username: string) {
      this.$emit('enableExternalLogin', username)
    },
    async deleteUser(pid: string) {
      const user_store = userStore()
      await user_store.deleteUserAccount(pid)
    }
  },

  computed: {
    overallTotal() {
      let amount: number = 0

      for (let price of this.bookingsHistory) {
        amount += price.totalPrice
      }
      return Math.round((amount + Number.EPSILON) * 100) / 100
    },
    userImage() {
      return new URL('../../src/assets/images/' + this.user_image, import.meta.url).href
    },
    bookingsHistoryCount() {
      return this.bookingsHistory.length
    }
  }
})
</script>
