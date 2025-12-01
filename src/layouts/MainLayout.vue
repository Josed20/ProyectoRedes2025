<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Fondo animado -->
    <animated-background v-if="appConfig.animationsEnabled" />

    <!-- Header con glassmorphism -->
    <q-header class="glass-header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          class="cyber-btn"
          @click="appConfig.toggleSidebar"
        />

        <q-toolbar-title class="toolbar-title">
          <q-icon name="hub" size="sm" class="q-mr-sm glow-icon" />
          <span class="cyber-text text-h6 text-weight-bold">NETWORK TOOLS</span>
        </q-toolbar-title>

        <q-space />

        <!-- Toggle de tema oscuro -->
        <q-btn
          flat
          dense
          round
          :icon="appConfig.isDark ? 'light_mode' : 'dark_mode'"
          class="cyber-btn"
          @click="appConfig.toggleDarkMode"
        >
          <q-tooltip>{{ appConfig.isDark ? 'Modo Claro' : 'Modo Oscuro' }}</q-tooltip>
        </q-btn>

        <!-- Toggle de animaciones -->
        <q-btn
          flat
          dense
          round
          :icon="appConfig.animationsEnabled ? 'animation' : 'motion_photos_off'"
          class="cyber-btn q-ml-sm"
          @click="appConfig.toggleAnimations"
        >
          <q-tooltip>{{ appConfig.animationsEnabled ? 'Desactivar Animaciones' : 'Activar Animaciones' }}</q-tooltip>
        </q-btn>

        <!-- Botón About -->
        <q-btn
          flat
          dense
          round
          icon="info"
          class="cyber-btn q-ml-sm"
          @click="showAbout = true"
        >
          <q-tooltip>Acerca de</q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Drawer lateral con glassmorphism -->
    <q-drawer
      v-model="appConfig.sidebarOpen"
      :behavior="$q.screen.lt.md ? 'mobile' : 'desktop'"
      show-if-above
      :width="280"
      :breakpoint="768"
      class="glass-drawer"
    >
      <q-scroll-area class="fit">
        <div class="q-pa-md">
          <!-- Logo/Brand Section con efecto glow -->
          <div class="text-center q-mb-lg brand-section">
            <div class="logo-container">
              <q-icon name="hub" size="64px" class="logo-icon" />
              <div class="logo-glow"></div>
            </div>
            <div class="text-h5 text-weight-bold cyber-text q-mt-md">
              NETWORK TOOLS
            </div>
            <div class="text-body2 text-grey-4 q-mt-xs">
              Advanced IP Suite v2.0
            </div>
          </div>

          <q-separator class="q-mb-lg separator-glow" />

          <!-- Navigation Menu -->
          <q-list padding class="nav-list">
            <q-item
              clickable
              v-ripple
              :to="'/'"
              exact
              class="nav-item"
              active-class="nav-item--active"
            >
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="nav-label text-body1">Inicio</q-item-label>
                <q-item-label caption class="nav-caption text-body2">Dashboard principal</q-item-label>
              </q-item-section>
            </q-item>

            <q-separator spaced class="separator-subtle" />

            <q-item-label header class="section-header">
              <q-icon name="build" size="xs" class="q-mr-xs" />
              HERRAMIENTAS
            </q-item-label>

            <q-item
              clickable
              v-ripple
              :to="'/ip-converter'"
              class="nav-item"
              active-class="nav-item--active"
            >
              <q-item-section avatar>
                <q-icon name="swap_horiz" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="nav-label text-body1">Conversor de IP</q-item-label>
                <q-item-label caption class="nav-caption text-body2">{{ ipConverterSubtitle }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="arrow_forward_ios" size="xs" />
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              :to="'/subnet-calculator'"
              class="nav-item"
              active-class="nav-item--active"
            >
              <q-item-section avatar>
                <q-icon name="calculate" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="nav-label text-body1">Calculador de Subredes</q-item-label>
                <q-item-label caption class="nav-caption text-body2">Análisis CIDR y máscaras</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="arrow_forward_ios" size="xs" />
              </q-item-section>
            </q-item>

            <q-separator spaced class="separator-subtle" />

            <q-item-label header class="section-header">
              <q-icon name="school" size="xs" class="q-mr-xs" />
              RECURSOS
            </q-item-label>

            <q-item
              clickable
              v-ripple
              href="https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html"
              target="_blank"
              class="nav-item nav-item--external"
            >
              <q-item-section avatar>
                <q-icon name="description" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="nav-label">Cisco Docs</q-item-label>
                <q-item-label caption class="nav-caption">Guía de Subnetting</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="open_in_new" size="xs" />
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              href="https://www.rfc-editor.org/rfc/rfc791"
              target="_blank"
              class="nav-item nav-item--external"
            >
              <q-item-section avatar>
                <q-icon name="article" />
              </q-item-section>
              <q-item-section>
                <q-item-label class="nav-label">RFC 791</q-item-label>
                <q-item-label caption class="nav-caption">Especificación IPv4</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="open_in_new" size="xs" />
              </q-item-section>
            </q-item>
          </q-list>

          <!-- Settings Section -->
          <div class="settings-section q-mt-lg">
            <q-separator class="separator-glow q-mb-md" />
            <div class="text-caption text-grey-5 q-px-md q-mb-sm">CONFIGURACIÓN</div>
            <q-list dense class="settings-list">
              <q-item class="settings-item">
                <q-item-section avatar>
                  <q-icon name="palette" size="sm" />
                </q-item-section>
                <q-item-section>
                  <q-item-label caption>Tema</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-toggle
                    :model-value="appConfig.isDark"
                    @update:model-value="appConfig.setDarkMode"
                    color="cyan"
                    size="sm"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-scroll-area>
    </q-drawer>

    <!-- Page Container con transiciones -->
    <q-page-container>
      <router-view v-slot="{ Component, route }">
        <transition
          :name="appConfig.animationsEnabled ? 'page-fade-slide' : 'page-instant'"
          mode="out-in"
          appear
        >
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </q-page-container>

    <!-- About Dialog con glassmorphism -->
    <q-dialog v-model="showAbout" class="glass-dialog">
      <q-card class="about-card glass-card" style="min-width: 400px; max-width: 500px">
        <q-card-section class="about-header bg-gradient-cyber text-white">
          <div class="text-h5 text-weight-bold">
            <q-icon name="info" size="sm" class="q-mr-sm" />
            NETWORK TOOLS
          </div>
          <div class="text-caption q-mt-xs">Advanced IP Suite</div>
        </q-card-section>

        <q-card-section class="about-content">
          <div class="q-gutter-md">
            <div>
              <div class="text-weight-bold text-cyan">Versión 2.0.0</div>
              <div class="text-caption text-grey-7">Build Profesional</div>
            </div>

            <q-separator />

            <div class="text-body2">
              Suite profesional de herramientas para análisis y conversión de direcciones IP,
              diseñada con tecnologías de vanguardia y arquitectura moderna.
            </div>

            <div>
              <div class="text-weight-bold text-body2 q-mb-sm">
                <q-icon name="star" color="cyan" size="xs" class="q-mr-xs" />
                Características:
              </div>
              <ul class="text-body2 feature-list">
                <li>Conversión IPv4 a múltiples formatos</li>
                <li>Calculadora avanzada de subredes</li>
                <li>Validación automática en tiempo real</li>
                <li>Diseño Glassmorphism con animaciones</li>
                <li>Modo oscuro y configuración persistente</li>
              </ul>
            </div>

            <div>
              <div class="text-weight-bold text-body2 q-mb-xs">
                <q-icon name="code" color="deep-purple" size="xs" class="q-mr-xs" />
                Stack Tecnológico:
              </div>
              <div class="tech-stack row q-gutter-xs">
                <q-chip size="sm" color="cyan" text-color="white" icon="mdi-vuejs">Vue 3</q-chip>
                <q-chip size="sm" color="deep-purple" text-color="white" icon="widgets">Quasar</q-chip>
                <q-chip size="sm" color="pink" text-color="white" icon="mdi-storage">Pinia</q-chip>
                <q-chip size="sm" color="teal" text-color="white" icon="code">ES6+</q-chip>
              </div>
            </div>

            <div class="text-center q-mt-md">
              <div class="text-caption text-grey-6">Desarrollado con ❤️ para el curso de Redes</div>
              <div class="text-caption text-grey-5 q-mt-xs">Universidad ESAN © 2025</div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cerrar" color="cyan" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useAppConfigStore } from '../stores/appConfig'
import { useNetworkCalculations } from '../composables/useNetworkCalculations'
import AnimatedBackground from '../components/UI/AnimatedBackground.vue'

const $q = useQuasar()
const appConfig = useAppConfigStore()
const showAbout = ref(false)

// Obtener el tipo de IP detectado desde el composable compartido
const { detectedIpType } = useNetworkCalculations()

// Subtítulo dinámico para el conversor de IP
const ipConverterSubtitle = computed(() => {
  if (detectedIpType.value === 'ipv6') {
    return 'IPv6 → Binario, Hex, IPv4'
  }
  return 'IPv4 → Binario, Hex, IPv6'
})

onMounted(() => {
  appConfig.initializeFromStorage()
})
</script>

<style scoped>
/* ============================================ */
/* GLASSMORPHISM STYLES */
/* ============================================ */
.glass-header {
  background: rgba(248, 250, 252, 0.95) !important;
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

body.body--dark .glass-header {
  background: rgba(15, 23, 42, 0.95) !important;
  border-bottom: 1px solid rgba(51, 65, 85, 0.8);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
}

.glass-drawer {
  background: rgba(248, 250, 252, 0.98) !important;
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  border-right: 1px solid rgba(226, 232, 240, 0.5);
}

body.body--dark .glass-drawer {
  background: rgba(15, 23, 42, 0.98) !important;
  border-right: 1px solid rgba(51, 65, 85, 0.8);
}

.glass-card {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(10px) saturate(150%);
  -webkit-backdrop-filter: blur(10px) saturate(150%);
  border: 1px solid rgba(226, 232, 240, 0.7);
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

body.body--dark .glass-card {
  background: rgba(30, 41, 59, 0.95) !important;
  border: 1px solid rgba(51, 65, 85, 0.8);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

/* ============================================ */
/* CYBER/TECH STYLING */
/* ============================================ */
.cyber-text {
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #0f172a;
}

body.body--dark .cyber-text {
  color: #ffffff;
  text-shadow: 0 0 10px rgba(6, 182, 212, 0.3);
}

.cyber-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #64748b;
}

body.body--dark .cyber-btn {
  color: #cbd5e1;
}

.cyber-btn:hover {
  background: rgba(6, 182, 212, 0.1) !important;
  color: #06b6d4;
}

body.body--dark .cyber-btn:hover {
  background: rgba(6, 182, 212, 0.15) !important;
  color: #06b6d4;
}

.glow-icon {
  color: #06b6d4;
  filter: drop-shadow(0 0 4px rgba(6, 182, 212, 0.3));
}

@keyframes iconPulse {
  0%, 100% { filter: drop-shadow(0 0 4px rgba(6, 182, 212, 0.3)); }
  50% { filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.5)); }
}

/* ============================================ */
/* NAVIGATION ITEMS */
/* ============================================ */
.nav-item {
  border-radius: 8px;
  margin-bottom: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.nav-item:hover {
  background: rgba(6, 182, 212, 0.08) !important;
  border: 1px solid rgba(6, 182, 212, 0.2);
  transform: translateX(4px);
}

body.body--dark .nav-item:hover {
  background: rgba(6, 182, 212, 0.1) !important;
  border: 1px solid rgba(6, 182, 212, 0.3);
}

.nav-item--active {
  background: rgba(6, 182, 212, 0.15) !important;
  border: 1px solid rgba(6, 182, 212, 0.4);
  box-shadow: 0 2px 8px rgba(6, 182, 212, 0.2);
}

body.body--dark .nav-item--active {
  background: rgba(6, 182, 212, 0.2) !important;
  border: 1px solid rgba(6, 182, 212, 0.5);
  box-shadow: 0 2px 8px rgba(6, 182, 212, 0.3);
}

.nav-label {
  font-weight: 600;
  font-size: 16px;
  color: #334155;
}

body.body--dark .nav-label {
  color: #e2e8f0;
}

.nav-caption {
  font-size: 14px;
  opacity: 0.7;
  color: #64748b;
}

body.body--dark .nav-caption {
  color: #94a3b8;
}

/* ============================================ */
/* SEPARATORS & SECTIONS */
/* ============================================ */
.separator-glow {
  background: rgba(6, 182, 212, 0.3);
  height: 1px;
  opacity: 0.3;
}

body.body--dark .separator-glow {
  background: rgba(6, 182, 212, 0.4);
  opacity: 0.4;
}

.separator-subtle {
  opacity: 0.2;
}

.section-header {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: #64748b;
  opacity: 0.9;
}

body.body--dark .section-header {
  color: #94a3b8;
}

/* ============================================ */
/* BRAND SECTION */
/* ============================================ */
.brand-section {
  position: relative;
}

.logo-container {
  position: relative;
  display: inline-block;
}

.logo-icon {
  color: #06b6d4;
  filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.3));
  position: relative;
  z-index: 2;
}

