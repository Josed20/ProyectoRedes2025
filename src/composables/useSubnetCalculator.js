/**
 * Composable para manejar el cálculo de subredes
 * @module useSubnetCalculator
 */

import { ref, computed } from 'vue'
import {
  calculateSubnet,
  subdivideNetwork,
  ipBelongsToSubnet,
  suggestSubnetForHosts,
  cidrToSubnetMask
} from '../utils/subnetUtils'
import { isValidIPv4 } from '../utils/ipUtils'

export function useSubnetCalculator () {
  const ipInput = ref('')
  const cidrInput = ref(24)
  const subnetResult = ref(null)
  const subdivisionResult = ref(null)
  const errorMessage = ref('')
  const isLoading = ref(false)

  const cidrOptions = computed(() => {
    const options = []
    for (let i = 1; i <= 32; i++) {
      const mask = cidrToSubnetMask(i)
      const hosts = i === 32 ? 1 : Math.pow(2, 32 - i) - 2
      options.push({
        value: i,
        label: `/${i}`,
        mask,
        hosts: hosts.toLocaleString()
      })
    }
    return options
  })

  const clearAll = () => {
    ipInput.value = ''
    cidrInput.value = 24
    subnetResult.value = null
    subdivisionResult.value = null
    errorMessage.value = ''
  }

  const validateIpInput = (val) => {
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
      const ip = ipInput.value.trim()
      const cidr = parseInt(cidrInput.value, 10)

      if (!isValidIPv4(ip)) {
        errorMessage.value = 'Por favor ingrese una dirección IPv4 válida'
        return
      }

      if (cidr < 1 || cidr > 32) {
        errorMessage.value = 'El CIDR debe estar entre 1 y 32'
        return
      }

      const result = calculateSubnet(ip, cidr)
      subnetResult.value = result
    } catch (error) {
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }

  const subdivideCurrentNetwork = (newCidr) => {
    if (!subnetResult.value) {
      errorMessage.value = 'Primero debe calcular una subred'
      return
    }

    errorMessage.value = ''
    isLoading.value = true

    try {
      const currentCidr = subnetResult.value.cidr
      const networkAddress = subnetResult.value.networkAddress

      if (newCidr <= currentCidr) {
        errorMessage.value = 'El nuevo CIDR debe ser mayor que el actual'
        return
      }

      const subnets = subdivideNetwork(networkAddress, currentCidr, newCidr)
      subdivisionResult.value = {
        originalNetwork: `${networkAddress}/${currentCidr}`,
        newCidr,
        numberOfSubnets: subnets.length,
        subnets
      }
    } catch (error) {
      errorMessage.value = error.message
    } finally {
      isLoading.value = false
    }
  }

  const checkIpInSubnet = (testIp) => {
    if (!subnetResult.value) return null

    try {
      const belongs = ipBelongsToSubnet(
        testIp,
        subnetResult.value.networkAddress,
        subnetResult.value.cidr
      )
      return belongs
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
    validateCidrInput,
    calculateSubnetInfo,
    subdivideCurrentNetwork,
    checkIpInSubnet,
    getSuggestionsForHosts
  }
}
