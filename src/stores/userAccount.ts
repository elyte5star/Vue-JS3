import { defineStore } from 'pinia';

import Swal from 'sweetalert2/dist/sweetalert2';

import { fetchMethodWrapper } from '@/helpers/methodWrapper';

import { userAuthStore } from '@/stores/auth_store'
import router from '@/router/index'
import type { User, Enquiry, Booking } from '@/helpers/my-types';

const APIURL = process.env.VUE_API_URL + 'users';
import { userAlertStore } from './alert';
export const userStore = defineStore({
    id: 'users',
    state: () => ({
        users: [] as User[], user: {} as User | {}, bookingsHistory: null as Booking | null, alertStore: userAlertStore(), authStore: userAuthStore()
    }),
    actions: {
        async getUsers() {
            const response = await fetchMethodWrapper.get(APIURL);
            if (!response.success) {
                this.alertStore.error(response.message || 'Couldnt get Users');
                return;
            }
            this.users = response.users;
        },
        async signUP(user: any) {
            const response = await fetchMethodWrapper.post(APIURL + '/signup', user);
            if (!response.success) {
                this.alertStore.error(response.message || 'Registration unsuccessful!');
                return;
            }
            await router.push({ path: '/login', replace: true })
            this.alertStore.success('Good job!' + " User with ID " + response.userid + " has been created!");

        },
        async customerEnquiry(enquiry: Enquiry) {
            const response = await fetchMethodWrapper.post(APIURL + '/customer/service', enquiry);
            if (!response.success) {
                this.alertStore.error(response.message || 'Operation unsuccessful');
                return;
            }
            this.alertStore.success('Your enquiry is submitted!' + " Please contact us with this number " + response.eid);

        },
        async getUserById(userid: string) {
            const response = await fetchMethodWrapper.get(APIURL + '/' + userid);
            if (!response.success) {
                this.alertStore.error(response.message || 'Operation unsuccessful');
                return;
            }
            this.user = response.user
            this.bookingsHistory = response.user.bookings

        },
        async updateUserById(userid: string, new_data: any) {
            const response = await fetchMethodWrapper.put(APIURL + '/' + userid, new_data);
            if (!response.success) {
                this.alertStore.error(response.message || 'Operation unsuccessful');
                (<HTMLInputElement>document.getElementById('alert1')).scrollIntoView();
                return;
            }

            if (userid === this.authStore.user.userid) {
                const user = { ...this.authStore.user, ...new_data };
                localStorage.setItem('user', JSON.stringify(user));
                this.authStore.user = user;
            }

        },

        async deleteUserAccount(userid: string) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result: any) => {
                if (result.isConfirmed) {
                    const response = await fetchMethodWrapper.delete(APIURL + '/' + userid);
                    if (!response.success) {
                        this.alertStore.error(response.message || 'Operation unsuccessful');
                        return;
                    }
                    // remove user from list after deleted
                    this.users = this.users.filter(x => x.userid !== userid);//Shallow copy

                    if (userid === this.authStore.user.userid) this.authStore.logout();
                    this.alertStore.success('Your account has been deleted.')

                }
            })

        },

    }

});