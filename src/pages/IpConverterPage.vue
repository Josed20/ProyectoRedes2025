<template>
  <q-page class="ip-converter-page">
    <div class="page-container">
      <!-- Page Header -->
      <div class="page-header q-mb-xl">
        <div class="row items-center q-col-gutter-md">
          <div class="col-12 col-md">
            <h1 class="page-title cyber-text">
              <q-icon name="swap_horiz" size="48px" class="title-icon q-mr-sm" />
              CONVERSOR DE IP
            </h1>
            <p class="page-subtitle text-h6 q-mt-sm">
              Transforma IPv4 a múltiples formatos: Binario, Hexadecimal e IPv6
            </p>
          </div>
          <div class="col-12 col-md-auto">
            <q-btn
              rounded
              unelevated
              color="cyan"
              icon="arrow_back"
              label="Volver"
              @click="$router.push('/')"
              class="back-btn"
            />
          </div>
        </div>
      </div>

      <div class="row q-col-gutter-lg">
        <!-- Input Section -->
        <div class="col-12 col-md-6">
          <glass-card elevated>
            <q-card-section>
              <div class="text-h6 text-weight-bold q-mb-md section-title">
                <q-icon name="input" size="sm" color="cyan" class="q-mr-xs" />
                Entrada
              </div>

              <q-input
                v-model="ipInput"
                outlined
                label="Dirección IP"
                placeholder="Ej: 192.168.1.1"
                :error="!!errorMessage"
                :error-message="errorMessage"
                class="q-mb-md glass-input"
                @update:model-value="validateIpInput"
              >
                <template v-slot:prepend>
                  <q-icon name="router" />
                </template>
                <template v-slot:append>
                  <q-icon
                    v-if="ipInput"
                    name="close"
                    @click="clearAll"
                    class="cursor-pointer"
                  />
                </template>
              </q-input>

              <div class="text-caption text-grey-6 q-mb-lg">
                <strong>Ejemplos:</strong><br>
                IPv4: 192.168.0.1, 10.0.0.1<br>
                IPv6 Mapeada: ::ffff:192.168.0.1
              </div>

              <div class="q-gutter-sm">
                <q-btn
                  unelevated
                  rounded
                  color="cyan"
                  :label="primaryButtonLabel"
                  icon="swap_horiz"
                  class="full-width"
                  @click="handlePrimaryConversion"
                  :disable="primaryButtonDisabled"
                />
                <q-btn
                  outline
                  rounded
                  color="deep-purple"
                  label="Extraer IPv4 desde IPv6"
                  icon="download"
                  class="full-width"
                  @click="extractIPv4FromIPv6"
                  :disable="secondaryButtonDisabled"
                />
                <q-btn
                  flat
                  rounded
                  color="grey-7"
                  label="Limpiar"
                  icon="clear"
                  class="full-width"
                  @click="clearAll"
                />
              </div>
            </q-card-section>
          </glass-card>

          <!-- Info Card -->
          <glass-card class="q-mt-lg">
            <q-card-section>
              <div class="text-subtitle1 text-weight-bold q-mb-sm">
                <q-icon name="help_outline" color="cyan" size="sm" class="q-mr-xs" />
                Información
              </div>
              <div class="text-body2 text-grey-7">
                <p class="q-mb-sm">
                  <strong>IPv4:</strong> Utiliza 32 bits (4 octetos) representados en formato decimal
                  separados por puntos.
                </p>
                <p class="q-mb-sm">
                  <strong>IPv6:</strong> Utiliza 128 bits, ofreciendo un espacio de direccionamiento
                  significativamente mayor.
                </p>
                <p>
                  <strong>Mapeo IPv4-IPv6:</strong> Las direcciones IPv4 pueden representarse en IPv6
                  usando el prefijo ::ffff: para mantener compatibilidad.
                </p>
              </div>
            </q-card-section>
          </glass-card>
        </div>

        <!-- Results Section -->
        <div class="col-12 col-md-6">
          <transition name="slide-fade" mode="out-in">
            <glass-card v-if="conversionResult" elevated class="result-card">
              <q-card-section>
                <div class="text-h6 text-weight-bold q-mb-md section-title">
                  <q-icon name="check_circle" size="sm" color="cyan" class="q-mr-xs" />
                  Resultados
                </div>

                <!-- Tipo de IP Detectado -->
                <div class="result-item q-mb-md">
                  <div class="result-label">Tipo Detectado</div>
                  <div class="result-value">
                    <q-chip
                      :color="conversionResult.type === 'ipv4' ? 'cyan' : 'deep-purple'"
                      text-color="white"
                      :icon="conversionResult.type === 'ipv4' ? 'label' : 'label'"
                    >
                      {{ conversionResult.type === 'ipv4' ? 'IPv4' : conversionResult.type === 'ipv6' ? 'IPv6' : 'IPv6 → IPv4' }}
                    </q-chip>
                  </div>
                </div>

                <!-- IP Original -->
                <div class="result-item q-mb-md">
                  <div class="result-label">IP Original</div>
                  <div class="result-value code-text">
                    {{ conversionResult.original }}
                    <q-btn
                      flat
                      dense
                      round
                      size="sm"
                      icon="content_copy"
                      color="cyan"
                      @click="copyToClipboard(conversionResult.original)"
                    >
                      <q-tooltip>Copiar</q-tooltip>
                    </q-btn>
                  </div>
                </div>

                <!-- IPv6 Expandido (solo para IPv6) -->
                <div v-if="conversionResult.expanded" class="result-item q-mb-md">
                  <div class="result-label">IPv6 Expandido</div>
                  <div class="result-value code-text">
                    {{ conversionResult.expanded }}
                    <q-btn
                      flat
                      dense
                      round
                      size="sm"
                      icon="content_copy"
                      color="cyan"
                      @click="copyToClipboard(conversionResult.expanded)"
                    >
                      <q-tooltip>Copiar</q-tooltip>
                    </q-btn>
                  </div>
                </div>

                <!-- Formato Binario -->
                <div v-if="conversionResult.binary" class="result-item q-mb-md">
                  <div class="result-label">Formato Binario</div>
                  <div class="result-value code-text binary-text">
                    {{ conversionResult.binary }}
                    <q-btn
                      flat
                      dense
                      round
                      size="sm"
                      icon="content_copy"
                      color="cyan"
                      @click="copyToClipboard(conversionResult.binary)"
                    >
                      <q-tooltip>Copiar</q-tooltip>
                    </q-btn>
                  </div>
                </div>

                <!-- Formato Hexadecimal -->
                <div v-if="conversionResult.hexadecimal" class="result-item q-mb-md">
                  <div class="result-label">Formato Hexadecimal</div>
                  <div class="result-value code-text">
                    {{ conversionResult.hexadecimal }}
                    <q-btn
                      flat
                      dense
                      round
                      size="sm"
                      icon="content_copy"
                      color="cyan"
                      @click="copyToClipboard(conversionResult.hexadecimal)"
                    >
                      <q-tooltip>Copiar</q-tooltip>
                    </q-btn>
                  </div>
                </div>

                <!-- IPv6 Mapeada (solo para IPv4) -->
                <div v-if="conversionResult.ipv6Mapped" class="result-item q-mb-md">
                  <div class="result-label">IPv6 Mapeada</div>
                  <div class="result-value code-text">
                    {{ conversionResult.ipv6Mapped }}
                    <q-btn
                      flat
                      dense
                      round
                      size="sm"
                      icon="content_copy"
                      color="cyan"
                      @click="copyToClipboard(conversionResult.ipv6Mapped)"
                    >
                      <q-tooltip>Copiar</q-tooltip>
                    </q-btn>
                  </div>
                </div>

                <!-- IPv6 Mapeada Hexadecimal (solo para IPv4) -->
                <div v-if="conversionResult.ipv6MappedHex" class="result-item q-mb-md">
                  <div class="result-label">IPv6 Mapeada (Hex)</div>
                  <div class="result-value code-text">
                    {{ conversionResult.ipv6MappedHex }}
                    <q-btn
                      flat
                      dense
                      round
                      size="sm"
                      icon="content_copy"
                      color="cyan"
                      @click="copyToClipboard(conversionResult.ipv6MappedHex)"
                    >
                      <q-tooltip>Copiar</q-tooltip>
                    </q-btn>
                  </div>
                </div>

                <!-- IPv4 Restaurado (solo para IPv6 mapeado) -->
                <div v-if="conversionResult.ipv4Restored" class="result-item q-mb-md">
                  <div class="result-label">IPv4 Embebido</div>
                  <div class="result-value">
                    <q-chip color="teal" text-color="white" icon="download">
                      {{ conversionResult.ipv4Restored }}
                    </q-chip>
                  </div>
                </div>

                <!-- Información Adicional -->
                <div v-if="conversionResult.info" class="q-mt-lg">
                  <q-separator class="q-mb-md" />
                  <div class="text-subtitle2 text-weight-bold q-mb-sm">
                    <q-icon name="info" color="deep-purple" size="xs" class="q-mr-xs" />
                    Información Adicional
                  </div>
                  <div class="info-chips">
                    <q-chip v-if="conversionResult.info.version" size="sm" color="indigo" text-color="white">
                      IPv{{ conversionResult.info.version }}
                    </q-chip>
                    <q-chip v-if="conversionResult.info.class" size="sm" color="cyan" text-color="white">
                      Clase {{ conversionResult.info.class }}
                    </q-chip>
                    <q-chip v-if="conversionResult.info.type" size="sm" color="deep-purple" text-color="white">
                      {{ conversionResult.info.type }}
                    </q-chip>
                  </div>
                </div>
              </q-card-section>
            </glass-card>

            <!-- Placeholder when no results -->
            <glass-card v-else class="placeholder-card">
              <q-card-section class="text-center q-py-xl">
                <q-icon name="analytics" size="80px" color="grey-5" class="q-mb-md" />
                <div class="text-h6 text-grey-6 q-mb-xs">
                  Sin resultados
                </div>
                <div class="text-body2 text-grey-5">
                  Ingresa una dirección IP y haz clic en convertir
                </div>
              </q-card-section>
            </glass-card>
          </transition>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { useNetworkCalculations } from '../composables/useNetworkCalculations'
