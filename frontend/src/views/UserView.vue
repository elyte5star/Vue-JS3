<template>
  <div v-if="user" class="user">

    <component :is="{...activeComponent}" :bookingsHistory="bookingsHistory" :user_info="user" :user_image="user_image"
      @changeActiveComponent="_changeActiveComponent" />

  </div>
</template>

<script lang="ts">

import { userStore } from "@/stores/userAccount";
import { storeToRefs } from "pinia";
import EditUser from "@/components/EditUser.vue";
import UserProfile from "@/components/UserProfile.vue";
import { Booking,User } from "@/helpers/my-types";

export default {
  name: "UserView",
  components: { EditUser, UserProfile },
  props: {
    userid: {
      type: String,required: true
    }
  },
  data() {

    return {
      activeComponent: UserProfile,
      user_image: '',
      user: {},
      bookingsHistory: [] as Array<Booking>
    };
  },
  async created() {
    const user_store = userStore();
    await user_store.getUserById(this.userid);
    const { user, bookingsHistory } = storeToRefs(user_store);
    this.user = user;
    this.bookingsHistory = bookingsHistory
    this.user_image = this.user.admin ? "admin-icon.png" : "user-icon.png";

  },

  methods: {
    _changeActiveComponent(str: string) {
      if (str === 'update_details') {
        this.activeComponent = EditUser;

      } else {
        this.activeComponent = UserProfile;
      }

    },
  },
};
</script>

