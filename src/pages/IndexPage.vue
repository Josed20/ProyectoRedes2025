<template>
  <q-page class="landing-page">
    <div class="landing-container">
      <!-- Hero Section -->
      <section class="hero-section q-mb-xl">
        <div class="text-center">
          <div class="hero-icon-container q-mb-md">
            <q-icon name="hub" size="120px" class="hero-icon" />
            <div class="hero-glow"></div>
          </div>
          <h1 class="hero-title cyber-text">
            NETWORK TOOLS
          </h1>
          <p class="hero-subtitle text-h5 text-weight-medium q-mt-md q-mb-lg">
            Suite profesional de herramientas para análisis y conversión de direcciones IP
          </p>
          <div class="hero-description text-h6 q-mb-xl">
            Transforma tus redes con tecnología de vanguardia y diseño moderno
          </div>
        </div>
      </section>

      <!-- Tools Grid -->
      <div class="row q-col-gutter-lg">
        <!-- IP Converter Card -->
        <div class="col-12 col-md-6">
          <glass-card elevated hover class="tool-card" @click="$router.push('/ip-converter')">
            <q-card-section class="text-center">
              <div class="tool-icon-container q-mb-md">
                <q-icon name="swap_horiz" size="64px" class="tool-icon" />
              </div>
              <div class="text-h5 text-weight-bold q-mb-sm tool-title">
                Conversor de IP
              </div>
              <p class="text-body1 q-mb-md">
                Transforma direcciones IPv4 a múltiples formatos: Binario, Hexadecimal, e IPv6 mapeado
              </p>
              <div class="feature-tags q-gutter-xs q-mb-md">
                <q-chip size="sm" color="cyan" text-color="white" dense>
                  <q-icon name="check_circle" size="xs" class="q-mr-xs" />
                  IPv4 → IPv6
                </q-chip>
                <q-chip size="sm" color="deep-purple" text-color="white" dense>
                  <q-icon name="check_circle" size="xs" class="q-mr-xs" />
                  Binario
                </q-chip>
                <q-chip size="sm" color="cyan" text-color="white" dense>
                  <q-icon name="check_circle" size="xs" class="q-mr-xs" />
                  Hexadecimal
                </q-chip>
              </div>
              <q-btn
                unelevated
                rounded
                color="cyan"
                label="Comenzar"
                icon-right="arrow_forward"
                class="full-width tool-btn"
                @click.stop="$router.push('/ip-converter')"
              />
            </q-card-section>
          </glass-card>
        </div>

        <!-- Subnet Calculator Card -->
        <div class="col-12 col-md-6">
          <glass-card elevated hover class="tool-card" @click="$router.push('/subnet-calculator')">
            <q-card-section class="text-center">
              <div class="tool-icon-container q-mb-md">
                <q-icon name="calculate" size="64px" class="tool-icon" />
              </div>
              <div class="text-h5 text-weight-bold q-mb-sm tool-title">
                Calculador de Subredes
              </div>
              <p class="text-body1 q-mb-md">
                Análisis completo de redes IP con cálculo de máscaras, rangos de hosts y subdivisión automática
              </p>
              <div class="feature-tags q-gutter-xs q-mb-md">
                <q-chip size="sm" color="deep-purple" text-color="white" dense>
                  <q-icon name="check_circle" size="xs" class="q-mr-xs" />
                  CIDR
                </q-chip>
                <q-chip size="sm" color="cyan" text-color="white" dense>
                  <q-icon name="check_circle" size="xs" class="q-mr-xs" />
                  Máscaras
                </q-chip>
                <q-chip size="sm" color="deep-purple" text-color="white" dense>
                  <q-icon name="check_circle" size="xs" class="q-mr-xs" />
                  Subdivisión
                </q-chip>
              </div>
              <q-btn
                unelevated
                rounded
                color="deep-purple"
                label="Comenzar"
                icon-right="arrow_forward"
                class="full-width tool-btn"
                @click.stop="$router.push('/subnet-calculator')"
              />
            </q-card-section>
          </glass-card>
        </div>
      </div>

      <!-- Features Section -->
      <section class="features-section q-mt-xl">
        <div class="text-center q-mb-lg">
          <h3 class="text-h4 text-weight-bold cyber-text q-mb-sm">
            Características Destacadas
          </h3>
          <p class="text-body1 text-grey-6">
            Tecnología de punta para profesionales de redes
          </p>
        </div>

        <div class="row q-col-gutter-md">
          <div class="col-12 col-sm-6 col-md-3" v-for="feature in features" :key="feature.title">
            <glass-card class="feature-card text-center">
              <q-card-section>
                <q-icon :name="feature.icon" size="48px" :color="feature.color" class="q-mb-sm" />
                <div class="text-subtitle1 text-weight-bold q-mb-xs">
                  {{ feature.title }}
                </div>
                <div class="text-caption text-grey-6">
                  {{ feature.description }}
                </div>
              </q-card-section>
            </glass-card>
          </div>
        </div>
      </section>

      <!-- Info Section -->
      <section class="info-section q-mt-xl">
        <glass-card>
          <q-card-section>
            <div class="text-h5 text-weight-bold q-mb-md">
              <q-icon name="info" color="cyan" class="q-mr-sm" />
              Acerca del Proyecto
            </div>
            <div class="text-body2 q-mb-md">
              <strong>Network Tools</strong> es una suite profesional de herramientas desarrollada
              para facilitar el análisis, conversión y gestión de direcciones IP. Diseñada con
              las tecnologías más modernas y una arquitectura escalable.
            </div>
            <q-separator class="q-my-md" />
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="text-subtitle2 text-weight-bold q-mb-sm">
                  <q-icon name="school" size="sm" color="deep-purple" class="q-mr-xs" />
                  Propósito Educativo
                </div>
                <p class="text-body2 text-grey-7">
                  Proyecto desarrollado para el curso de Redes y Comunicaciones,
                  demostrando conocimientos avanzados en protocolos IP, subnetting y
                  desarrollo web moderno.
                </p>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-subtitle2 text-weight-bold q-mb-sm">
                  <q-icon name="code" size="sm" color="cyan" class="q-mr-xs" />
                  Tecnologías Utilizadas
                </div>
                <div class="row q-gutter-xs">
                  <q-chip size="sm" color="cyan" text-color="white">Vue 3</q-chip>
                  <q-chip size="sm" color="deep-purple" text-color="white">Quasar</q-chip>
                  <q-chip size="sm" color="pink" text-color="white">Pinia</q-chip>
                  <q-chip size="sm" color="teal" text-color="white">Composition API</q-chip>
                  <q-chip size="sm" color="indigo" text-color="white">SCSS</q-chip>
                </div>
              </div>
            </div>
          </q-card-section>
        </glass-card>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import GlassCard from '../components/UI/GlassCard.vue'