import GlassCard from '../components/UI/GlassCard.vue'

const $q = useQuasar()
const {
  ipInput,
  ipConversionResult: conversionResult,
  errorMessage,
  detectedIpType,
  convertIPv4ToAllFormats,
  convertIPv6ToAllFormats,
  extractIPv4FromIPv6,
  validateIpInput,
  clearIpConverter
} = useNetworkCalculations()

// Botones dinámicos según el tipo de IP detectado
const primaryButtonLabel = computed(() => {
  return detectedIpType.value === 'ipv6' ? 'Convertir IPv6' : 'Convertir IPv4'
})

const primaryButtonDisabled = computed(() => {
  return !ipInput.value || !!errorMessage.value
})

const secondaryButtonDisabled = computed(() => {
  return !ipInput.value || !!errorMessage.value || detectedIpType.value !== 'ipv6'
})

const handlePrimaryConversion = () => {
  if (detectedIpType.value === 'ipv6') {
    convertIPv6ToAllFormats()
  } else {
    convertIPv4ToAllFormats()
  }
}

const clearAll = () => {
  clearIpConverter()
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    $q.notify({
      type: 'positive',
      message: 'Copiado al portapapeles',
      position: 'top',
      timeout: 2000
    })
  })
}
</script>

<style scoped>
.ip-converter-page {
  padding: 32px 24px;
  min-height: 100vh;
}

