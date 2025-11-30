/**
 * Utilidades para manejo y conversión de direcciones IP
 * @module ipUtils
 */

/**
 * Valida si una cadena es una dirección IPv4 válida
 * @param {string} ip - Dirección IP a validar
 * @returns {boolean} true si es válida, false en caso contrario
 */
export function isValidIPv4 (ip) {
  const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return ipv4Pattern.test(ip)
}

/**
 * Valida si una cadena es una dirección IPv6 válida
 * @param {string} ip - Dirección IP a validar
 * @returns {boolean} true si es válida, false en caso contrario
 */
export function isValidIPv6 (ip) {
  const ipv6Pattern = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/
  return ipv6Pattern.test(ip)
}

/**
 * Convierte un octeto decimal a binario (8 bits)
 * @param {number} decimal - Número decimal (0-255)
 * @returns {string} Representación binaria de 8 bits
 */
export function decimalToBinary (decimal) {
  return parseInt(decimal, 10).toString(2).padStart(8, '0')
}

/**
 * Convierte un octeto decimal a hexadecimal (2 dígitos)
 * @param {number} decimal - Número decimal (0-255)
 * @returns {string} Representación hexadecimal de 2 dígitos
 */
export function decimalToHex (decimal) {
  return parseInt(decimal, 10).toString(16).padStart(2, '0').toUpperCase()
}

/**
 * Convierte una dirección IPv4 a formato binario completo
 * @param {string} ipv4 - Dirección IPv4 en formato decimal
 * @returns {string} Dirección IPv4 en formato binario (puntos separados)
 */
export function ipv4ToBinary (ipv4) {
  if (!isValidIPv4(ipv4)) {
    throw new Error('Dirección IPv4 inválida')
  }
  const octets = ipv4.split('.')
  return octets.map(octet => decimalToBinary(octet)).join('.')
}

/**
 * Convierte una dirección IPv4 a formato hexadecimal
 * @param {string} ipv4 - Dirección IPv4 en formato decimal
 * @returns {string} Dirección IPv4 en formato hexadecimal
 */
export function ipv4ToHex (ipv4) {
  if (!isValidIPv4(ipv4)) {
    throw new Error('Dirección IPv4 inválida')
  }
  const octets = ipv4.split('.')
  return '0x' + octets.map(octet => decimalToHex(octet)).join('')
}

/**
 * Convierte una dirección IPv4 a IPv6 mapeada
 * @param {string} ipv4 - Dirección IPv4 en formato decimal
 * @returns {object} Objeto con diferentes formatos de IPv6
 */
export function ipv4ToIPv6Mapped (ipv4) {
  if (!isValidIPv4(ipv4)) {
    throw new Error('Dirección IPv4 inválida')
  }

  const octets = ipv4.split('.')
  const hexParts = octets.map(octet => parseInt(octet, 10).toString(16).padStart(2, '0'))

  // Formato comprimido: ::ffff:192.168.1.1
  const compressed = `::ffff:${ipv4}`

  // Formato expandido: 0000:0000:0000:0000:0000:ffff:c0a8:0101
  const expanded = `0000:0000:0000:0000:0000:ffff:${hexParts[0]}${hexParts[1]}:${hexParts[2]}${hexParts[3]}`

  // Formato mixto: ::ffff:c0a8:0101
  const mixed = `::ffff:${hexParts[0]}${hexParts[1]}:${hexParts[2]}${hexParts[3]}`

  return {
    compressed,
    expanded,
    mixed,
    original: ipv4
  }
}

/**
 * Convierte una dirección IPv6 mapeada de vuelta a IPv4
 * @param {string} ipv6 - Dirección IPv6 mapeada
 * @returns {string|null} Dirección IPv4 o null si no es IPv6 mapeada
 */
export function ipv6MappedToIPv4 (ipv6) {
  // Formato ::ffff:192.168.1.1
  const mixedMatch = ipv6.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/i)
  if (mixedMatch) {
    return mixedMatch[1]
  }

  // Formato ::ffff:c0a8:0101
  const hexMatch = ipv6.match(/::ffff:([0-9a-f]{4}):([0-9a-f]{4})$/i)
  if (hexMatch) {
    const hex1 = hexMatch[1]
    const hex2 = hexMatch[2]
    const octet1 = parseInt(hex1.substring(0, 2), 16)
    const octet2 = parseInt(hex1.substring(2, 4), 16)
    const octet3 = parseInt(hex2.substring(0, 2), 16)
    const octet4 = parseInt(hex2.substring(2, 4), 16)
    return `${octet1}.${octet2}.${octet3}.${octet4}`
  }

  return null
}

/**
 * Detecta automáticamente el tipo de IP (IPv4 o IPv6)
 * @param {string} ip - Dirección IP
 * @returns {string|null} 'ipv4', 'ipv6' o null si no es válida
 */
export function detectIpType (ip) {
  if (isValidIPv4(ip)) return 'ipv4'
  if (isValidIPv6(ip)) return 'ipv6'
  return null
}

