<template>
  <component
    :is="component"
    class="btn"
    :to="to"
    v-bind="$attrs"
    :type="!to ? type : null"
    :class="[
      `btn--color-${color}`,
      `btn--size-${size}`,
      {
        'btn--loading': loading,
        'btn--disabled': disabled,
        'btn--round': round,
        'btn--icon-only': iconOnly,
        'btn--full-width': fullWidth,
        'btn--has-prefix': prefixIcon,
        'btn--has-suffix': suffixIcon
      }
    ]"
    :disabled="disabled ? true : null"

  >
    <UiIcon
      v-if="prefixIcon && !loading"
      class="btn__prefix-icon"
      :icon="prefixIcon" />
    <q-inner-loading
      :showing="loading"
      size="1em"
      class="btn__loading-icon" />
    <span class="btn__text" :class="labelClass ? `${labelClass}` : null ">
      <template v-if="$slots.default || label">
        <slot> {{ label }} </slot>
      </template>
      <UiIcon
        v-if="iconOnly && !loading"
        class="btn__single-icon"
        :icon="iconOnly" />
    </span>
    <span
      v-if="badge"
      class="btn__badge">{{ badge }}</span>
    <UiIcon
      v-if="suffixIcon"
      class="btn__suffix-icon"
      :icon="suffixIcon" />
  </component>
</template>
<script>
import UiIcon from './ui-icon/UiIcon.vue'

export default {
  name: 'UiBtn',
  components: {
    UiIcon
  },
  props: {
    label: {
      type: String,
      default: null
    },
    to: {
      type: [String, Object],
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'button'
    },
    prefixIcon: {
      type: String,
      required: false
    },
    suffixIcon: {
      type: String,
      required: false
    },
    badge: {
      type: String,
      default: null
    },
    fullWidth: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'blue-default'
    },
    size: {
      type: String,
      default: 'm'
    },
    iconOnly: {
      type: String,
      default: null
    },
    round: {
      type: Boolean,
      default: false
    },
    labelClass: {
      type: String,
      default: null
    }
  },
  computed: {
    /* eslint-disable */
    component() {
      return !this.to ? 'button' : 'router-link'
    }
  }
}
</script>