.page-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* ============================================ */
/* PAGE HEADER */
/* ============================================ */
.page-header {
  text-align: center;
}

.page-title {
  font-size: 3rem;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 3px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-icon {
  filter: drop-shadow(0 0 12px #00d9ff);
  animation: iconPulse 3s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { filter: drop-shadow(0 0 12px #00d9ff); }
  50% { filter: drop-shadow(0 0 20px #00d9ff); }
}

.page-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  color: #666;
}

body.body--dark .page-subtitle {
  color: #b0b0b0;
}

.back-btn {
  font-weight: 700;
}

/* ============================================ */
/* SECTION TITLES */
/* ============================================ */
.section-title {
  color: #00d9ff;
}

body.body--dark .section-title {
  color: #b794f6;
}

/* ============================================ */
/* GLASS INPUT */
/* ============================================ */
.glass-input :deep(.q-field__control) {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  border-radius: 12px;
}

body.body--dark .glass-input :deep(.q-field__control) {
  background: rgba(0, 0, 0, 0.2);
}

/* ============================================ */
/* RESULTS */
/* ============================================ */
.result-card {
  min-height: 500px;
}

.result-item {
  padding: 12px;
  background: rgba(0, 217, 255, 0.05);
  border-radius: 8px;
  border-left: 3px solid #00d9ff;
}

body.body--dark .result-item {
  background: rgba(126, 34, 206, 0.1);
  border-left-color: #b794f6;
}

.result-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #00d9ff;
  margin-bottom: 4px;
}

body.body--dark .result-label {
  color: #b794f6;
}

.result-value {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  word-break: break-all;
}

body.body--dark .result-value {
  color: #e0e0e0;
}

.code-text {
  font-family: 'Courier New', monospace;
  background: rgba(0, 0, 0, 0.05);
  padding: 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

body.body--dark .code-text {
  background: rgba(0, 0, 0, 0.3);
}

.binary-text {
  font-size: 11px;
  word-break: break-all;
  line-height: 1.6;
}

.info-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* ============================================ */
/* PLACEHOLDER */
/* ============================================ */
.placeholder-card {
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ============================================ */
/* TRANSITIONS */
/* ============================================ */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* ============================================ */
/* RESPONSIVE */
/* ============================================ */
@media (max-width: 768px) {
  .ip-converter-page {
    padding: 24px 16px;
  }

  .page-title {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .title-icon {
    font-size: 32px !important;
  }

  .page-header {
    text-align: left;
  }
}
</style>
