<template>
  <div></div>
</template>
<script setup>
import { onMounted } from 'vue'
import { axios } from 'src/utils'

onMounted(async () => {
  const res = await axios.post('/api/admin/users/', {
    limit: 0,
    skip: 0,
    orderBy: [
      {
        field: 'string',
        order: 'ASC'
      }
    ]
  }, {
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*'
    }
  })
  console.log(res)
})
</script>
