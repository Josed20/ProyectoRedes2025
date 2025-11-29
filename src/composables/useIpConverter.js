/**
 * Composable para manejar la conversión de direcciones IP
 * @module useIpConverter
 */

import { ref, computed } from 'vue'
import {
  isValidIPv4,
  isValidIPv6,
  ipv4ToBinary,
  ipv4ToHex,
  ipv4ToIPv6Mapped,
  ipv6MappedToIPv4,
  getIpInfo
} from '../utils/ipUtils'

export function useIpConverter () {
  const ipInput = ref('')
  const conversionResult = ref(null)
  const errorMessage = ref('')
  const isLoading = ref(false)

  const ipInfo = computed(() => {
    if (!ipInput.value || errorMessage.value) return null
    try {
      return getIpInfo(ipInput.value)
    } catch {
      return null
    }
  })

  const clearAll = () => {
    ipInput.value = ''
    conversionResult.value = null
    errorMessage.value = ''
  }

  const validateIpInput = (val) => {
    if (!val) return 'Por favor ingrese una dirección IP'
    if (!isValidIPv4(val) && !isValidIPv6(val)) {
      return 'Dirección IP inválida'
    }
    return true
  }

  const convertIPv4 = () => {
    errorMessage.value = ''
    conversionResult.value = null
    isLoading.value = true

    try {
      const ip = ipInput.value.trim()

      if (!isValidIPv4(ip)) {
        errorMessage.value = 'Por favor ingrese una dirección IPv4 válida'
        return
      }

      const binary = ipv4ToBinary(ip)
      const hex = ipv4ToHex(ip)
      const ipv6 = ipv4ToIPv6Mapped(ip)
      const info = getIpInfo(ip)

      conversionResult.value = {
        type: 'ipv4',
        original: ip,
        binary,
        hex,
        ipv6Mapped: ipv6,
        info
      }
    } catch (error) {
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }

  const convertIPv6ToIPv4 = () => {
    errorMessage.value = ''
    conversionResult.value = null
    isLoading.value = true

    try {
      const ip = ipInput.value.trim()

      if (!isValidIPv6(ip)) {
        errorMessage.value = 'Por favor ingrese una dirección IPv6 válida'
        return
      }

      const ipv4 = ipv6MappedToIPv4(ip)

      if (!ipv4) {
        errorMessage.value = 'Esta dirección IPv6 no es una IPv4 mapeada. Solo se pueden convertir direcciones del formato ::ffff:x.x.x.x'
        return
      }

      const info = getIpInfo(ipv4)

      conversionResult.value = {
        type: 'ipv6-to-ipv4',
        original: ip,
        ipv4Extracted: ipv4,
        info
      }
    } catch (error) {
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }

  return {
    ipInput,
    conversionResult,
    errorMessage,
    isLoading,
    ipInfo,
    clearAll,
    validateIpInput,
    convertIPv4,
    convertIPv6ToIPv4
  }
}
