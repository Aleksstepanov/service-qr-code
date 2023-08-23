<template>
  <PagePreloader v-if="isLoading"/>
  <q-card v-else
          class="my-card"
          flat
          bordered>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="/admin_avatar.jpg" >
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>Admin</q-item-label>
        <q-item-label caption> {{ firstName }}{{ lastName }} </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />

    <q-card-section horizontal>
      <q-card-section> Email:{{ user?.email }} </q-card-section>

      <q-separator vertical />

      <q-card-section class="col-4">
        {{ userDescription }}
      </q-card-section>

      <div class="test-btn__wrapper">

        <h5>sample UiBtn </h5>
        <UiBtn :suffixIcon="mi-menu"
               :to="'/dashboard'"
               class="button primary-white"
               label="test-btn"
               @click="btnTestClick"
        />

        <hr size="2px" width="200px">
        <h5>ui-btn</h5>
        <UiBtnVue
          :to="'/dashboard'"
          class="button my-btn "
          label="UiBtnVue"
          :icon= "matMenu"
          @click="btnTestClick"/>

        <hr size="2px" width="200px">
        <h5>MyBtn</h5>

        <MyBtn

          class="button primary-white"
          label="MyBtn"
          @click="btnTestClick"

        ><ZebraSvg/></MyBtn>

        <hr size="2px" width="200px">
        <h5>q-icon svg</h5>
        <q-icon size="sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g id="_23_check-circle-broken" data-name="23 check-circle-broken"><path d="M15.28,20.58A2,2,0,0,1,13.86,20L10,16.14l1.41-1.42,3.86,3.86,12-12.28,1.42,1.4L16.71,20a2,2,0,0,1-1.42.6Z"/><path d="M16,28A12,12,0,1,1,22.86,6.15L21.71,7.79a10,10,0,1,0,4,5.71l1.94-.5A12,12,0,0,1,16,28Z"/></g></svg>
        </q-icon>

        <h5>Zebra Icon32</h5>
        <ZebraSvg/>
        <hr size="2px" width="200px">
        <h5>q-btn loading</h5>
        <q-btn :loading="loading"
               color="primary"
               style="width: 150px"
               @click="simulateProgress">
          Button
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            Loading...
          </template>
        </q-btn>

        <hr size="2px" width="200px">
        <h5>q-btn label-on-right</h5>
        <q-btn color="primary" icon-right="mail" label="On Right" />

      </div>
    </q-card-section>
  </q-card>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'
import { axios } from 'src/utils'
import { emitter } from 'src/plugins'
import { matMenu } from '@quasar/extras/material-icons'

// import zebraIcon32 from 'src/assets/32.svg'
import PagePreloader from 'src/components/page-pre-loader'

import UiBtnVue from 'src/components/ui-btn/UiBtn.vue'
import UiBtn from 'src/components/test-btn'
import MyBtn from 'src/components/btn'
import ZebraSvg from 'src/components/btn/user-icon/ZebraSvg.vue'
const authStore = useAuthStore()

// state
const isLoading = ref(false)

// computed
const lastName = computed(() => authStore?.getUser?.last_name || '')
const firstName = computed(() => authStore?.getFirstName || '')
const userDescription = computed(() => authStore?.getUser?.text || '')

// methods
const btnTestClick = () => {
  console.log('click')
}

const fetchUser = async () => {
  isLoading.value = true
  try {
    const response = await axios.get('/api/account/me')
    const { user } = response?.data || {}
    authStore.setUser({ user })
    isLoading.value = false
  } catch (error) {
    console.log(error)
    emitter.emit('notify', {
      type: 'negative',
      message: 'Error me query'
    })
  }
}
// life hooks
onMounted(async () => await fetchUser())

// scripts for q-btn loading 119-133

const loading = ref(false)

function simulateProgress () {
  // we set loading state
  loading.value = true

  // simulate a delay
  setTimeout(() => {
    // we're done, we reset loading state
    loading.value = false
  }, 3000)
}
//

</script>

<style scoped>
.test-btn__wrapper{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid red;
  padding: 10px;

}

.my-btn{
  background: #02b4ff;
  color: aliceblue;
  padding: 5px auto;
  font-style: normal;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.4rem;
  cursor: pointer;
}
</style>

<style scoped>
.test-btn__wrapper{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid red;
  padding: 10px;

}

.my-btn{
  background: #02b4ff;
  color: aliceblue;
  padding: 5px auto;
  font-style: normal;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.4rem;
  cursor: pointer;
}
</style>