/**
 * Expande una dirección IPv6 comprimida a su forma completa
 * @param {string} ipv6 - Dirección IPv6 (puede estar comprimida)
 * @returns {string} Dirección IPv6 expandida
 */
export function expandIPv6 (ipv6) {
  if (!isValidIPv6(ipv6)) {
    throw new Error('Dirección IPv6 inválida')
  }

  // Si contiene IPv4 embebido (::ffff:192.168.1.1)
  const ipv4Match = ipv6.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/i)
  if (ipv4Match) {
    const ipv4 = ipv4Match[1]
    const octets = ipv4.split('.').map(Number)
    const hexParts = octets.map(o => o.toString(16).padStart(2, '0'))
    const ipv4Hex = `${hexParts[0]}${hexParts[1]}:${hexParts[2]}${hexParts[3]}`
    ipv6 = `::ffff:${ipv4Hex}`
  }

  // Separar por '::'
  const parts = ipv6.split('::')

  if (parts.length === 1) {
    // No hay compresión
    const groups = parts[0].split(':')
    return groups.map(g => g.padStart(4, '0')).join(':')
  }

  // Hay compresión
  const leftParts = parts[0] ? parts[0].split(':') : []
  const rightParts = parts[1] ? parts[1].split(':') : []
  const missingGroups = 8 - leftParts.length - rightParts.length

  const expanded = [
    ...leftParts.map(p => p.padStart(4, '0')),
    ...Array(missingGroups).fill('0000'),
    ...rightParts.map(p => p.padStart(4, '0'))
  ]

  return expanded.join(':')
}

/**
 * Convierte una dirección IPv6 a formato binario completo
 * @param {string} ipv6 - Dirección IPv6
 * @returns {string} Dirección IPv6 en formato binario separado por ':'
 */
export function ipv6ToBinary (ipv6) {
  if (!isValidIPv6(ipv6)) {
    throw new Error('Dirección IPv6 inválida')
  }

  const expanded = expandIPv6(ipv6)
  const groups = expanded.split(':')

  return groups.map(group => {
    const decimal = parseInt(group, 16)
    return decimal.toString(2).padStart(16, '0')
  }).join(':')
}

/**
 * Convierte una dirección IPv6 a formato hexadecimal expandido
 * @param {string} ipv6 - Dirección IPv6
 * @returns {string} Dirección IPv6 en formato hexadecimal expandido
 */
export function ipv6ToHex (ipv6) {
  if (!isValidIPv6(ipv6)) {
    throw new Error('Dirección IPv6 inválida')
  }

  const expanded = expandIPv6(ipv6)
  return expanded.toUpperCase()
}

/**
 * Obtiene información detallada de una dirección IP
 * @param {string} ip - Dirección IP
 * @returns {object} Información detallada de la IP
 */
export function getIpInfo (ip) {
  const isV4 = isValidIPv4(ip)
  const isV6 = isValidIPv6(ip)

  const info = {
    original: ip,
    version: isV4 ? 4 : isV6 ? 6 : null,
    isValid: isV4 || isV6,
    isPrivate: false,
    isLoopback: false,
    class: null,
    type: null
  }

  if (isV4) {
    const octets = ip.split('.').map(Number)
    const firstOctet = octets[0]

    // Determinar clase de IP
    if (firstOctet >= 1 && firstOctet <= 126) {
      info.class = 'A'
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      info.class = 'B'
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      info.class = 'C'
    } else if (firstOctet >= 224 && firstOctet <= 239) {
      info.class = 'D (Multicast)'
    } else if (firstOctet >= 240 && firstOctet <= 255) {
      info.class = 'E (Experimental)'
    }

    // Verificar si es privada
    info.isPrivate = (
      (firstOctet === 10) ||
      (firstOctet === 172 && octets[1] >= 16 && octets[1] <= 31) ||
      (firstOctet === 192 && octets[1] === 168)
    )

    // Verificar si es loopback
    info.isLoopback = (firstOctet === 127)

    // Tipo de red
    if (info.isLoopback) {
      info.type = 'Loopback'
    } else if (info.isPrivate) {
      info.type = 'Privada'
    } else {
      info.type = 'Pública'
    }
  }

  if (isV6) {
    const lowerIp = ip.toLowerCase()

    // IPv6 mapeada IPv4
    if (lowerIp.includes('::ffff:')) {
      info.type = 'IPv4-Mapeada'
    } else if (lowerIp.startsWith('fe80:')) {
      info.type = 'Link-Local'
    } else if (lowerIp.startsWith('::1')) {
      info.type = 'Loopback'
      info.isLoopback = true
    } else if (lowerIp.startsWith('fc') || lowerIp.startsWith('fd')) {
      info.type = 'Privada (ULA)'
      info.isPrivate = true
    } else if (lowerIp.startsWith('ff')) {
      info.type = 'Multicast'
    } else {
      info.type = 'Global Unicast'
    }
  }

  return info
}
