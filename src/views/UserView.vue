<template>
  <div v-if="user" class="user">
    <component
      :is="{ ...currentTabComponent }"
      :btnText="buttonText"
      :bookingsHistory="bookingsHistory"
      :user_info="user"
      :products="products"
      :user_image="userImage"
      @changeActiveComponent="_changeActiveComponent"
      @enableExternalLogin="enableExternalLogin"
    />
  </div>
</template>

<script lang="ts">
import { userStore } from '@/stores/userAccount'
import { storeToRefs } from 'pinia'
import EditUser from '@/components/EditUser.vue'
import UserProfile from '@/components/UserProfile.vue'
import UpdatePassword from '@/components/UpdatePassword.vue'
import { productStore } from '@/stores/products'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'UserView',
  components: { EditUser, UserProfile, UpdatePassword },
  props: {
    userid: {
      type: String,
      required: true
    }
  },
  setup() {
    const user_store = userStore()
    const pStore = productStore()
    const { products } = storeToRefs(pStore)
    const { user, bookingsHistory } = storeToRefs(user_store)
    return {
      user_store,
      user,
      bookingsHistory,products,pStore
    }
  },
  data() {
    let currentTabComponent: any = UserProfile
    return {
      currentTabComponent
    }
  },
  created() {
    this.getAUser()
    this.getAllProducts()
  },
  computed: {
    userImage(): string {
      return this.user?.admin ? 'admin-icon.png' : 'user-icon.png'
    },
    buttonText(): string {
      return this.user?.using2FA ? 'DISABLE MSOFT OR GOOGLE LOGIN' : 'ENABLE MSOFT OR GOOGLE LOGIN'
    }
  },
  methods: {
    _changeActiveComponent(str: string) {
      if (str === 'update_details') {
        this.currentTabComponent = EditUser
      } else if (str === 'update-password') {
        this.currentTabComponent = UpdatePassword
      } else {
        this.currentTabComponent = UserProfile
      }
    },
    async getAllProducts() {
            await this.pStore.getProducts()
        },
    async getAUser(): Promise<void> {
      await this.user_store.getUserById(this.userid)
    },

    async enableExternalLogin(username: string): Promise<void> {
      await this.user_store.enableExternalLogin(username)
    }
  }
})
</script>
