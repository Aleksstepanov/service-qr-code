<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Confirm" color="primary" @click="confirm" />
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">You are currently not connected to any network.</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup
                 flat
                 label="Cancel"
                 color="primary" />
          <q-btn v-close-popup
                 flat
                 label="Logout"
                 color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>

// import { useQuasar } from 'quasar'
// props

// const $q = useQuasar()

// function confirm () {
//   $q.dialog({
//     title: 'Confirm',
//     message: 'Would you like to turn on the wifi?',
//     cancel: true,
//     persistent: true
//   }).onOk(() => {
//     // console.log('>>>> OK')
//   }).onOk(() => {
//     // console.log('>>>> second OK catcher')
//   }).onCancel(() => {
//     // console.log('>>>> Cancel')
//   }).onDismiss(() => {
//     // console.log('I am triggered on both OK and Cancel')
//   })
// }

</script>
