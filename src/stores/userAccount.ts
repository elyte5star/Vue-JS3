import { defineStore } from 'pinia';

import Swal from 'sweetalert2/dist/sweetalert2';

import { fetchMethodWrapper } from '@/helpers/methodWrapper';

import { userAuthStore } from '@/stores/auth_store'

const baseURL = import.meta.env.VITE_API_URL + 'users';
import { userAlertStore } from './alert';
export const userStore = defineStore({
    id: 'users',
    state: () => ({
        users: null, user: null, bookingsHistory: []
    }),
    actions: {
        async getUsers() {
            try {
                const response = await fetchMethodWrapper.get(baseURL + '/all');
                this.users = response.users;

            } catch (error) {
                this.users = { error };
            }

        },
        async signUP(user) {
            const response = await fetchMethodWrapper.post(baseURL + '/signup', user);
            const alertStore = userAlertStore();
            if (response["success"]) {
                alertStore.success('Good job!' + " User with ID " + response.userid + " has been created!");

            } else {
                alertStore.error(response.message);

            }
        },
        async getUserById(id) {
            try {
                const response = await fetchMethodWrapper.get(baseURL + '/' + id);
                this.user = response.user;
                this.bookingsHistory = response.user.bookings

            } catch (error) {
                this.user = { error };
            }


        },
        async updateUserById(id: string, new_data: any) {
            try {
                await fetchMethodWrapper.put(baseURL + '/' + id, new_data);
                const authStore = userAuthStore();
                if (id === authStore.user.userid) {
                    const user = { ...authStore.user, ...new_data };
                    localStorage.setItem('user', JSON.stringify(user));
                }
            } catch (error) {
                this.user = { error };
            }


        },

        async deleteUserAccount(id: string) {

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    await fetchMethodWrapper.delete(baseURL + '/' + id);
                    // remove user from list after deleted
                    this.users = this.users.filter(x => x.id !== id);

                    const authStore = userAuthStore();
                    if (id === authStore.user.userid) {
                        authStore.logout();
                    }

                    Swal.fire(
                        'Deleted!',
                        'Your account has been deleted.',
                        'success'
                    )
                }
            })



        },

    }

});