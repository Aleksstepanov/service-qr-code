<template>
  <q-layout view="hHh lpR fFf" class="layout layout--default">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <UiBtn
          :dense="true"
          :flat="flat"
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <p class="q-mb-none">Сервис обработки платежных квитанций</p>
        </q-toolbar-title>
        
        <UiBtn icon="more_vert" flat>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <UiAvatar
                  :avatar="avatar"
                  @click:avatar="$router.push({ name: 'page-profile' })"
                />

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ firstName }} {{ lastName }}
                </div>

                <UiBtn
                  v-bind="$attrs"
                  :v-close-popup="true"
                  :label="titleLogout"
                  class="primary-white"
                  :push="true"
                  :size="xs"
                  @click="showConfirm = true"
                />
              </div>
            </div>
          </q-menu>
        </UiBtn>
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
          @click="$router.push(item?.to)"
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
  <ConformitionDialog
    v-model:show="showConfirm"
    title="Вы действительно хотите выйти?"
    title-cancel="Отмена"
    title-confirm="Выйти"
    @confirm="onConfirm"
  />
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { navListSideBar } from 'src/services/nav/nav-items'
import { useAuthStore } from 'src/stores/auth.store'

import UiBtn from 'src/components/ui-btn/UiBtn.vue'
import UiAvatar from 'src/components/ui-avatar/'
import ConformitionDialog from 'src/components/conformition-dialog'

// eslint-disable-next-line no-unused-vars
const authStore = useAuthStore()
const $router = useRouter()

// state
const leftDrawerOpen = ref(false)
const showConfirm = ref(false)

const lastName = computed(() => authStore?.getUser?.last_name || '')
const firstName = computed(() => authStore?.getUser?.first_name || '')
const avatar = computed(() => authStore?.getUser?.avatar)

// methods
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const onConfirm = () => {
  authStore.logout()
}

defineProps({
  titleLogout: {
    type: String,
    default: 'Logout'
  }
})
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

.btn-logout {
  font-size: 14px;
  border-radius: 5px;
  padding: 0 5px;
}
</style>
