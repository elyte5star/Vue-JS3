<template>
  <div v-if="user" class="user">
    <component :is="{...currentTabComponent}" :bookingsHistory="bookingsHistory" :user_info="user" :user_image="userImage"
      @changeActiveComponent="_changeActiveComponent" />
  </div>
</template>

<script lang="ts">

import { userStore } from "@/stores/userAccount";
import { storeToRefs } from "pinia";
import EditUser from "@/components/EditUser.vue";
import UserProfile from "@/components/UserProfile.vue";
import { defineComponent } from 'vue'
export default defineComponent({
  name: "UserView",
  components: { EditUser, UserProfile },
  props: {
    userid: {
      type: String, required: true
    }
  },
  setup() {
    const user_store = userStore();
    const { user, bookingsHistory } = storeToRefs(user_store);
    return {
      user_store, user, bookingsHistory,
    }
  },
  data() {

    let currentTabComponent: any = UserProfile
    return {
      currentTabComponent

    };
  },
  created() {
    this.getAUser();
  },
  computed: {
    userImage(): string {
      return this.user?.admin ? "admin-icon.png" : "user-icon.png";
    },
  },
  methods: {
    _changeActiveComponent(str: string) {
      if (str === 'update_details') {
        this.currentTabComponent = EditUser;
      } else {
        this.currentTabComponent = UserProfile;
      }
    },
    async getAUser(): Promise<void> {
      await this.user_store.getUserById(this.userid);
    }
  },
});
</script>
