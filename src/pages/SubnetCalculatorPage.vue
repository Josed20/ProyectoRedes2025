<template>
  <q-page class="subnet-calculator-page">
    <div class="page-container">
      <!-- Page Header -->
      <div class="page-header q-mb-lg">
        <div class="row items-center">
          <div class="col">
            <h1 class="text-h4 text-weight-bold text-green q-mb-xs">
              <q-icon name="calculate" size="md" class="q-mr-sm" />
              Calculador de Subredes
            </h1>
            <p class="text-body2 text-grey-7">
              Calcula información completa de subredes IPv4 con notación CIDR
            </p>
          </div>
          <div class="col-auto">
            <q-btn
              outline
              color="green"
              icon="arrow_back"
              label="Volver"
              to="/"
            />
          </div>
        </div>
      </div>

      <!-- Input Form -->
      <div class="q-mb-lg">
        <subnet-input-form
          :ip-value="ipInput"
          :cidr-value="cidrInput"
          :cidr-options="cidrOptions"
          :ip-rules="[validateIpInput]"
          :error="errorMessage"
          @update:ip="ipInput = $event"
          @update:cidr="cidrInput = $event"
          @calculate="calculateSubnetInfo"
          @clear="clearAll"
        />
      </div>

      <!-- Error Alert -->
      <transition name="fade">
        <q-banner v-if="errorMessage && !subnetResult" class="bg-negative text-white q-mb-md" rounded>
          <template v-slot:avatar>
            <q-icon name="error" />
          </template>
          {{ errorMessage }}
        </q-banner>
      </transition>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center q-my-lg">
        <q-spinner color="green" size="50px" />
      </div>

      <!-- Result Card -->
      <transition name="slide-up">
        <subnet-result-card v-if="subnetResult && !isLoading" :result="subnetResult" class="q-mb-lg" />
      </transition>

      <!-- Additional Tools (when result exists) -->
      <transition name="fade">
        <div v-if="subnetResult && !isLoading" class="q-mt-lg">
          <q-card flat bordered class="additional-tools-card">
            <q-card-section>
              <div class="text-h6 q-mb-md">
                <q-icon name="build" color="orange" class="q-mr-xs" />
                Herramientas Adicionales
              </div>

              <q-expansion-item
                icon="share"
                label="Dividir en Subredes Más Pequeñas"
                class="q-mb-md"
                header-class="bg-blue-1"
              >
                <q-card>
                  <q-card-section>
                    <div class="text-body2 q-mb-md">
                      Divide la red actual ({{ subnetResult.notation }}) en subredes más pequeñas.
                    </div>
                    <div class="row q-col-gutter-md items-end">
                      <div class="col-12 col-md-6">
                        <q-select
                          v-model="subdivisionCidr"
                          :options="availableSubdivisionCidrs"
                          filled
                          label="Nuevo CIDR"
                          emit-value
                          map-options
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <q-btn
                          color="blue"
                          label="Dividir Red"
                          icon="call_split"
                          @click="subdivideCurrentNetwork(subdivisionCidr)"
                          :disable="!subdivisionCidr"
                          unelevated
                        />
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>

              <q-expansion-item
                icon="search"
                label="Verificar si una IP pertenece a esta subred"
                header-class="bg-green-1"
              >
                <q-card>
                  <q-card-section>
                    <div class="row q-col-gutter-md items-end">
                      <div class="col-12 col-md-6">
                        <q-input
                          v-model="testIp"
                          filled
                          label="IP a verificar"
                          placeholder="Ej: 192.168.1.50"
                        />
                      </div>
                      <div class="col-12 col-md-6">
                        <q-btn
                          color="green"
                          label="Verificar"
                          icon="check_circle"
                          @click="checkIp"
                          :disable="!testIp"
                          unelevated
                        />
                      </div>
                    </div>
                    <div v-if="ipCheckResult !== null" class="q-mt-md">
                      <q-banner
                        :class="ipCheckResult ? 'bg-positive' : 'bg-negative'"
                        class="text-white"
                        rounded
                      >
                        <template v-slot:avatar>
                          <q-icon :name="ipCheckResult ? 'check_circle' : 'cancel'" />
                        </template>
                        {{ ipCheckResult ? 'La IP pertenece a esta subred' : 'La IP NO pertenece a esta subred' }}
                      </q-banner>
                    </div>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </div>
      </transition>

      <!-- Subdivision Results -->
      <transition name="fade">
        <div v-if="subdivisionResult" class="q-mt-lg">
          <q-card flat bordered>
            <q-card-section class="bg-blue text-white">
              <div class="text-h6">
                <q-icon name="account_tree" size="sm" class="q-mr-sm" />
                Subredes Resultantes
              </div>
              <div class="text-subtitle2">
                {{ subdivisionResult.originalNetwork }} dividida en {{ subdivisionResult.numberOfSubnets }} subredes /{{ subdivisionResult.newCidr }}
              </div>
            </q-card-section>

            <q-card-section>
              <div class="subnet-grid">
                <q-card
                  v-for="subnet in subdivisionResult.subnets"
                  :key="subnet.index"
                  flat
                  bordered
                  class="subnet-item"
                >
                  <q-card-section class="bg-blue-1">
                    <div class="text-weight-bold">Subred #{{ subnet.index }}</div>
                    <div class="text-caption">{{ subnet.notation }}</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section dense>
                    <div class="text-caption">
                      <div><strong>Red:</strong> {{ subnet.networkAddress }}</div>
                      <div><strong>Broadcast:</strong> {{ subnet.broadcastAddress }}</div>
                      <div><strong>Rango:</strong> {{ subnet.ipRange }}</div>
                      <div><strong>Hosts:</strong> {{ subnet.usableHosts.toLocaleString() }}</div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </transition>

      <!-- Info Card (when no result) -->
      <q-card v-if="!subnetResult" flat bordered class="q-mt-lg info-card">
        <q-card-section class="bg-green-1">
          <div class="text-h6 q-mb-md">
            <q-icon name="help_outline" color="green" class="q-mr-xs" />
            Guía de Uso
          </div>

          <div class="q-gutter-md">
            <div>
              <div class="text-weight-bold q-mb-xs">¿Qué es una Subred?</div>
              <div class="text-body2 text-grey-8">
                Una subred es una subdivisión lógica de una red IP. El proceso de crear subredes
                permite dividir una red grande en redes más pequeñas y manejables, mejorando el
                rendimiento y la seguridad.
              </div>
            </div>

            <div>
              <div class="text-weight-bold q-mb-xs">Notación CIDR:</div>
              <div class="text-body2 text-grey-8">
                CIDR (Classless Inter-Domain Routing) utiliza una barra seguida de un número (ej: /24)
                para indicar cuántos bits están dedicados a la parte de red de la dirección IP.
                <br><br>
                Ejemplos comunes:
              </div>
              <ul class="q-pl-md text-body2 text-grey-8">
                <li><strong>/24</strong> - Máscara 255.255.255.0 - 254 hosts</li>
                <li><strong>/16</strong> - Máscara 255.255.0.0 - 65,534 hosts</li>
                <li><strong>/8</strong> - Máscara 255.0.0.0 - 16,777,214 hosts</li>
              </ul>
            </div>

            <div>
              <div class="text-weight-bold q-mb-xs">Ejemplo de Cálculo:</div>
              <div class="text-body2 text-grey-8">
                Ingresa <strong>192.168.1.0</strong> con CIDR <strong>/24</strong> para obtener:
              </div>
              <ul class="q-pl-md text-body2 text-grey-8">
                <li>Dirección de Red: 192.168.1.0</li>
                <li>Dirección de Broadcast: 192.168.1.255</li>
                <li>Rango Utilizable: 192.168.1.1 - 192.168.1.254</li>
                <li>Hosts Utilizables: 254</li>
              </ul>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from 'vue'
