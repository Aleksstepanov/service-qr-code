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
          <p class="q-mb-none">Мониторинг отделки</p>
        </q-toolbar-title>
        <q-btn icon="more_vert" flat/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen"
              show-if-above
              side="left"
              bordered
    >
      <q-list style="max-width: 304px;">
        <q-item v-for="(item, idx) in navList"
                :key="idx"
                v-ripple
                clickable
                @click="clickNavItem(item?.type)"
        >
          <q-item-section style="max-width: 10%;">
            <q-icon :name="item?.icon" style="color: #938F99;" size="20px"/>
          </q-item-section>
          <q-item-section>
            <span class="text-menu-item">{{ item.title }}</span>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container style="width: 100%;" class="flex justify-center align-center">
      <slot ></slot>
    </q-page-container>

  </q-layout>

</template>
<script setup>
import { ref, computed } from 'vue'
import navItemsList from 'src/configs/navItemsList'
import { useAuthStore } from 'src/stores/auth.store'

const authStore = useAuthStore()

// state
const leftDrawerOpen = ref(false)

// computed
// @TODO
const navList = computed(() => navItemsList?.map(item => item?.type === 'person'
  ? {
      ...item,
      title: 'maindset@gmail.com'
    }
  : item))

// methods
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const clickNavItem = type => {
  switch (type) {
    case 'logout':
      authStore.logout()
      break
    default:
      break
  }
}
</script>
<style scoped>
.layout--default {
  display: flex;
  min-width: var(--app-min-width);
  height: 100vh;
  /* min-height: var(--app-min-height); */
}
</style>
