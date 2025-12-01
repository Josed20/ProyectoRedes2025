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
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  border: 1px solid rgba(226, 232, 240, 0.5);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card--elevated {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.glass-card--bordered {
  border: 1px solid rgba(6, 182, 212, 0.3);
}

.glass-card--hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: rgba(6, 182, 212, 0.5);
}

/* Modo oscuro - unified theme */
body.body--dark .glass-card {
  background: rgba(30, 41, 59, 0.95) !important;
  border: 1px solid rgba(51, 65, 85, 0.8);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

body.body--dark .glass-card--bordered {
  border: 1px solid rgba(6, 182, 212, 0.4);
}

body.body--dark .glass-card--hover:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3);
  border-color: rgba(6, 182, 212, 0.6);
}
</style>
