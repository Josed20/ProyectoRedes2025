<template>
  <q-card class="subnet-input-form" flat bordered>
    <q-card-section>
      <div class="text-h6 q-mb-md">
        <q-icon name="lan" size="sm" class="q-mr-sm" />
        Configuración de Subred
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-8">
          <q-input
            :model-value="ipValue"
            filled
            label="Dirección IP"
            placeholder="Ejemplo: 192.168.1.0"
            :rules="ipRules"
            :error="!!error"
            :error-message="error"
            @update:model-value="$emit('update:ip', $event)"
          >
            <template v-slot:prepend>
              <q-icon name="router" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-4">
          <q-select
            :model-value="cidrValue"
            filled
            :options="cidrOptions"
            label="CIDR"
            emit-value
            map-options
            @update:model-value="$emit('update:cidr', $event)"
          >
            <template v-slot:prepend>
              <q-icon name="network_node" />
            </template>
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                  <q-item-label caption>
                    Máscara: {{ scope.opt.mask }} | Hosts: {{ scope.opt.hosts }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>

      <div class="q-mt-md row q-gutter-sm">
        <q-btn
          color="primary"
          label="Calcular Subred"
          icon="calculate"
          @click="$emit('calculate')"
          :disable="!ipValue"
          unelevated
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
  name: 'SubnetInputForm',
  props: {
    ipValue: {
      type: String,
      default: ''
    },
    cidrValue: {
      type: Number,
      default: 24
    },
    cidrOptions: {
      type: Array,
      required: true
    },
    ipRules: {
      type: Array,
      default: () => []
    },
    error: {
      type: String,
      default: ''
    }
  },
  emits: ['update:ip', 'update:cidr', 'calculate', 'clear']
}
</script>

<style scoped>
.subnet-input-form {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
}
</style>
