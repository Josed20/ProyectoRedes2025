<template>
  <q-card v-if="result" class="subnet-result-card" flat bordered>
    <q-card-section class="bg-green text-white">
      <div class="text-h6">
        <q-icon name="check_circle" size="sm" class="q-mr-sm" />
        Información de la Subred
      </div>
      <div class="text-subtitle2">{{ result.notation }}</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="row q-col-gutter-md">
        <!-- Columna Izquierda: Información Principal -->
        <div class="col-12 col-md-6">
          <q-list bordered separator>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="input" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>IP Ingresada</q-item-label>
                <q-item-label class="text-weight-bold">{{ result.inputIp }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="green" name="network_check" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Dirección de Red</q-item-label>
                <q-item-label class="text-weight-bold">{{ result.networkAddress }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  dense
                  icon="content_copy"
                  @click="copyToClipboard(result.networkAddress)"
                  size="sm"
                />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="orange" name="router" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Dirección de Broadcast</q-item-label>
                <q-item-label class="text-weight-bold">{{ result.broadcastAddress }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  dense
                  icon="content_copy"
                  @click="copyToClipboard(result.broadcastAddress)"
                  size="sm"
                />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="blue" name="swap_horiz" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Rango de Hosts Utilizables</q-item-label>
                <q-item-label class="text-weight-bold">{{ result.ipRange }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="devices" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Hosts Utilizables</q-item-label>
                <q-item-label class="text-weight-bold text-h6">
                  {{ result.usableHosts.toLocaleString() }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="indigo" name="storage" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Total de Direcciones</q-item-label>
                <q-item-label class="text-weight-bold">
                  {{ result.totalHosts.toLocaleString() }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Columna Derecha: Máscaras y Detalles -->
        <div class="col-12 col-md-6">
          <q-list bordered separator>
            <q-item>
              <q-item-section avatar>
                <q-icon color="teal" name="filter_alt" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Máscara de Subred (Decimal)</q-item-label>
                <q-item-label class="text-weight-bold">{{ result.subnetMask }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  dense
                  icon="content_copy"
                  @click="copyToClipboard(result.subnetMask)"
                  size="sm"
                />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="teal" name="code" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Máscara de Subred (Binario)</q-item-label>
                <q-item-label class="text-weight-bold code-text">
                  {{ result.subnetMaskBinary }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="red" name="block" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Wildcard Mask (Decimal)</q-item-label>
                <q-item-label class="text-weight-bold">{{ result.wildcardMask }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-btn
                  flat
                  dense
                  icon="content_copy"
                  @click="copyToClipboard(result.wildcardMask)"
                  size="sm"
                />
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="red" name="code" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Wildcard Mask (Binario)</q-item-label>
                <q-item-label class="text-weight-bold code-text">
                  {{ result.wildcardMaskBinary }}
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="amber" name="category" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Clase de Red</q-item-label>
                <q-item-label>
                  <q-chip :color="getClassColor(result.networkClass)" text-color="white">
                    {{ result.networkClass }}
                  </q-chip>
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="deep-purple" name="lock" />
              </q-item-section>
              <q-item-section>
                <q-item-label overline>Tipo de Red</q-item-label>
                <q-item-label>
                  <q-chip
                    :color="result.isPrivate ? 'orange' : 'blue'"
                    text-color="white"
                  >
                    {{ result.isPrivate ? 'Red Privada' : 'Red Pública' }}
                  </q-chip>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>

    <!-- Nota informativa -->
    <q-separator />
    <q-card-section class="info-note-section">
      <div class="text-caption text-white">
        <q-icon name="info" color="cyan" size="sm" class="q-mr-xs" />
        <strong>Nota:</strong> La dirección de red y broadcast no son utilizables para hosts.
        El rango utilizable va desde {{ result.firstUsable }} hasta {{ result.lastUsable }}.
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  name: 'SubnetResultCard',
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

    const getClassColor = (networkClass) => {
      if (networkClass.startsWith('A')) return 'green'
      if (networkClass.startsWith('B')) return 'blue'
      if (networkClass.startsWith('C')) return 'orange'
      if (networkClass.startsWith('D')) return 'purple'
      if (networkClass.startsWith('E')) return 'red'
      return 'grey'
    }

    return {
      copyToClipboard,
      getClassColor
    }
  }
}
</script>

<style scoped>
.subnet-result-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.code-text {
  font-family: 'Courier New', monospace;
  font-size: 11px;
}

.info-note-section {
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
}

body.body--dark .info-note-section {
  background: linear-gradient(135deg, #0a1929 0%, #1e3a5f 100%);
}
</style>