import { useSubnetCalculator } from '../composables/useSubnetCalculator'
import SubnetInputForm from '../components/SubnetCalc/SubnetInputForm.vue'
import SubnetResultCard from '../components/SubnetCalc/SubnetResultCard.vue'

export default {
  name: 'SubnetCalculatorPage',
  components: {
    SubnetInputForm,
    SubnetResultCard
  },
  setup () {
    const {
      ipInput,
      cidrInput,
      subnetResult,
      subdivisionResult,
      errorMessage,
      isLoading,
      cidrOptions,
      clearAll,
      validateIpInput,
      calculateSubnetInfo,
      subdivideCurrentNetwork,
      checkIpInSubnet
    } = useSubnetCalculator()

    const subdivisionCidr = ref(null)
    const testIp = ref('')
    const ipCheckResult = ref(null)

    const availableSubdivisionCidrs = computed(() => {
      if (!subnetResult.value) return []
      const currentCidr = subnetResult.value.cidr
      return cidrOptions.value
        .filter(opt => opt.value > currentCidr && opt.value <= 30)
        .map(opt => ({
          ...opt,
          label: `${opt.label} - ${opt.mask} (${opt.hosts} hosts por subred)`
        }))
    })

    const checkIp = () => {
      const result = checkIpInSubnet(testIp.value)
      ipCheckResult.value = result
    }

    return {
      ipInput,
      cidrInput,
      subnetResult,
      subdivisionResult,
      errorMessage,
      isLoading,
      cidrOptions,
      clearAll,
      validateIpInput,
      calculateSubnetInfo,
      subdivideCurrentNetwork,
      subdivisionCidr,
      availableSubdivisionCidrs,
      testIp,
      ipCheckResult,
      checkIp
    }
  }
}
</script>

<style scoped>
.subnet-calculator-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  padding: 20px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 12px;
}

.info-card,
.additional-tools-card {
  border-radius: 12px;
}

.subnet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.subnet-item {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.subnet-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.4s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>
