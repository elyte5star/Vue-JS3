<template>
    <div>
        <!--Section: Contact v.2-->
        <div id="customer_service" class="customer_service">
            <div class="container">
                <div class="row">
                    <!--Grid column-->
                    <div class="col-md-9 mb-md-0 mb-5">
                        <h1 class="h1-responsive font-weight-bold text-center my-4">Contact us</h1>

                        <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate
                            to
                            contact us
                            directly. Our team will come back to you within
                            a matter of hours to help you.</p>
                        <form id="contact-form" name="contact-form" @submit.prevent="onSubmitEnquiry">
                            <!--Grid row-->
                            <div class="row">
                                <!--Grid column-->
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input v-model="name_contact" type="text" id="name_contact" name="name"
                                            class="form-control">
                                        <label for="name" class="">Your name</label>
                                    </div>
                                </div>
                                <!--Grid column-->

                                <!--Grid column-->
                                <div class="col-md-6">
                                    <div class="md-form mb-0">
                                        <input v-model="email_contact" type="text" id="email_contact" name="email_contact"
                                            class="form-control">
                                        <label for="email_contact" class="">Your email</label>
                                    </div>
                                </div>
                                <!--Grid column-->

                            </div>
                            <!--Grid row-->

                            <!--Grid row-->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="md-form mb-0">
                                        <input v-model="subject" type="text" id="subject" name="subject"
                                            class="form-control">
                                        <label for="subject" class="">Subject</label>
                                    </div>
                                </div>
                            </div>
                            <!--Grid row-->

                            <!--Grid row-->
                            <div class="row">

                                <!--Grid column-->
                                <div class="col-md-12">
                                    <div class="md-form">
                                        <textarea v-model="message" type="text" id="message" name="message" rows="2"
                                            class="form-control md-textarea"></textarea>
                                        <label for="message">Your message</label>
                                    </div>

                                </div>
                            </div>
                            <button class="btn btn-primary" type="submit">Send message</button>
                        </form>


                        <div class="status"></div>
                    </div>
                    <!--Grid column-->

                    <!--Grid column-->
                    <div class="col-md-3 text-center" style="padding: ;">
                        <div class="ibox-title">
                            <h5>Support</h5>
                        </div>
                        <hr>
                        <ul class="list-unstyled mb-0">
                            <li><i class="fa fa-map-marker"></i>
                                <p>Hundvåg Island, 4085, Norway</p>
                            </li>

                            <li><i class="fa fa-phone"></i>
                                <p>+ 47 409 780 57</p>
                            </li>

                            <li><i class="fa fa-envelope-o"></i><br>
                                <a href="mailto:checkuti@gmail.com">elyte5star@gmail.com</a>
                            </li>
                            <li><i class="fa fa-github"></i><br>
                                <a href="https://github.com/elyte5star">elyte5star</a>
                            </li>
                        </ul>

                    </div>
                    <!--Grid column-->

                </div>
            </div>
        </div>
        <!--Section: Contact v.2-->
    </div>
</template>

<script lang="ts">
import { userAlertStore } from '@/stores/alert';
import { userStore } from '@/stores/userAccount';
import { is_valid_Email } from '@/helpers/script';
import type { Enquiry } from '@/helpers/my-types';
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'ContactUs',
    data() {
        return {
            name_contact: null,
            message: null,
            subject: null,
            email_contact: null,
            user_store: userStore()

        }
    },
    methods: {
        async onSubmitEnquiry() {
            const alertStore = userAlertStore();
            if (this.name_contact && this.email_contact && is_valid_Email(this.email_contact) && this.subject && this.message) {
                const enquiry: Enquiry = {
                    client_name: this.name_contact,
                    client_email: this.email_contact,
                    subject: this.subject, message: this.message
                }
                await this.user_store.customerEnquiry(enquiry);
                this.name_contact = null;
                this.email_contact = null;
                this.subject = null;
                this.message = null;
            }
            else {
                if (!this.name_contact) alertStore.error("Name field is empty!");
                if (!this.email_contact || !is_valid_Email(this.email_contact)) alertStore.error("Email field is empty or invalid email!");
                if (!this.subject) alertStore.error("Subject field is empty!");
                if (!this.message) alertStore.error("Message field is empty");

            }

        }

    },
})
</script>