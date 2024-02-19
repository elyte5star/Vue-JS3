<template>
  <div class="big-icons">
    <!-- Search content -->
    <div id="search">
      <input :style="{ backgroundImage: 'url(' + searchImage + ')' }" @keyup="searchEntries()" type="text" name="search"
        id="search-icon" size="15" placeholder="Search.." />
    </div>
    <h1 id="welcome">Welcome to elyte realm</h1>
    <!-- Sort content -->
    <div class="dropdown" id="sort-div">
      <i class="fa fa-sort"></i>
      <button class="dropbtn">Sort content
        <i class="fa fa-caret-down"></i>
      </button>
      <div class="dropdown-content">
        <a href="javascript:void(0);">Deals</a>
        <a href="javascript:void(0);" v-on:click.stop="sortByNameAsc"><i class="fa fa-sort-alpha-asc"></i>Alpahbetical
          order</a>
        <a href="javascript:void(0);" v-on:click.stop="sortByNameDesc"><i class="fa fa-sort-alpha-desc"></i>Alpahbetical
          order</a>
        <a href="javascript:void(0)" v-on:click.stop="sortByPriceDesc"><i
            class="fa fa-sort-numeric-desc"></i>Price:High-Low</a>
        <a href="javascript:void(0)" v-on:click.stop="sortByPriceAsc"><i
            class="fa fa-sort-numeric-asc"></i>Price:Low-High</a>
      </div>
    </div>
    <!-- Sub content Icons-->
    <div id="icons" class="icons">
      <div class="icon-div"><a href="/map"><i class="fa fa-map-marker"></i><span class="icon-text">Maps</span></a></div>
      <div class="icon-div"><a href="/game"><i class="fa fa-gamepad"></i><span class="icon-text">Games</span></a></div>
      <div class="icon-div"><a href="javascript:void(0)"><i class="fa fa-gift"></i><span class="icon-text">Gift</span></a>
      </div>
      <div class="icon-div"><a href="javascript:void(0)"><i class="fa fa-car"></i><span
            class="icon-text">Automobile</span></a></div>
      <div class=" icon-div"><a href=" javascript:void(0)"><i class="fa fa-bed"></i><span
            class="icon-text">Hotels</span></a></div>
      <div class="icon-div"><a href="/news"><i class="fa fa-newspaper-o"></i><span class="icon-text">News</span></a></div>
    </div>
  </div>
</template>


<script lang="ts">

import type { ProductsQuery } from '@/helpers/my-types';
import { filterEntries } from '@/helpers/script';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BigIcons',
  props: {
    totalRow: {
      type: Number,
      required: true
    },
    pageNum: {
      type: Number,
      required: true
    }
  },
  methods: {
    searchEntries() {
      filterEntries();
    },
    sortByNameAsc() {
      const params: ProductsQuery = {
        page: this.pageNum,
        size: this.totalRow,
        sort: "name"
      }
      this.$emit('sortProducts', params);
    },

    sortByNameDesc() {
      const params: ProductsQuery = {
        page: this.pageNum,
        size: this.totalRow,
        sort: "name,desc"
      }
      this.$emit('sortProducts', params);
    },
    sortByPriceAsc() {
      const params: ProductsQuery = {
        page: this.pageNum,
        size: this.totalRow,
        sort: "price"
      }
      this.$emit('sortProducts', params);
    },
    sortByPriceDesc() {
      const params: ProductsQuery = {
        page: this.pageNum,
        size: this.totalRow,
        sort: "price,desc"
      }
      this.$emit('sortProducts', params);
    },

  },
  computed: {
    searchImage() {
      return new URL('../../src/assets/images/searchicon.png', import.meta.url).href

    }

  }


})
</script>

