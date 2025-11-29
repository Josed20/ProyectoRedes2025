/**
 * Pinia Store para configuración global de la aplicación
 * Maneja tema oscuro, preferencias de usuario y persistencia en localStorage
 */

import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { useQuasar } from 'quasar'

export const useAppConfigStore = defineStore('appConfig', () => {
  const $q = useQuasar()

  // Estado reactivo
  const darkMode = ref(false)
  const sidebarOpen = ref(true)
  const language = ref('es')
  const animationsEnabled = ref(true)

  // Computed
  const isDark = computed(() => darkMode.value)
  const currentLanguage = computed(() => language.value)

  // Inicializar desde localStorage
  const initializeFromStorage = () => {
    try {
      const savedDarkMode = localStorage.getItem('darkMode')
      const savedLanguage = localStorage.getItem('language')
      const savedAnimations = localStorage.getItem('animationsEnabled')
      const savedSidebar = localStorage.getItem('sidebarOpen')

      if (savedDarkMode !== null) {
        darkMode.value = savedDarkMode === 'true'
        $q.dark.set(darkMode.value)
      } else {
        // Detectar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        darkMode.value = prefersDark
        $q.dark.set(prefersDark)
      }

      if (savedLanguage) {
        language.value = savedLanguage
      }

      if (savedAnimations !== null) {
        animationsEnabled.value = savedAnimations === 'true'
      }

      if (savedSidebar !== null) {
        sidebarOpen.value = savedSidebar === 'true'
      }
    } catch (error) {
      console.warn('Error loading settings from localStorage:', error)
    }
  }

  // Watchers para persistencia automática
  watch(darkMode, (newValue) => {
    localStorage.setItem('darkMode', newValue.toString())
    $q.dark.set(newValue)
  })

  watch(language, (newValue) => {
    localStorage.setItem('language', newValue)
  })

  watch(animationsEnabled, (newValue) => {
    localStorage.setItem('animationsEnabled', newValue.toString())
  })

  watch(sidebarOpen, (newValue) => {
    localStorage.setItem('sidebarOpen', newValue.toString())
  })

  // Acciones
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value
  }

  const setDarkMode = (value) => {
    darkMode.value = value
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const setLanguage = (lang) => {
    language.value = lang
  }

  const toggleAnimations = () => {
    animationsEnabled.value = !animationsEnabled.value
  }

  const resetToDefaults = () => {
    darkMode.value = false
    language.value = 'es'
    animationsEnabled.value = true
    sidebarOpen.value = true
    localStorage.clear()
  }

  return {
    // State
    darkMode,
    sidebarOpen,
    language,
    animationsEnabled,
    // Getters
    isDark,
    currentLanguage,
    // Actions
    initializeFromStorage,
    toggleDarkMode,
    setDarkMode,
    toggleSidebar,
    setLanguage,
    toggleAnimations,
    resetToDefaults
  }
})
