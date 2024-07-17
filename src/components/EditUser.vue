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
                                    <button id="user_info" @click="changeActiveComponent('update-password')"
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
                            <p class="text-center">Modify user credentials</p>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editUsername"><i class="fa fa-user"
                                        aria-hidden="true"></i>
                                    Username:</label>
                                <input  v-model="editUsername" type="text" id="editUsername"
                                    class="form-control" aria-describedby="usernameHelpBlock" />
                            </div>

                            <!-- Email input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editEmail"><i class="fa fa-envelope-o"></i>
                                    Email:</label>
                                <input :disabled="true" v-model="editEmail" type="email" id="editEmail" class="form-control" />
                            </div>

                            <!-- Telephone input -->
                            <div class="form-outline mb-4">
                                <label class="form-label" for="editTel"><i class="fa fa-phone"></i> Telephone:</label>
                                <input v-model="editTel" type="tel" id="editTel" class="form-control" maxlength="20" />
                            </div>
                            <hr class="line">
                            <p class="text-center">Billing Address</p>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="fname"><i class="fa fa-user"></i> Full Name:</label>
                                <input v-model="fname" class="form-control billing-inputs" type="text" id="fname"
                                    name="fullname" placeholder="Ese Niccolio Rain">
                            </div>
                            <div>
                                <label class="form-label" for="adr"> <i class="fa fa-address-card-o"></i>
                                    Address:</label>
                                <input v-model="address" class="form-control billing-inputs" type="text" id="adr"
                                    name="address" placeholder="542 W. 15th Street" maxlength="20">
                            </div>
                            <div>
                                <label class="form-label" for="state"><i class="fa fa-institution"></i>
                                    State:</label>
                                <input v-model="state" class="form-control billing-inputs" type="text" id="state"
                                    name="state" placeholder="Lagos or St. Laos" maxlength="16">
                            </div>
                            <div class="row">
                                <div class="col-md-6"><label class="form-label" for="state"><i class="fa fa-globe"
                                            aria-hidden="true"></i> Country:</label>
                                    <select v-if="countries" v-model="bcountry" class="form-select" id="country"
                                        name="country">
                                        <option v-for="country in countries" :key="country.text" :value=country.value>{{
        country.text }}</option>
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
                                <h3>
                                    <a href="mailto:elyte5star@gmail.com"><i class="fa fa-envelope-o"></i>
                                        elyte5star@gmail.com</a>
                                </h3>
                                <h3>
                                    <a href="https://github.com/elyte5star"><i class="fa fa-github"></i> elyte5star</a>
                                </h3>
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

import {
    userStore
} from "@/stores/userAccount";
import {
    defineComponent
} from 'vue'
import type {
    PropType
} from 'vue'
import type {
    ModifyUserInfo,
    Product,
    User
} from "@/helpers/my-types";
import {
    postcodeValidator,
    postcodeValidatorExistsForCountry
} from 'postcode-validator';
import {
    countries,
    validateFullName,
    is_valid_Email,
    isObjEmpty, isValidTel,
isUserNameValid
} from '@/helpers/script';
export default defineComponent({
    name: 'EditUser',
    data() {
        return {
            zip: '',
            countries: countries,
            fname: '',
            address: '',
            state: '',
            bcountry: '',
            editTel: '',
            editEmail: '',
            editUsername: '',
            userStore: userStore(),
        }
    },
    props: {
        user_info: {
            type: Object as PropType<User>,
            required: true
        },
        
    },
    methods: {
        changeActiveComponent(str: string) {
            this.$emit('changeActiveComponent', str);
        },
        async updateDetails() {
            const address = this.checkAddress();
            if (!isObjEmpty(address)) {
                await this.userStore.updateUserById(this.user_info.userid, address);
                return;
            }
            this.invalidFeedback();


        },
        invalidFeedback() {
            if (!this.editEmail || !is_valid_Email(this.editEmail)) {
                this.userStore.alertStore.error("Invalid email address!");
                (document.getElementById('editEmail') as HTMLInputElement).focus();
            } else if (!this.editTel || !isValidTel(this.editTel)) {
                this.userStore.alertStore.error("Enter valid tel!");
                (document.getElementById('editTel') as HTMLInputElement).focus();
            } else if (!this.fname || !validateFullName(this.fname)) {
                this.userStore.alertStore.error("Invalid full name!");
                (document.getElementById('fname') as HTMLInputElement).focus();
            } else if (!this.address) {
                this.userStore.alertStore.error("Invalid billing address!");
                (document.getElementById('adr') as HTMLInputElement).focus();
            }
            else {
                this.userStore.alertStore.error("Please enter valid state!");
                (document.getElementById('state') as HTMLInputElement).focus();
            }


        },
        async deleteUser(userid: string) {
            await this.userStore.deleteUserAccount(userid);
        },
        checkPostCodeAndCountry(countryCode: string | null, zip: string | null): boolean {
            if (!postcodeValidatorExistsForCountry(countryCode as string)) {
                this.userStore.alertStore.error("No valid postcode for the selected country!");
                (document.getElementById('country') as HTMLInputElement).focus();
                return false;

            } else if (!postcodeValidator(zip as string, countryCode as string)) {
                this.userStore.alertStore.error("Invalid postcode for the selected country!");
                (document.getElementById('zip') as HTMLInputElement).focus();
                return false;

            } else {
                return true;
            }

        },
        checkAddress(): ModifyUserInfo | {} {
            if (validateFullName(this.fname) &&
                is_valid_Email(this.editEmail) &&
                this.address && this.state && this.editTel && isUserNameValid(this.editUsername) &&
                this.checkPostCodeAndCountry(this.bcountry, this.zip)
            ) {
                const update: ModifyUserInfo = {
                    username: this.editUsername,
                    telephone: this.editTel,
                    address: {
                        fullName: this.fname,
                        streetAddress: this.address,
                        country: this.bcountry,
                        zip: this.zip,
                        state: this.state
                    }

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
        this.fname = this.user_info.address?.fullName
        this.address = this.user_info.address?.streetAddress
        this.bcountry = this.user_info.address?.country
        this.zip = this.user_info.address?.zip
        this.state = this.user_info.address?.state
    },

})
</script>