body.body--dark .logo-icon {
  color: #06b6d4;
  filter: drop-shadow(0 0 12px rgba(6, 182, 212, 0.4));
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.2), transparent 70%);
  border-radius: 50%;
  z-index: 1;
}

body.body--dark .logo-glow {
  background: radial-gradient(circle, rgba(6, 182, 212, 0.25), transparent 70%);
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
}

/* ============================================ */
/* PAGE TRANSITIONS */
/* ============================================ */
.page-fade-slide-enter-active,
.page-fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.page-fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.page-instant-enter-active,
.page-instant-leave-active {
  transition: none;
}

/* ============================================ */
/* ABOUT DIALOG */
/* ============================================ */
.bg-gradient-cyber {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.feature-list {
  list-style: none;
  padding-left: 0;
}

.feature-list li {
  padding: 4px 0;
  position: relative;
  padding-left: 20px;
}

.feature-list li::before {
  content: '╹';
  position: absolute;
  left: 0;
  color: #06b6d4;
  font-weight: bold;
}

body.body--dark .feature-list li::before {
  color: #06b6d4;
}

.tech-stack {
  flex-wrap: wrap;
}

/* ============================================ */
/* SETTINGS SECTION */
/* ============================================ */
.settings-section {
  border-top: 1px solid rgba(6, 182, 212, 0.15);
  padding-top: 16px;
}

body.body--dark .settings-section {
  border-top: 1px solid rgba(6, 182, 212, 0.2);
}

.settings-item {
  border-radius: 8px;
  transition: background 0.2s ease;
}

.settings-item:hover {
  background: rgba(6, 182, 212, 0.05);
}

body.body--dark .settings-item:hover {
  background: rgba(6, 182, 212, 0.08);
}

/* ============================================ */
/* RESPONSIVE ADJUSTMENTS */
/* ============================================ */
@media (max-width: 768px) {
  .cyber-text {
    font-size: 14px;
    letter-spacing: 1px;
  }

  .logo-icon {
    font-size: 48px !important;
  }
}
</style>
