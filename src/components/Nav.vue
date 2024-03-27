<template>
    <div>
        <header>
            <nav>
                <ul id="nav_items">
                    <li><router-link :to="{ name: 'Home' }"><i class="fa fa-fw fa-home"></i>Home</router-link></li>
                    <li v-show="greeting"><router-link :to="{ name: 'Home' }" id="greeting"><span v-html="greeting"></span></router-link>
                    </li>
                    <li v-if="version"><a href="javascript:void(0)"><i class="fa fa-code-fork"></i>Vue version {{ version
                    }}</a></li>

                    <li v-if="userLoggedIn"><router-link :to="{ name: 'oneUser', params: { userid: userLoggedIn.userid } }"><i
                                class="fa fa-user-circle" style="font-size: 25px"></i>Logged
                            in as {{ userLoggedIn.username
                            }}</router-link></li>
                    <li v-if="!!userLoggedIn?.admin"><a href="/admin"><i class="fa fa-cogs"></i>Admin page</a></li>

                    <li><router-link to="/cart"><i class="fa fa-shopping-cart" style="font-size: 25px"></i>Cart<span
                                id="items">{{
                                    itemsInCart }}</span></router-link></li>

                    <li><router-link :to="{ name: 'Contact' }" id="contact_us"><i class="fa fa-comments">Contact
                                us</i></router-link>
                    </li>
                    <li v-if="userLoggedIn"><a href="javascript:void(0)" v-on:click="logout()"><i
                                class="fa fa-sign-out"></i>Logout</a></li>
                    <li v-if="!userLoggedIn"><router-link :to="{ name: 'Login' }"><i class="fa fa-sign-in"></i>Login</router-link>
                    </li>
                </ul>

            </nav>
        </header>

    </div>
</template>

<script lang="ts">

import { storeToRefs } from 'pinia';

import { userCartStore } from '@/stores/cart'

import { userAuthStore } from '@/stores/auth_store';
import { greet } from '@/helpers/script';
import { defineComponent } from 'vue'


export default defineComponent({
    name: 'NavBar',
    props: {
        version: {
            type: String
        }
    },
    setup() {
        const cartStore = userCartStore()
        const authStore = userAuthStore()
        const { userLoggedIn } = storeToRefs(authStore);
        const { itemsInCart } = storeToRefs(cartStore);
        return {
            userLoggedIn, itemsInCart, authStore
        }
    },

    methods: {
        logout() {
            this.authStore.logout();
        },
    },
    computed: {
        greeting() {
            return greet();
        }

    }
})

</script>