const features = ref([
  {
    title: 'Validación Instantánea',
    description: 'Verificación automática en tiempo real',
    icon: 'verified',
    color: 'cyan'
  },
  {
    title: 'Múltiples Formatos',
    description: 'Conversión a binario, hex e IPv6',
    icon: 'transform',
    color: 'deep-purple'
  },
  {
    title: 'Diseño Responsivo',
    description: 'Optimizado para todos los dispositivos',
    icon: 'devices',
    color: 'cyan'
  },
  {
    title: 'Modo Oscuro',
    description: 'Interfaz adaptable con persistencia',
    icon: 'dark_mode',
    color: 'deep-purple'
  }
])
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  padding: 48px 24px;
}

.landing-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* ============================================ */
/* HERO SECTION */
/* ============================================ */
.hero-section {
  padding: 80px 0 40px;
}

.hero-icon-container {
  position: relative;
  display: inline-block;
}

.hero-icon {
  color: #06b6d4;
  filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.4));
  animation: heroFloat 6s ease-in-out infinite;
  position: relative;
  z-index: 2;
}

body.body--dark .hero-icon {
  color: #06b6d4;
  filter: drop-shadow(0 0 25px rgba(6, 182, 212, 0.5));
}

@keyframes heroFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(3deg); }
  75% { transform: translateY(-6px) rotate(-3deg); }
}

.hero-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.25), transparent 70%);
  border-radius: 50%;
  animation: heroGlow 6s ease-in-out infinite;
  z-index: 1;
}

body.body--dark .hero-glow {
  background: radial-gradient(circle, rgba(6, 182, 212, 0.3), transparent 70%);
}

@keyframes heroGlow {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
}

.hero-title {
  font-size: 4rem;
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 4px;
  margin: 0;
}

.hero-subtitle {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 500;
  color: #475569;
}

body.body--dark .hero-subtitle {
  color: #cbd5e1;
}

.hero-description {
  max-width: 600px;
  margin: 0 auto;
}

/* ============================================ */
/* TOOL CARDS */
/* ============================================ */
.tool-card {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
}

.tool-card:hover {
  transform: translateY(-8px);
}

.tool-icon-container {
  position: relative;
  display: inline-block;
}

.tool-icon {
  color: #06b6d4;
  transition: all 0.3s ease;
}

.tool-card:hover .tool-icon {
  filter: drop-shadow(0 0 15px rgba(6, 182, 212, 0.5));
  transform: scale(1.1);
}

.tool-title {
  color: #0f172a;
  font-size: 22px;
}

body.body--dark .tool-title {
  color: #ffffff;
}

.feature-tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.tool-btn {
  font-weight: 700;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.tool-btn:hover {
  box-shadow: 0 8px 24px rgba(0, 217, 255, 0.5);
}

/* ============================================ */
/* FEATURE CARDS */
/* ============================================ */
.feature-card {
  height: 100%;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

/* ============================================ */
/* RESPONSIVE */
/* ============================================ */
@media (max-width: 768px) {
  .landing-page {
    padding: 24px 16px;
  }

  .hero-section {
    padding: 40px 0 20px;
  }

  .hero-title {
    font-size: 2.5rem;
    letter-spacing: 2px;
  }

  .hero-icon {
    font-size: 80px !important;
  }
}
</style>
