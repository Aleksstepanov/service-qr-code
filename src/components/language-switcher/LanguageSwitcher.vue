<template>
  <q-select
    v-model="locale"
    :options="localeOptions"
    :label="$t('lang')"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 30px"
    input-style=" white"
  />
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  setup () {
    const { locale } = useI18n({ useScope: 'global' })

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'ru-RU', label: 'Русский' }
      ]
    }
  }
}
</script>
