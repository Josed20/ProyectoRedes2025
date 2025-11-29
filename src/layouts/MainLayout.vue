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
          <span class="cyber-text">NETWORK TOOLS</span>
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
              <q-icon name="hub" size="72px" class="logo-icon" />
              <div class="logo-glow"></div>
            </div>
            <div class="text-h5 text-weight-bold cyber-text q-mt-md">
              NETWORK TOOLS
            </div>
            <div class="text-caption text-grey-5 q-mt-xs">
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
                <q-item-label class="nav-label">Inicio</q-item-label>
                <q-item-label caption class="nav-caption">Dashboard principal</q-item-label>
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
                <q-item-label class="nav-label">Conversor de IP</q-item-label>
                <q-item-label caption class="nav-caption">IPv4 → Binario, Hex, IPv6</q-item-label>
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
                <q-item-label class="nav-label">Calculador de Subredes</q-item-label>
                <q-item-label caption class="nav-caption">Análisis CIDR y máscaras</q-item-label>
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
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useAppConfigStore } from '../stores/appConfig'
import AnimatedBackground from '../components/UI/AnimatedBackground.vue'

const $q = useQuasar()
const appConfig = useAppConfigStore()
const showAbout = ref(false)

onMounted(() => {
  appConfig.initializeFromStorage()
})
</script>

<style scoped>
/* ============================================ */
/* GLASSMORPHISM STYLES */
/* ============================================ */
.glass-header {
  background: rgba(0, 217, 255, 0.1) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0, 217, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}

body.body--dark .glass-header {
  background: rgba(126, 34, 206, 0.15) !important;
  border-bottom: 1px solid rgba(126, 34, 206, 0.3);
}

.glass-drawer {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-right: 1px solid rgba(0, 217, 255, 0.2);
}

body.body--dark .glass-drawer {
  background: rgba(10, 10, 26, 0.8) !important;
  border-right: 1px solid rgba(126, 34, 206, 0.3);
}

.glass-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(0, 217, 255, 0.3);
  border-radius: 16px;
}

body.body--dark .glass-card {
  background: rgba(10, 10, 26, 0.7) !important;
  border: 1px solid rgba(126, 34, 206, 0.4);
}

/* ============================================ */
/* CYBER/TECH STYLING */
/* ============================================ */
.cyber-text {
  font-family: 'Orbitron', 'Rajdhani', sans-serif;
  font-weight: 700;
  letter-spacing: 2px;
  background: linear-gradient(90deg, #00d9ff, #7e22ce);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 217, 255, 0.5);
}

.cyber-btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cyber-btn:hover {
  background: rgba(0, 217, 255, 0.15) !important;
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
}

body.body--dark .cyber-btn:hover {
  background: rgba(126, 34, 206, 0.15) !important;
  box-shadow: 0 0 20px rgba(126, 34, 206, 0.4);
}

.glow-icon {
  filter: drop-shadow(0 0 8px #00d9ff);
  animation: iconPulse 3s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { filter: drop-shadow(0 0 8px #00d9ff); }
  50% { filter: drop-shadow(0 0 16px #00d9ff); }
}

/* ============================================ */
/* NAVIGATION ITEMS */
/* ============================================ */
.nav-item {
  border-radius: 12px;
  margin-bottom: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid transparent;
}

.nav-item:hover {
  background: rgba(0, 217, 255, 0.1) !important;
  border: 1px solid rgba(0, 217, 255, 0.3);
  transform: translateX(4px);
}

body.body--dark .nav-item:hover {
  background: rgba(126, 34, 206, 0.1) !important;
  border: 1px solid rgba(126, 34, 206, 0.3);
}

.nav-item--active {
  background: linear-gradient(90deg, rgba(0, 217, 255, 0.2), rgba(126, 34, 206, 0.2)) !important;
  border: 1px solid rgba(0, 217, 255, 0.5);
  box-shadow: 0 4px 16px rgba(0, 217, 255, 0.3);
}

.nav-label {
  font-weight: 600;
  color: #00d9ff;
}

body.body--dark .nav-label {
  color: #b794f6;
}

.nav-caption {
  font-size: 11px;
  opacity: 0.7;
}

/* ============================================ */
/* SEPARATORS & SECTIONS */
/* ============================================ */
.separator-glow {
  background: linear-gradient(90deg, transparent, #00d9ff, transparent);
  height: 2px;
  opacity: 0.5;
}

body.body--dark .separator-glow {
  background: linear-gradient(90deg, transparent, #7e22ce, transparent);
}

.separator-subtle {
  opacity: 0.2;
}

.section-header {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #00d9ff;
  opacity: 0.8;
}

body.body--dark .section-header {
  color: #b794f6;
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
  color: #00d9ff;
  filter: drop-shadow(0 0 20px #00d9ff);
  animation: logoFloat 3s ease-in-out infinite;
  position: relative;
  z-index: 2;
}

body.body--dark .logo-icon {
  color: #b794f6;
  filter: drop-shadow(0 0 20px #7e22ce);
}

@keyframes logoFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(0, 217, 255, 0.3), transparent 70%);
  border-radius: 50%;
  animation: glowPulse 3s ease-in-out infinite;
  z-index: 1;
}

body.body--dark .logo-glow {
  background: radial-gradient(circle, rgba(126, 34, 206, 0.3), transparent 70%);
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
  background: linear-gradient(135deg, #00d9ff 0%, #7e22ce 100%);
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
  content: '▹';
  position: absolute;
  left: 0;
  color: #00d9ff;
  font-weight: bold;
}

body.body--dark .feature-list li::before {
  color: #b794f6;
}

.tech-stack {
  flex-wrap: wrap;
}

/* ============================================ */
/* SETTINGS SECTION */
/* ============================================ */
.settings-section {
  border-top: 1px solid rgba(0, 217, 255, 0.1);
  padding-top: 16px;
}

body.body--dark .settings-section {
  border-top: 1px solid rgba(126, 34, 206, 0.2);
}

.settings-item {
  border-radius: 8px;
  transition: background 0.2s ease;
}

.settings-item:hover {
  background: rgba(0, 217, 255, 0.05);
}

body.body--dark .settings-item:hover {
  background: rgba(126, 34, 206, 0.05);
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
