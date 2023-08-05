<template>
  <q-layout view="hHh lpR fFf" class="layout layout--default">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <UiBtn
          :dense="true"
          :flat="flat"
          :round="true"
          icon="menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>
          <p class="q-mb-none">Сервис обработки платежных квитанций</p>
        </q-toolbar-title>
        <UiBtn icon="more_vert" :flat="flat">
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
              </div>

              <div class="column items-center">
                <q-avatar
                  size="72px"
                  class="cursor-pointer"
                  @click="$router.push({ name: 'page-profile' })"
                >
                  <img src="/admin_avatar.jpg" >
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ firstName }} {{ lastName }}
                </div>
                <UiBtn :v-close-popup="true"
                       class="text-white primary"
                       :label="titleLogout"
                       color="primary"
                       :push = "true"
                       :size="sm"
                       @click="showConfirm = true" />

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
      class="flex justify-center align-center bg-linear-gradient"
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
import UiBtn from 'src/components/ui-btn'
import ConformitionDialog from 'src/components/conformition-dialog'
// eslint-disable-next-line no-unused-vars
const authStore = useAuthStore()
const $router = useRouter()

// state
const leftDrawerOpen = ref(false)
const showConfirm = ref(false)

const lastName = computed(() => authStore?.getUser?.last_name || 'Error')
const firstName = computed(() => authStore?.getUser?.first_name || '')

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
.bg-linear-gradient {
  background: -webkit-linear-gradient(
    to right,
    #00b4ff,
    #c4efff,
    #ffffff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #00b4ff, #c4efff, #ffffff);
}
.primary{
  background-color: #00b4ff;
  color: var(--q-primary);
}
</style>
