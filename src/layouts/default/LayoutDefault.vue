<template>
  <q-layout view="hHh lpR fFf" class="layout layout--default">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense
               flat
               round
               icon="menu"
               @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <p class="q-mb-none">Сервис обработки платежных квитанций</p>
        </q-toolbar-title>
        <q-btn icon="more_vert" flat @click="openUserMenu" >

          <q-menu v-if="showMenu">
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
              </div>

              <div class="column items-center">
                <q-avatar size="72px" class= 'cursor-pointer'  @click="goToPageProfile">
                  <img src="/admin_avatar.jpg" >
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ firstName }} {{ lastName }}
                </div>

                <q-btn
                  v-close-popup
                  label="Logout"
                  color="primary"
                  push
                  size="sm"
                  @click="confirmCloseUserMenu"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"
              show-if-above
              side="left"
              bordered>
      <q-list style="max-width: 304px">
        <q-item
          v-for="item in navListSideBar"
          :key="item?.key"
          v-ripple
          clickable
          @click="clickNavItem(item?.type)"
        >
          <q-item-section style="max-width: 10%">
            <q-icon :name="item?.icon" style="color: #938f99" size="20px" />
          </q-item-section>
          <q-item-section>
            <span class="text-menu-item">{{ item?.text }}</span>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container
      style="width: 100%"
      class="flex justify-center align-center"
    >
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref, computed } from 'vue'
import { navListSideBar } from 'src/services/nav/nav-items'
import { useAuthStore } from 'src/stores/auth.store'
import { useRouter } from 'vue-router'
// import { QDialog } from '../../components/q-dialogs/QDialogConfirm.vue'

// eslint-disable-next-line no-unused-vars
const authStore = useAuthStore()
const $router = useRouter()
// state
const leftDrawerOpen = ref(false)
const showMenu = ref(false)
const showConfirm = ref(false)

const lastName = computed(() => authStore?.getUser?.last_name || 'Error')
const firstName = computed(() => authStore?.getUser?.first_name || '')

// methods
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const openUserMenu = () => {
  showMenu.value = true
}
const confirmCloseUserMenu = () => {
  showConfirm.value = true
}
const goToPageProfile = () => {
  $router.push({ name: 'page-profile' })
}

</script>
<style scoped>
.layout--default {
  display: flex;
  min-width: var(--app-min-width);
  height: 100vh;
  /* min-height: var(--app-min-height); */
}
.q-page-container {
  background: -webkit-linear-gradient(
    to right,
    #00b4ff,
    #c4efff,
    #ffffff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #00b4ff, #c4efff, #ffffff);
}
</style>
