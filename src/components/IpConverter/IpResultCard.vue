<template>
  <q-card v-if="result" class="result-card" flat bordered>
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">
        <q-icon name="check_circle" size="sm" class="q-mr-sm" />
        Resultado de Conversión
      </div>
    </q-card-section>

    <q-separator />

    <!-- Resultado IPv4 a otros formatos -->
    <q-card-section v-if="result.type === 'ipv4'">
      <div class="q-gutter-md">
        <!-- IP Original -->
        <div class="result-item">
          <div class="result-label">IP Original (Decimal)</div>
          <q-chip color="primary" text-color="white" icon="location_on" size="lg">
            {{ result.original }}
          </q-chip>
        </div>

        <!-- Información de la IP -->
        <div v-if="result.info" class="result-item">
          <div class="result-label">Información</div>
          <div class="row q-gutter-sm">
            <q-chip
              :color="result.info.isPrivate ? 'orange' : 'blue'"
              text-color="white"
              size="md"
            >
              {{ result.info.isPrivate ? 'IP Privada' : 'IP Pública' }}
            </q-chip>
            <q-chip v-if="result.info.class" color="indigo" text-color="white" size="md">
              Clase {{ result.info.class }}
            </q-chip>
            <q-chip v-if="result.info.isLoopback" color="red" text-color="white" size="md">
              Loopback
            </q-chip>
          </div>
        </div>

        <!-- Formato Binario -->
        <div class="result-item">
          <div class="result-label">Formato Binario</div>
          <q-input
            :model-value="result.binary"
            filled
            readonly
            dense
            class="code-input"
          >
            <template v-slot:append>
              <q-btn
                flat
                dense
                icon="content_copy"
                @click="copyToClipboard(result.binary)"
                size="sm"
              >
                <q-tooltip>Copiar</q-tooltip>
              </q-btn>
            </template>
          </q-input>
        </div>

        <!-- Formato Hexadecimal -->
        <div class="result-item">
          <div class="result-label">Formato Hexadecimal</div>
          <q-input
            :model-value="result.hex"
            filled
            readonly
            dense
            class="code-input"
          >
            <template v-slot:append>
              <q-btn
                flat
                dense
                icon="content_copy"
                @click="copyToClipboard(result.hex)"
                size="sm"
              >
                <q-tooltip>Copiar</q-tooltip>
              </q-btn>
            </template>
          </q-input>
        </div>

        <!-- IPv6 Mapeada -->
        <div class="result-item">
          <div class="result-label">IPv6 Mapeada (Comprimida)</div>
          <q-input
            :model-value="result.ipv6Mapped.compressed"
            filled
            readonly
            dense
            class="code-input"
          >
            <template v-slot:append>
              <q-btn
                flat
                dense
                icon="content_copy"
                @click="copyToClipboard(result.ipv6Mapped.compressed)"
                size="sm"
              >
                <q-tooltip>Copiar</q-tooltip>
              </q-btn>
            </template>
          </q-input>
        </div>

        <div class="result-item">
          <div class="result-label">IPv6 Mapeada (Expandida)</div>
          <q-input
            :model-value="result.ipv6Mapped.expanded"
            filled
            readonly
            dense
            class="code-input"
          >
            <template v-slot:append>
              <q-btn
                flat
                dense
                icon="content_copy"
                @click="copyToClipboard(result.ipv6Mapped.expanded)"
                size="sm"
              >
                <q-tooltip>Copiar</q-tooltip>
              </q-btn>
            </template>
          </q-input>
        </div>

        <div class="result-item">
          <div class="result-label">IPv6 Mapeada (Mixta)</div>
          <q-input
            :model-value="result.ipv6Mapped.mixed"
            filled
            readonly
            dense
            class="code-input"
          >
            <template v-slot:append>
              <q-btn
                flat
                dense
                icon="content_copy"
                @click="copyToClipboard(result.ipv6Mapped.mixed)"
                size="sm"
              >
                <q-tooltip>Copiar</q-tooltip>
              </q-btn>
            </template>
          </q-input>
        </div>
      </div>
    </q-card-section>

    <!-- Resultado IPv6 a IPv4 -->
    <q-card-section v-if="result.type === 'ipv6-to-ipv4'">
      <div class="q-gutter-md">
        <div class="result-item">
          <div class="result-label">IPv6 Original</div>
          <q-chip color="secondary" text-color="white" icon="link" size="lg">
            {{ result.original }}
          </q-chip>
        </div>

        <div class="result-item">
          <div class="result-label">IPv4 Extraída</div>
          <q-input
            :model-value="result.ipv4Extracted"
            filled
            readonly
            dense
            class="code-input"
          >
            <template v-slot:append>
              <q-btn
                flat
                dense
                icon="content_copy"
                @click="copyToClipboard(result.ipv4Extracted)"
                size="sm"
              >
                <q-tooltip>Copiar</q-tooltip>
              </q-btn>
            </template>
          </q-input>
        </div>

        <div v-if="result.info" class="result-item">
          <div class="result-label">Información</div>
          <div class="row q-gutter-sm">
            <q-chip
              :color="result.info.isPrivate ? 'orange' : 'blue'"
              text-color="white"
              size="md"
            >
              {{ result.info.isPrivate ? 'IP Privada' : 'IP Pública' }}
            </q-chip>
            <q-chip v-if="result.info.class" color="indigo" text-color="white" size="md">
              Clase {{ result.info.class }}
            </q-chip>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  name: 'IpResultCard',
  props: {
    result: {
      type: Object,
      default: null
    }
  },
  setup () {
    const $q = useQuasar()

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        $q.notify({
          type: 'positive',
          message: 'Copiado al portapapeles',
          position: 'top',
          timeout: 1000
        })
      })
    }

    return {
      copyToClipboard
    }
  }
}
</script>

<style scoped>
.result-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.result-item {
  margin-bottom: 16px;
}

.result-label {
  font-weight: 600;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-input :deep(.q-field__control) {
  font-family: 'Courier New', monospace;
  background-color: #f5f5f5;
}
</style>
