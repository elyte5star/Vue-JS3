<template>
    <div v-if="user_info">
        <div id="update_entry" class="update_entry">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <form @submit.prevent="updateDetails">
                            <div class="text-center mb-3">
                                <div class="btn-group user-action">
                                    <button @click.prevent="deleteUser(user_info.userid)" class="btn btn-danger"
                                        type="submit" id="delete_account"><i class="fa fa-trash-o"></i>
                                        DELETE ACCOUNT</button>
                                    <button id="user_info" @click="updatePassword(user_info.email)"
                                        class="btn btn-warning"><i class="fa fa-key"></i>
                                        UPDATE PASSWORD
                                    </button>
                                    <button id="user_info" @click="changeActiveComponent('user_details')"
                                        class="btn btn-info"><i class="fa fa-user-circle"></i>
                                        BACK TO USER DETAILS
                                    </button>
                                </div>
                            </div>
                            <p class="text-center">or:</p>
                            <!-- Username input -->
                            <p>Modify user credentials:</p>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editUsername"><i class="fa fa-user"
                                        aria-hidden="true"></i>
                                    Username:</label>
                                <input :disabled="true" v-model="editUsername" type="text" id="editUsername"
                                    class="form-control" aria-describedby="usernameHelpBlock" />
                            </div>

                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editEmail"><i class="fa fa-envelope-o"></i>
                                    Email:</label>
                                <input v-model="editEmail" type="email" id="editEmail" class="form-control" />
                            </div>

                            <!-- Telephone input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editTel"><i class="fa fa-phone"></i> Telephone:</label>
                                <input v-model="editTel" type="tel" id="editTel" class="form-control" maxlength="20" />
                            </div>
                            <hr class="line">

                            <div class="form-outline mb-4">
                                <label class="form-label" for="fname"><i class="fa fa-user"></i> Full Name:</label>
                                <input v-model="fname" class="form-control billing-inputs" type="text" id="fname"
                                    name="fullname" placeholder="Ese Niccolio">
                            </div>
                            <div>
                                <label class="form-label" for="adr"> <i class="fa fa-address-card-o"></i>
                                    Address:</label>
                                <input v-model="address" class="form-control billing-inputs" type="text" id="adr"
                                    name="address" placeholder="542 W. 15th Street" maxlength="20">
                            </div>
                            <div>
                                <label class="form-label" for="city"><i class="fa fa-institution"></i>
                                    City:</label>
                                <input v-model="city" class="form-control billing-inputs" type="text" id="city"
                                    name="city" placeholder="Lagos or St. Laos" maxlength="16">
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label class="form-label" for="state"><i class="fa fa-globe"
                                            aria-hidden="true"></i> Country:</label>
                                    <select v-model="bcountry" class="form-select" id="country" name="country">
                                        <option v-if="countries" v-for="country in countries" :key="country.text"
                                            :value=country.value>{{ country.text }}</option>
                                    </select>
                                </div>
                                <div class="col-md-6"> <label class="form-label" for="zip"><i class="fa fa-map-pin"
                                            aria-hidden="true"></i> Zip:</label>
                                    <input v-model="zip" class="form-control billing-inputs" type="text" id="zip"
                                        name="zip" placeholder="10001">
                                </div>
                            </div><br>

                            <!-- Submit button -->
                            <button type="submit" class="btn btn-primary btn-block mb-3">Modify account details</button>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div class="ibox">
                            <div class="ibox-title">
                                <h5>Support</h5>
                            </div>
                            <div class="ibox-content text-center">
                                <h3><i class="fa fa-phone"></i> +47 409 78 057</h3>
                                <h3><a href="mailto:checkuti@gmail.com"><i class="fa fa-envelope-o"></i>
                                        checkuti@gmail.com</a></h3>
                                <h3><a href="https://github.com/elyte5star"><i class="fa fa-github"></i> elyte5star</a>
                                </h3>
                                <span class="small">
                                    Please contact with us if you have any questions. We are avalible 24h.
                                </span>
                            </div>
                        </div>


                        <div class="ibox">
                            <div class="ibox-content">

                                <p class="font-bold">
                                    Products you may be interested
                                </p>
                                <hr>
                                <div>
                                    <a href="#" class="product-name"> Product 1</a>
                                    <div class="small m-t-xs">
                                        Many desktop publishing packages and web page editors now.
                                    </div>
                                    <div class="m-t text-righ">

                                        <a href="#" class="btn btn-xs btn-outline btn-primary">Info <i
                                                class="fa fa-long-arrow-right"></i> </a>
                                    </div>
                                </div>
                                <hr>
                                <div>
                                    <a href="#" class="product-name"> Product 2</a>
                                    <div class="small m-t-xs">
                                        Many desktop publishing packages and web page editors now.
                                    </div>
                                    <div class="m-t text-righ">

                                        <a href="#" class="btn btn-xs btn-outline btn-primary">Info <i
                                                class="fa fa-long-arrow-right"></i> </a>
                                    </div>
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

import { userStore } from "@/stores/userAccount";
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { ModifyUserInfo, User } from "@/helpers/my-types";
import { userAlertStore } from '@/stores/alert';
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';
import { countries, validateFullName, is_valid_Email, isObjEmpty } from '@/helpers/script';
export default defineComponent({
    name: 'EditUser',
    data() {
        return { zip: null, countries: countries, fname: null, address: null, city: null, bcountry: null, editTel: '', editEmail: '', editUsername: '', userStore: userStore(), alertStore: userAlertStore() }
    },
    props: {
        user_info: {
            type: Object as PropType<User>, required: true
        }
    },
    methods: {
        changeActiveComponent(str: string) {
            this.$emit('changeActiveComponent', str);
        },
        async updatePassword(email: string) {
            console.log(email);

        },
        async updateDetails() {
            const address = this.checkAddress();
            if (!isObjEmpty(address)) {
                await this.userStore.updateUserById(this.user_info.userid, address);
                return;
            }
            this.alertStore.error("Telephone or email can not be empty!")

        },
        async deleteUser(userid: string) {
            await this.userStore.deleteUserAccount(userid);
        },
        checkPostCodeAndCountry(countryCode: string | null, zip: string | null): boolean {
            if (!postcodeValidatorExistsForCountry(countryCode as string)) {
                this.alertStore.error("No valid postcode for the selected country!");
                (<HTMLInputElement>document.getElementById('country')).focus();
                return false;

            } else if (!postcodeValidator(zip as string, countryCode as string)) {
                this.alertStore.error("Invalid postcode for the selected country!");
                (<HTMLInputElement>document.getElementById('zip')).focus();
                return false;

            } else {
                return true;
            }

        },
        checkAddress(): ModifyUserInfo | {} {
            if (validateFullName(this.fname)
                && is_valid_Email(this.editEmail)
                && this.address && this.city && this.editTel
                && this.checkPostCodeAndCountry(this.bcountry, this.zip)
            ) {
                const update: ModifyUserInfo = {
                    email: this.editEmail,
                    telephone: this.editTel,
                    fullName: this.fname,
                    address: this.address,
                    country: this.bcountry,
                    zip: this.zip,
                    city: this.city
                }

                return update;
            }

            return {};
        },

    },
    mounted() {
        this.editUsername = this.user_info.username;
        this.editTel = this.user_info.telephone;
        this.editEmail = this.user_info.email;
    },

})
</script>