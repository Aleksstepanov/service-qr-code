<template>
  <component v-bind="$attrs"
             :is="component"
             :v-close-popup="vClosePopup"
             :disabled="disabled"
             :label="label"

             :type="!to ? type : null"
             :to="to"
             :color="color"
             :size="size"
             :suffixIcon="suffixIcon"
             @click="type === 'submit' ? $emit('submit') : $emit('click')"
  >
    <UiIcon
      v-if="prefixIcon && !loading"
      class="btn__prefix-icon"
      :icon="prefixIcon" />
    <span v-if="label">
      {{ label }}</span>
    <slot></slot>
    <span  v-if="suffixIcon"
           role="img"
           class=" q-icon suffix-icon"
           :icon="suffixIcon"></span>
  </component>
</template>

<script >
import { defineEmits } from 'vue'
export default {
  name: 'MyBtn',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    vClosePopup: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    },
    to: {
      type: [String, Object],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      requred: false,
      default: ''
    },
    prefixIcon: {
      type: String,
      required: false
    },
    suffixIcon: {
      type: String,
      required: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'sm'
    },
    round: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /* eslint-disable */
    component() {
      return !this.to ? 'button' : 'router-link'
    }
  }
}
const $emit = defineEmits(['click'])

</script>
<style scoped>
.suffix-icon{
  width: 22px;
  height: 22px;
  position: relative;
  z-index: 9;
}
</style>
