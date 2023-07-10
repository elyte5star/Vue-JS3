import { defineStore } from 'pinia';

import Swal from 'sweetalert2/dist/sweetalert2';

import { fetchMethodWrapper } from '@/helpers/methodWrapper';

import { userAuthStore } from '@/stores/auth_store'
import { Booking } from '@/helpers/my-types';

const APIURL = import.meta.env.VITE_API_URL + 'users';
import { userAlertStore } from './alert';
export const userStore = defineStore({
    id: 'users',
    state: () => ({
        users: [], user: {}, bookingsHistory: null, alertStore: userAlertStore()
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
        async signUP(user: {}) {
            const response = await fetchMethodWrapper.post(APIURL + '/signup', user);
            if (!response.success) {
                this.alertStore.error(response.message || 'Registration unsuccessful!');
                return;
            }
            this.alertStore.success('Good job!' + " User with ID " + response.userid + " has been created!");

        },
        async customerEnquiry(enquiry) {
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
            this.user = response.user;
            this.bookingsHistory = response.user.bookings

        },
        async updateUserById(userid: string, new_data: any) {
            const response = await fetchMethodWrapper.put(APIURL + '/' + userid, new_data);
            if (!response.success) {
                this.alertStore.error(response.message || 'Operation unsuccessful');
                (<HTMLInputElement>document.getElementById('alert1')).scrollIntoView();
                return;
            }
            const authStore = userAuthStore();
            if (userid === authStore.user.userid) {
                const user = { ...authStore.user, ...new_data };
                localStorage.setItem('user', JSON.stringify(user));
                authStore.user = user;
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
                    const authStore = userAuthStore();
                    if (userid === authStore.user.userid) authStore.logout();
                    this.alertStore.success('Your account has been deleted.')

                }
            })

        },

    }

});