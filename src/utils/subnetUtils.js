/**
 * Utilidades para cálculo de subredes IPv4
 * @module subnetUtils
 */

import { isValidIPv4 } from './ipUtils'

/**
 * Convierte una máscara CIDR a formato decimal punteado
 * @param {number} cidr - Notación CIDR (0-32)
 * @returns {string} Máscara en formato decimal (ej: 255.255.255.0)
 */
export function cidrToSubnetMask (cidr) {
  if (cidr < 0 || cidr > 32) {
    throw new Error('CIDR debe estar entre 0 y 32')
  }

  const mask = []
  for (let i = 0; i < 4; i++) {
    const bits = Math.min(8, Math.max(0, cidr - i * 8))
    mask.push(256 - Math.pow(2, 8 - bits))
  }

  return mask.join('.')
}

/**
 * Convierte una máscara decimal a notación CIDR
 * @param {string} subnetMask - Máscara en formato decimal
 * @returns {number} Notación CIDR
 */
export function subnetMaskToCidr (subnetMask) {
  if (!isValidIPv4(subnetMask)) {
    throw new Error('Máscara de subred inválida')
  }

  const octets = subnetMask.split('.').map(Number)
  let cidr = 0

  for (const octet of octets) {
    const binary = octet.toString(2)
    cidr += binary.split('1').length - 1
  }

  return cidr
}

/**
 * Convierte una dirección IP a número entero de 32 bits
 * @param {string} ip - Dirección IP en formato decimal
 * @returns {number} Representación numérica de la IP
 */
export function ipToInt (ip) {
  const octets = ip.split('.').map(Number)
  return (octets[0] << 24) + (octets[1] << 16) + (octets[2] << 8) + octets[3]
}

/**
 * Convierte un número entero de 32 bits a dirección IP
 * @param {number} int - Número entero
 * @returns {string} Dirección IP en formato decimal
 */
export function intToIp (int) {
  return [
    (int >>> 24) & 0xFF,
    (int >>> 16) & 0xFF,
    (int >>> 8) & 0xFF,
    int & 0xFF
  ].join('.')
}

/**
 * Convierte una IP a formato binario completo
 * @param {string} ip - Dirección IP
 * @returns {string} IP en formato binario (32 bits sin separadores)
 */
export function ipToBinary (ip) {
  const octets = ip.split('.').map(Number)
  return octets.map(octet => octet.toString(2).padStart(8, '0')).join('')
}

/**
 * Convierte una IP a formato binario con puntos
 * @param {string} ip - Dirección IP
 * @returns {string} IP en formato binario con puntos separadores
 */
export function ipToBinaryDotted (ip) {
  const octets = ip.split('.').map(Number)
  return octets.map(octet => octet.toString(2).padStart(8, '0')).join('.')
}

/**
 * Calcula la información completa de una subred
 * @param {string} ip - Dirección IP base
 * @param {number} cidr - Notación CIDR
 * @returns {object} Información completa de la subred
 */
