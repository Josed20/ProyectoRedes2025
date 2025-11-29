<template>
  <q-page class="q-pa-md">
    <div class="landing-container">
      <!-- Hero Section -->
      <section class="hero-section text-center q-mb-xl">
        <div class="hero-content">
          <q-icon name="hub" size="120px" color="primary" class="q-mb-md" />
          <h1 class="text-h2 text-weight-bold q-mb-md text-primary">
            Herramientas de Redes IP
          </h1>
          <p class="text-h6 text-grey-7 q-mb-lg">
            Suite profesional para conversión y cálculo de direcciones IP
          </p>
          <div class="text-body1 text-grey-8 q-mb-xl" style="max-width: 800px; margin: 0 auto;">
            Convierte direcciones IPv4 a diferentes formatos, calcula subredes con precisión
            y analiza configuraciones de red de manera rápida y eficiente.
          </div>
        </div>
      </section>

      <!-- Features Cards -->
      <section class="features-section">
        <div class="row q-col-gutter-lg">
          <!-- Conversor IP Card -->
          <div class="col-12 col-md-6">
            <q-card class="feature-card full-height" flat bordered>
              <q-card-section class="text-center">
                <q-icon name="swap_horiz" size="64px" color="primary" class="q-mb-md" />
                <div class="text-h5 text-weight-bold q-mb-sm">Conversor de IP</div>
                <div class="text-body2 text-grey-7 q-mb-md">
                  Convierte direcciones IPv4 a múltiples formatos
                </div>
              </q-card-section>

              <q-card-section>
                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="check_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Conversión a Binario</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="check_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Conversión a Hexadecimal</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="check_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Mapeo a IPv6</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="check_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Extracción de IPv4 desde IPv6</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="check_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Validación automática</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>

              <q-card-actions align="center" class="q-pa-md">
                <q-btn
                  color="primary"
                  label="Ir al Conversor"
                  icon="arrow_forward"
                  size="lg"
                  unelevated
                  to="/ip-converter"
                />
              </q-card-actions>
            </q-card>
          </div>

          <!-- Calculador de Subredes Card -->
          <div class="col-12 col-md-6">
            <q-card class="feature-card full-height" flat bordered>
              <q-card-section class="text-center">
                <q-icon name="calculate" size="64px" color="green" class="q-mb-md" />
                <div class="text-h5 text-weight-bold q-mb-sm">Calculador de Subredes</div>
                <div class="text-body2 text-grey-7 q-mb-md">
                  Calcula y analiza configuraciones de subredes IPv4
                </div>
              </q-card-section>

              <q-card-section>
                <q-list dense>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="check_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Dirección de Red y Broadcast</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="check_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Rango de Hosts Utilizables</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="check_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Máscaras en formato Decimal y Binario</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="check_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Wildcard Mask</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section avatar>
                      <q-icon color="green" name="check_circle" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>Cálculo de Hosts Disponibles</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>

              <q-card-actions align="center" class="q-pa-md">
                <q-btn
                  color="green"
                  label="Ir al Calculador"
                  icon="arrow_forward"
                  size="lg"
                  unelevated
                  to="/subnet-calculator"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </section>

      <!-- Info Section -->
      <section class="info-section q-mt-xl">
        <q-card flat bordered class="info-card">
          <q-card-section class="bg-blue-1">
            <div class="text-h6 text-weight-bold q-mb-sm">
              <q-icon name="info" color="blue" size="sm" class="q-mr-xs" />
              Acerca de esta Herramienta
            </div>
            <div class="text-body2">
              <p class="q-mb-sm">
                <strong>IPv4:</strong> Utiliza direcciones de 32 bits (cuatro octetos) representadas
                en formato decimal punteado (ej: 192.168.1.1). Proporciona aproximadamente 4.3 mil
                millones de direcciones únicas.
              </p>
              <p class="q-mb-sm">
                <strong>IPv6:</strong> Utiliza direcciones de 128 bits representadas en formato
                hexadecimal (ej: 2001:0db8::1). Ofrece un espacio de direcciones prácticamente
                ilimitado con más de 340 undecillones de direcciones.
              </p>
              <p class="q-mb-sm">
                <strong>Subnetting:</strong> El proceso de dividir una red en subredes más pequeñas
                permite una mejor organización, seguridad y uso eficiente del espacio de direcciones IP.
              </p>
              <p>
                <strong>CIDR (Classless Inter-Domain Routing):</strong> Notación que indica el número
                de bits de la máscara de red (ej: /24, /16). Reemplazó el sistema de clases tradicional
                permitiendo una asignación más flexible de direcciones.
              </p>
            </div>
          </q-card-section>
        </q-card>
      </section>

      <!-- Footer -->
      <section class="footer-section q-mt-xl text-center">
        <div class="text-caption text-grey-6">
          Herramientas de Redes IP - Proyecto Universitario
        </div>
        <div class="text-caption text-grey-5 q-mt-sm">
          Desarrollado con Vue 3 + Quasar Framework
        </div>
      </section>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
.landing-container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 20px;
}

.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 12px;
  overflow: hidden;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.full-height {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.full-height .q-card__actions {
  margin-top: auto;
}

.info-card {
  border-radius: 12px;
}
</style>
