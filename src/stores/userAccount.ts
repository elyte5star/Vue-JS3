import { defineStore } from 'pinia';
import { axiosInstance } from '@/helpers/axiosHttp';
import { userAuthStore } from '@/stores/auth_store'
import router from '@/router/index'
import type { User, Enquiry, Booking, Registration, PasswordChange, UpdateUserPassword, ModifyUserInfo} from '@/helpers/my-types';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import logger from '@/helpers/logger';

import { userAlertStore } from './alert';
export const userStore = defineStore({
    id: 'users',
    state: () => ({
        users: [] as User[], emailSent: false, user: null as User | null, bookingsHistory: [] as Booking[], alertStore: userAlertStore(), authStore: userAuthStore()
    }),
    actions: {
        async getUsers() {
            try {
                const response = await axiosInstance.get('users');
                if (response.data.success) {
                    this.users = response.data.result;
                    return;
                }

            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);
            }
        },
        async reSendOtpEmail(email: string) {
            try {
                const response = await axiosInstance.get('users/signup/resendOtp', { params: { "email": email } });
                if (response.data.success) {
                    this.emailSent = true;
                    this.alertStore.success(response.data.result);
                    return;
                    //return router.replace({ name: 'Confirm', query: response.data.result })
                } 
            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);
            }

        },
        async confirmOtpToken(token: string) {
            try {
                token = token.trim();
                const response = await axiosInstance.get('users/signup/verify-otp', { params: { "otp": token } });
                if (response.data.success) {
                    this.alertStore.success(response.data.result + ".Please, login.");
                }
            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);

            }
        },

        async confirmPasswordResetToken(token: string) {
            try {
                token = token.trim();
                const response = await axiosInstance.get('users/reset/confirm-token', { params: { "token": token } });
                if (response.data.success) {
                    return router.replace({ name: 'ChangePassword', query: { resetToken: token } });
                }
               
            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);

            }
        },
        async signUP(user: Registration) {
            try {
                const response = await axiosInstance.post('users/signup', user);
                if (response.data.success) {
                    this.emailSent = true;
                    return router.replace({ name: 'OtpEmail', query: response.data.result })
                }
            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);
            }

        },
        async changePassword(passChange: PasswordChange) {
            try {
                const response = await axiosInstance.post('users/password/change-password', passChange);
                if (response.data.success) {
                    this.alertStore.success(response.data.result +". Please Log in");
                    //return router.replace({ name: 'Confirm', query: { "message": response.data.result } })
                }
             
            } catch (error: any) {
                this.alertStore.error(error.response.data.message || 'Password Change unsuccessful!');
                logger.error(error);
            }

        },
        async updatePassword(passChange: UpdateUserPassword) {
            try {
                const response = await axiosInstance.post('users/password/updatePassword', passChange);
                if (response.data.success) {
                    //return router.replace({ name: 'Confirm', query: { "message": response.data.result } })
                    this.alertStore.success(response.data.result);
                }
            } catch (error: any) {
                this.alertStore.error(error.response.data.message || 'Password Change unsuccessful!');
                logger.error(error);
            }

        },
        async customerEnquiry(enquiry: Enquiry) {
            try {
                const response = await axiosInstance.post('users/customer/service', enquiry);
                if (response.data.success) {
                    this.alertStore.success('Your enquiry is submitted!' + " Please contact us with this number " + response.data.result);
                    return;
                }
               
            } catch (error: any) {
                this.alertStore.error(error.response.data.message || 'Operation unsuccessful'); 
                logger.error(error);
            }

        },
        async sendPasswordResetToken(email: string) {
            try {
                const response = await axiosInstance.get('users/reset/password', { params: { email: email } });
                if (response.data.success) {
                    this.alertStore.success('Your password change request was submitted!' + " Please check your email ");
                    this.emailSent = true;
                    return;
                }
               
            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);
            }
        },
        async getUserById(userid: string) {
            try {
                const response = await axiosInstance.get('users/' + userid);
                if (response.data.success) {
                    this.user = response.data.result
                    return;
                }
            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);
            }

        },
        async getBookingHistoryByUserId(userid: string){
            try {
                const response = await axiosInstance.get(`qbooking/${userid}/bookings`);
                if (response.data.success) {
                    this.bookingsHistory = response.data.result
                    return ;
                }
            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);
            }

        },
        async enableExternalLogin(username: string) {
            try {
                const response = await axiosInstance.put('users/enable/' + username);
                if (response.data.success) {
                    this.user = response.data.result
                    const txt = this.user?.using2FA ? 'External login enabled': 'External login disabled'
                    this.alertStore.success(txt);
                    return;
                }
                
            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);
            }

        },
        async updateUserById(userid: string, new_data: ModifyUserInfo| {}) {
            try {
                const response = await axiosInstance.put('users/' + userid, new_data);
                if (response.data.success) {
                    if (userid === this.authStore.userLoggedIn.userid) {
                        const user = { ...this.authStore.userLoggedIn, ...new_data };
                        localStorage.setItem('userLoggedIn', JSON.stringify(user));
                        this.authStore.userLoggedIn = user;
                        this.user =user
                    }
                    this.alertStore.success(response.data.message || 'Operation unsuccessful');
                }

            } catch (error: any) {
                this.alertStore.error(error.response.data.message)
                logger.error(error);
            }

        },

        async deleteUserAccount(userid: string) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                allowOutsideClick: false,
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                imageUrl: new URL('../../src/assets/images/ai.jpg', import.meta.url).href,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: 'Custom image',
            }).then(async (result: any) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axiosInstance.delete('users/' + userid);
                        if (response.data.success) {
                        // remove user from list after deleted
                        this.users = this.users.filter(x => x.userid !== userid);//Shallow copy
                        if (userid === this.authStore.userLoggedIn.userid) this.authStore.logout();
                            Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
                            return;
                        }
                       

                    } catch (error: any) {
                        this.alertStore.error(error.response.data.message)
                        logger.error(error);
                    }

                }
            })

        },

    }

});