export function calculateSubnet (ip, cidr) {
  if (!isValidIPv4(ip)) {
    throw new Error('Dirección IP inválida')
  }

  if (cidr < 0 || cidr > 32) {
    throw new Error('CIDR debe estar entre 0 y 32')
  }

  // Calcular máscara de subred
  const subnetMask = cidrToSubnetMask(cidr)
  const subnetMaskInt = ipToInt(subnetMask)

  // Calcular dirección de red
  const ipInt = ipToInt(ip)
  const networkInt = ipInt & subnetMaskInt
  const networkAddress = intToIp(networkInt)

  // Calcular dirección de broadcast
  const wildcardMaskInt = ~subnetMaskInt & 0xFFFFFFFF
  const broadcastInt = networkInt | wildcardMaskInt
  const broadcastAddress = intToIp(broadcastInt)

  // Calcular primera y última IP utilizable
  const firstUsableInt = networkInt + 1
  const lastUsableInt = broadcastInt - 1
  const firstUsable = cidr === 32 ? networkAddress : intToIp(firstUsableInt)
  const lastUsable = cidr === 32 ? networkAddress : intToIp(lastUsableInt)

  // Calcular wildcard mask
  const wildcardMask = intToIp(wildcardMaskInt)

  // Calcular número de hosts
  const totalHosts = Math.pow(2, 32 - cidr)
  const usableHosts = cidr === 32 ? 1 : Math.max(0, totalHosts - 2)

  // Información de la máscara en binario
  const subnetMaskBinary = ipToBinaryDotted(subnetMask)
  const wildcardMaskBinary = ipToBinaryDotted(wildcardMask)

  // Calcular clase de la red
  const firstOctet = parseInt(ip.split('.')[0], 10)
  let networkClass = 'N/A'
  if (firstOctet >= 1 && firstOctet <= 126) networkClass = 'A'
  else if (firstOctet >= 128 && firstOctet <= 191) networkClass = 'B'
  else if (firstOctet >= 192 && firstOctet <= 223) networkClass = 'C'
  else if (firstOctet >= 224 && firstOctet <= 239) networkClass = 'D (Multicast)'
  else if (firstOctet >= 240 && firstOctet <= 255) networkClass = 'E (Experimental)'

  // Determinar si es privada
  const octets = ip.split('.').map(Number)
  const isPrivate = (
    (octets[0] === 10) ||
    (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) ||
    (octets[0] === 192 && octets[1] === 168)
  )

  return {
    inputIp: ip,
    cidr,
    networkAddress,
    broadcastAddress,
    subnetMask,
    subnetMaskBinary,
    wildcardMask,
    wildcardMaskBinary,
    firstUsable,
    lastUsable,
    totalHosts,
    usableHosts,
    networkClass,
    isPrivate,
    ipRange: `${firstUsable} - ${lastUsable}`,
    notation: `${networkAddress}/${cidr}`
  }
}

/**
 * Divide una red en subredes más pequeñas
 * @param {string} networkIp - Dirección de red base
 * @param {number} currentCidr - CIDR actual de la red
 * @param {number} newCidr - Nuevo CIDR para las subredes
 * @returns {Array} Array de objetos con información de cada subred
 */
export function subdivideNetwork (networkIp, currentCidr, newCidr) {
  if (newCidr <= currentCidr) {
    throw new Error('El nuevo CIDR debe ser mayor que el actual')
  }

  const subnets = []
  const numberOfSubnets = Math.pow(2, newCidr - currentCidr)
  const hostsPerSubnet = Math.pow(2, 32 - newCidr)

  const baseInt = ipToInt(networkIp)

  for (let i = 0; i < numberOfSubnets; i++) {
    const subnetInt = baseInt + (i * hostsPerSubnet)
    const subnetIp = intToIp(subnetInt)
    const subnetInfo = calculateSubnet(subnetIp, newCidr)
    subnets.push({
      index: i + 1,
      ...subnetInfo
    })
  }

  return subnets
}

/**
 * Verifica si una IP pertenece a una subred
 * @param {string} ip - Dirección IP a verificar
 * @param {string} networkAddress - Dirección de red
 * @param {number} cidr - CIDR de la subred
 * @returns {boolean} true si la IP pertenece a la subred
 */
export function ipBelongsToSubnet (ip, networkAddress, cidr) {
  if (!isValidIPv4(ip) || !isValidIPv4(networkAddress)) {
    return false
  }

  const subnetInfo = calculateSubnet(networkAddress, cidr)
  const ipInt = ipToInt(ip)
  const networkInt = ipToInt(subnetInfo.networkAddress)
  const broadcastInt = ipToInt(subnetInfo.broadcastAddress)

  return ipInt >= networkInt && ipInt <= broadcastInt
}

/**
 * Obtiene sugerencias de división de subred según número de hosts necesarios
 * @param {number} requiredHosts - Número de hosts requeridos
 * @returns {Array} Array de opciones de CIDR con información
 */
export function suggestSubnetForHosts (requiredHosts) {
  const suggestions = []

  for (let cidr = 30; cidr >= 1; cidr--) {
    const usableHosts = Math.pow(2, 32 - cidr) - 2
    if (usableHosts >= requiredHosts) {
      suggestions.push({
        cidr,
        subnetMask: cidrToSubnetMask(cidr),
        usableHosts,
        totalHosts: usableHosts + 2,
        efficiency: ((requiredHosts / usableHosts) * 100).toFixed(2) + '%'
      })
    }
  }

  return suggestions
}
