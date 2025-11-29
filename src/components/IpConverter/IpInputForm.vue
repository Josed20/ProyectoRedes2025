<template>
  <q-card class="ip-input-form" flat bordered>
    <q-card-section>
      <div class="text-h6 q-mb-md">
        <q-icon name="network_check" size="sm" class="q-mr-sm" />
        Ingrese una Dirección IP
      </div>

      <q-input
        :model-value="modelValue"
        filled
        label="Dirección IP"
        placeholder="Ejemplo: 192.168.1.1 o ::ffff:c0a8:0101"
        :rules="rules"
        :error="!!error"
        :error-message="error"
        @update:model-value="$emit('update:modelValue', $event)"
        class="q-mb-md"
      >
        <template v-slot:prepend>
          <q-icon name="language" />
        </template>
        <template v-slot:append>
          <q-icon
            v-if="modelValue"
            name="close"
            @click="$emit('update:modelValue', '')"
            class="cursor-pointer"
          />
        </template>
      </q-input>

      <div class="row q-gutter-sm">
        <q-btn
          color="primary"
          label="Convertir IPv4"
          icon="swap_horiz"
          @click="$emit('convert-ipv4')"
          :disable="!modelValue"
          unelevated
        />
        <q-btn
          color="secondary"
          label="Extraer IPv4 desde IPv6"
          icon="arrow_back"
          @click="$emit('convert-ipv6')"
          :disable="!modelValue"
          outline
        />
        <q-btn
          color="grey-7"
          label="Limpiar"
          icon="clear"
          @click="$emit('clear')"
          flat
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'IpInputForm',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    rules: {
      type: Array,
      default: () => []
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue', 'convert-ipv4', 'convert-ipv6', 'clear']
}
</script>

<style scoped>
.ip-input-form {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
}
</style>
