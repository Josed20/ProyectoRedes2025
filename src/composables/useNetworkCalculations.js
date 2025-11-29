/**
 * Composable unificado para cálculos de red
 * Centraliza toda la lógica de conversión de IPs y cálculo de subredes
 * @module useNetworkCalculations
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
import {
  calculateSubnet,
  subdivideNetwork,
  ipBelongsToSubnet,
  suggestSubnetForHosts,
  cidrToSubnetMask
} from '../utils/subnetUtils'

export function useNetworkCalculations () {
  // ============================================
  // Estado Compartido
  // ============================================
  const isLoading = ref(false)
  const errorMessage = ref('')

  // ============================================
  // CONVERSOR DE IP - Estado y Métodos
  // ============================================
  const ipInput = ref('')
  const ipConversionResult = ref(null)

  const validateIpInput = (val) => {
    if (!val) return 'Por favor ingrese una dirección IP'
    if (!isValidIPv4(val) && !isValidIPv6(val)) {
      return 'Dirección IP inválida'
    }
    return true
  }

  const convertIPv4ToAllFormats = () => {
    errorMessage.value = ''
    ipConversionResult.value = null
    isLoading.value = true

    try {
      const ip = ipInput.value.trim()

      if (!isValidIPv4(ip)) {
        errorMessage.value = 'Por favor ingrese una dirección IPv4 válida'
        return null
      }

      const binary = ipv4ToBinary(ip)
      const hex = ipv4ToHex(ip)
      const ipv6 = ipv4ToIPv6Mapped(ip)
      const info = getIpInfo(ip)

      const result = {
        type: 'ipv4',
        original: ip,
        binary,
        hex,
        ipv6Mapped: ipv6,
        info
      }

      ipConversionResult.value = result
      return result
    } catch (error) {
      errorMessage.value = error.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  const extractIPv4FromIPv6 = () => {
    errorMessage.value = ''
    ipConversionResult.value = null
    isLoading.value = true

    try {
      const ip = ipInput.value.trim()

      if (!isValidIPv6(ip)) {
        errorMessage.value = 'Por favor ingrese una dirección IPv6 válida'
        return null
      }

      const ipv4 = ipv6MappedToIPv4(ip)

      if (!ipv4) {
        errorMessage.value = 'Esta dirección IPv6 no es una IPv4 mapeada. Solo se pueden convertir direcciones del formato ::ffff:x.x.x.x'
        return null
      }

      const info = getIpInfo(ipv4)

      const result = {
        type: 'ipv6-to-ipv4',
        original: ip,
        ipv4Extracted: ipv4,
        info
      }

      ipConversionResult.value = result
      return result
    } catch (error) {
      errorMessage.value = error.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  const clearIpConverter = () => {
    ipInput.value = ''
    ipConversionResult.value = null
    errorMessage.value = ''
  }

  // ============================================
  // CALCULADOR DE SUBREDES - Estado y Métodos
  // ============================================
  const subnetIpInput = ref('')
  const subnetCidr = ref(24)
  const subnetResult = ref(null)
  const subdivisionResult = ref(null)

  const cidrOptions = computed(() => {
    const options = []
    for (let i = 1; i <= 32; i++) {
      const mask = cidrToSubnetMask(i)
      const hosts = i === 32 ? 1 : Math.pow(2, 32 - i) - 2
      options.push({
        value: i,
        label: `/${i}`,
        mask,
        hosts: hosts.toLocaleString(),
        description: `${mask} - ${hosts.toLocaleString()} hosts`
      })
    }
    return options
  })

  const validateSubnetIpInput = (val) => {
    if (!val) return 'Por favor ingrese una dirección IP'
    if (!isValidIPv4(val)) {
      return 'Dirección IPv4 inválida'
    }
    return true
  }

  const validateCidrInput = (val) => {
    if (val < 1 || val > 32) {
      return 'CIDR debe estar entre 1 y 32'
    }
    return true
  }

  const calculateSubnetInfo = () => {
    errorMessage.value = ''
    subnetResult.value = null
    subdivisionResult.value = null
    isLoading.value = true

    try {
      const ip = subnetIpInput.value.trim()
      const cidr = parseInt(subnetCidr.value, 10)

      if (!isValidIPv4(ip)) {
        errorMessage.value = 'Por favor ingrese una dirección IPv4 válida'
        return null
      }

      if (cidr < 1 || cidr > 32) {
        errorMessage.value = 'El CIDR debe estar entre 1 y 32'
        return null
      }

      const result = calculateSubnet(ip, cidr)
      subnetResult.value = result
      return result
    } catch (error) {
      errorMessage.value = error.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  const subdivideCurrentNetwork = (newCidr) => {
    if (!subnetResult.value) {
      errorMessage.value = 'Primero debe calcular una subred'
      return null
    }

    errorMessage.value = ''
    isLoading.value = true

    try {
      const currentCidr = subnetResult.value.cidr
      const networkAddress = subnetResult.value.networkAddress

      if (newCidr <= currentCidr) {
        errorMessage.value = 'El nuevo CIDR debe ser mayor que el actual'
        return null
      }

      const subnets = subdivideNetwork(networkAddress, currentCidr, newCidr)
      const result = {
        originalNetwork: `${networkAddress}/${currentCidr}`,
        newCidr,
        numberOfSubnets: subnets.length,
        subnets
      }

      subdivisionResult.value = result
      return result
    } catch (error) {
      errorMessage.value = error.message
      return null
    } finally {
      isLoading.value = false
    }
  }

  const checkIpInSubnet = (testIp) => {
    if (!subnetResult.value) return null

    try {
      return ipBelongsToSubnet(
        testIp,
        subnetResult.value.networkAddress,
        subnetResult.value.cidr
      )
    } catch {
      return null
    }
  }

  const getSuggestionsForHosts = (requiredHosts) => {
    try {
      return suggestSubnetForHosts(requiredHosts)
    } catch {
      return []
    }
  }

  const clearSubnetCalculator = () => {
    subnetIpInput.value = ''
    subnetCidr.value = 24
    subnetResult.value = null
    subdivisionResult.value = null
    errorMessage.value = ''
  }

  // ============================================
  // UTILIDADES GENERALES
  // ============================================
  const clearAll = () => {
    clearIpConverter()
    clearSubnetCalculator()
  }

  const getIpInformation = (ip) => {
    try {
      return getIpInfo(ip)
    } catch {
      return null
    }
  }

  // ============================================
  // Return API pública
  // ============================================
  return {
    // Estado compartido
    isLoading,
    errorMessage,

    // Conversor de IP
    ipInput,
    ipConversionResult,
    validateIpInput,
    convertIPv4ToAllFormats,
    extractIPv4FromIPv6,
    clearIpConverter,

    // Calculador de Subredes
    subnetIpInput,
    subnetCidr,
    subnetResult,
    subdivisionResult,
    cidrOptions,
    validateSubnetIpInput,
    validateCidrInput,
    calculateSubnetInfo,
    subdivideCurrentNetwork,
    checkIpInSubnet,
    getSuggestionsForHosts,
    clearSubnetCalculator,

    // Utilidades
    clearAll,
    getIpInformation,
    isValidIPv4,
    isValidIPv6
  }
}
