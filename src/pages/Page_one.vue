<template>
  <div class="container">
    <h1 class="title">Conversor de Direcciones IP</h1>
    <p class="subtitle">Transforma IPv4 a IPv6 y viceversa fácilmente</p>

    <div class="form-group">
      <input
        id="ip-input"
        class="input"
        type="text"
        v-model="ipInput"
        placeholder="Ingresa una dirección IPv4 o IPv6"
      />
      <p class="helper-text">
        Ejemplo IPv4: 192.168.0.1 | Ejemplo IPv6: ::ffff:240.0.0.1
      </p>
    </div>

    <div class="buttons">
      <button class="button ipv6" @click="convertToIPv6">
        Convertir a IPv6
      </button>
      <button class="button ipv4" @click="convertToIPv4">
        Convertir a IPv4
      </button>
      <button class="button clear" @click="clearMessages">Limpiar</button>
    </div>

    <transition name="fade">
      <div v-if="errorMessage" class="alert alert-error">
        {{ errorMessage }}
      </div>
    </transition>

    <transition name="fade">
      <div v-if="conversionResult" class="alert alert-success">
        <h3>Resultado:</h3>
        <p><strong>Entrada:</strong> {{ ipInput }}</p>
        <p v-if="conversionResult.ipv6Mapped">
          <strong>IPv6 Mapeado:</strong> {{ conversionResult.ipv6Mapped }}
        </p>
        <p v-if="conversionResult.expanded">
          <strong>Forma Expandida:</strong> {{ conversionResult.expanded }}
        </p>
        <p v-if="conversionResult.compressed">
          <strong>Forma Comprimida:</strong> {{ conversionResult.compressed }}
        </p>
        <p v-if="conversionResult.ipv4Restored">
          <strong>IPv4 Restaurado:</strong> {{ conversionResult.ipv4Restored }}
        </p>
      </div>
    </transition>

    <div class="info-box">
      <h4>ℹ️ Información sobre IP</h4>
      <p>
        <strong>IPv4:</strong> Usa 32 bits (cuatro octetos) y está limitado a
        unos 4.294.967.296 valores únicos. Se representa como cuatro números
        decimales separados por puntos (por ejemplo, 192.168.0.1).
      </p>
      <p>
        <strong>IPv6:</strong> Usa 128 bits, ofreciendo más de 340 undecillones
        de direcciones. Se representa en 8 grupos de 4 dígitos hexadecimales
        separados por dos puntos (por ejemplo, 2001:0db8::1).
      </p>
      <p>
        <strong>Mapeo:</strong> Las direcciones IPv4 pueden representarse dentro
        del espacio IPv6 usando el formato ::ffff:IPv4.
      </p>
      <p>
        <strong>Compatibilidad:</strong> IPv6 fue diseñado para reemplazar IPv4,
        solucionando su escasez y mejorando la eficiencia del enrutamiento y la
        seguridad.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IPConverter',
  data () {
    return {
      ipInput: '',
      conversionResult: null,
      errorMessage: ''
    }
  },
  methods: {
    validateIPv4 (ip) {
      const parts = ip.split('.')
      if (parts.length !== 4) {
        return { valid: false, error: 'Debe contener 4 bloques.' }
      }
      for (let i = 0; i < parts.length; i++) {
        const num = Number(parts[i])
        if (isNaN(num) || num < 0 || num > 255) {
          return {
            valid: false,
            error: `Bloque ${i + 1} (${parts[i]}) es inválido.`
          }
        }
      }
      return { valid: true }
    },
    validateIPv6 (ip) {
      try {
        const segments = ip.split(':')
        if (segments.length < 3) {
          return { valid: false, error: 'La dirección no parece ser IPv6.' }
        }
        return { valid: true }
      } catch (e) {
        return { valid: false, error: 'IPv6 inválida.' }
      }
    },
    convertToIPv6 () {
      this.errorMessage = ''
      this.conversionResult = null

      const ip = this.ipInput.trim()
      const validation = this.validateIPv4(ip)

      if (!validation.valid) {
        this.errorMessage = validation.error
        return
      }

      const parts = ip
        .split('.')
        .map((p) => parseInt(p).toString(16).padStart(2, '0'))

      const ipv6Mapped = `::ffff:${ip}`
      const expanded = `0000:0000:0000:0000:0000:ffff:${parts[0]}${parts[1]}:${parts[2]}${parts[3]}`
      const compressed = `::ffff:${parts[0]}${parts[1]}:${parts[2]}${parts[3]}`

      this.conversionResult = {
        ipv6Mapped,
        expanded,
        compressed
      }
    },
    convertToIPv4 () {
      this.errorMessage = ''
      this.conversionResult = null

      const ip = this.ipInput.trim()
      const validation = this.validateIPv6(ip)
      if (!validation.valid) {
        this.errorMessage = validation.error
        return
      }

      // Intentar extraer los últimos 32 bits de la dirección IPv6 si es posible
      try {
        const lastSegment = ip.split(':').slice(-2).join(':')
        const hex = lastSegment.replace(/[^a-fA-F0-9]/g, '')

        if (hex.length === 8) {
          const ipv4 = `${parseInt(hex.substring(0, 2), 16)}.${parseInt(
            hex.substring(2, 4),
            16
          )}.${parseInt(hex.substring(4, 6), 16)}.${parseInt(
            hex.substring(6, 8),
            16
          )}`
          this.conversionResult = {
            ipv4Restored: ipv4
          }
        } else {
          this.errorMessage = 'No se pudo detectar una conversión directa válida desde esta IPv6.'
        }
      } catch (e) {
        this.errorMessage = 'Error procesando la dirección IPv6.'
      }
    },
    clearMessages () {
      this.conversionResult = null
      this.errorMessage = ''
      this.ipInput = ''
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.container {
  max-width: 850px;
  margin: 40px auto;
  padding: 30px;
  text-align: center;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
}
.title {
  font-size: 3.6rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 10px;
}
.subtitle {
  color: #e0e0e0;
  margin-bottom: 25px;
}
.form-group {
  margin-bottom: 20px;
}
.input {
  width: 100%;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  text-align: center;
}
.helper-text {
  margin-top: 5px;
  font-size: 0.9rem;
  font-weight: 500;
  padding-bottom: 20px;
  padding-top: 5px;
  color: #f0f0f0;
}
.buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}
.button {
  flex: 1;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  color: #fff;
  transition: all 0.3s ease;
}
.button.ipv6 {
  background-color: #10b981;
}
.button.ipv6:hover {
  background-color: #059669;
}
.button.ipv4 {
  background-color: #3b82f6;
}
.button.ipv4:hover {
  background-color: #2563eb;
}
.button.clear {
  background-color: #a78bfa;
}
.button.clear:hover {
  background-color: #7c3aed;
}
.alert {
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  font-size: 1rem;
  text-align: left;
}
.alert-success {
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #10b981;
  text-align: center;
}
.alert-error {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #ef4444;
}
.info-box {
  margin-top: 20px;
  background: #eef2ff;
  padding: 50px;
  border-left: 6px solid #6366f1;
  border-radius: 40px;
  text-align: center;
  color: #1e293b;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
