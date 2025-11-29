<template>
  <q-card
    :class="[
      'glass-card',
      elevated && 'glass-card--elevated',
      bordered && 'glass-card--bordered',
      hover && 'glass-card--hover'
    ]"
    :flat="flat"
  >
    <slot></slot>
  </q-card>
</template>

<script setup>
defineProps({
  elevated: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: true
  },
  hover: {
    type: Boolean,
    default: true
  },
  flat: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.125);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card--elevated {
  box-shadow: 0 12px 48px 0 rgba(31, 38, 135, 0.25);
}

.glass-card--bordered {
  border: 1px solid rgba(0, 217, 255, 0.3);
}

.glass-card--hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 56px 0 rgba(0, 217, 255, 0.3);
  border-color: rgba(0, 217, 255, 0.5);
}

/* Modo oscuro */
body.body--dark .glass-card {
  background: rgba(10, 10, 26, 0.7) !important;
  border: 1px solid rgba(126, 34, 206, 0.3);
}

body.body--dark .glass-card--bordered {
  border: 1px solid rgba(126, 34, 206, 0.4);
}

body.body--dark .glass-card--hover:hover {
  box-shadow: 0 16px 56px 0 rgba(126, 34, 206, 0.4);
  border-color: rgba(126, 34, 206, 0.6);
}
</style>
