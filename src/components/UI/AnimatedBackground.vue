<template>
  <div class="animated-network-background">
    <!-- Gradiente animado base -->
    <div class="gradient-background"></div>

    <!-- Grid de nodos de red -->
    <svg class="network-grid" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
      <!-- Nodos principales -->
      <g class="nodes">
        <circle v-for="node in nodes" :key="node.id" :cx="node.x" :cy="node.y" :r="node.size" class="node">
          <animate
            attributeName="r"
            :values="`${node.size};${node.size + 3};${node.size}`"
            :dur="`${node.speed}s`"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.8;0.3"
            :dur="`${node.speed}s`"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      <!-- Conexiones entre nodos -->
      <g class="connections">
        <line
          v-for="connection in connections"
          :key="connection.id"
          :x1="connection.x1"
          :y1="connection.y1"
          :x2="connection.x2"
          :y2="connection.y2"
          class="connection-line"
        >
          <animate
            attributeName="stroke-opacity"
            values="0.1;0.4;0.1"
            :dur="`${connection.speed}s`"
            repeatCount="indefinite"
          />
        </line>
      </g>

      <!-- Pulsos de datos viajando -->
      <g class="data-pulses">
        <circle
          v-for="pulse in pulses"
          :key="pulse.id"
          :r="pulse.size"
          class="pulse"
        >
          <animateMotion
            :path="pulse.path"
            :dur="`${pulse.duration}s`"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;0"
            :dur="`${pulse.duration}s`"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>

    <!-- Partículas flotantes -->
    <div class="particles">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="{
          left: particle.x + '%',
          top: particle.y + '%',
          animationDuration: particle.duration + 's',
          animationDelay: particle.delay + 's'
        }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Generador de nodos de red
const nodes = ref([])
const connections = ref([])
const pulses = ref([])
const particles = ref([])

const generateNodes = () => {
  const nodeCount = 20
  const nodeArray = []

  for (let i = 0; i < nodeCount; i++) {
    nodeArray.push({
      id: `node-${i}`,
      x: Math.random() * 1000,
      y: Math.random() * 1000,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 3 + 2
    })
  }

  nodes.value = nodeArray
  generateConnections(nodeArray)
  generatePulses(nodeArray)
}

const generateConnections = (nodeArray) => {
  const connectionArray = []
  const maxDistance = 300

  for (let i = 0; i < nodeArray.length; i++) {
    for (let j = i + 1; j < nodeArray.length; j++) {
      const dx = nodeArray[i].x - nodeArray[j].x
      const dy = nodeArray[i].y - nodeArray[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < maxDistance) {
        connectionArray.push({
          id: `conn-${i}-${j}`,
          x1: nodeArray[i].x,
          y1: nodeArray[i].y,
          x2: nodeArray[j].x,
          y2: nodeArray[j].y,
          speed: Math.random() * 4 + 3
        })
      }
    }
  }

  connections.value = connectionArray
}

const generatePulses = (nodeArray) => {
  const pulseArray = []

  for (let i = 0; i < 10; i++) {
    const node1 = nodeArray[Math.floor(Math.random() * nodeArray.length)]
    const node2 = nodeArray[Math.floor(Math.random() * nodeArray.length)]

    if (node1 !== node2) {
      pulseArray.push({
        id: `pulse-${i}`,
        path: `M ${node1.x} ${node1.y} L ${node2.x} ${node2.y}`,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 5 + 3
      })
    }
  }

  pulses.value = pulseArray
}

const generateParticles = () => {
  const particleArray = []

  for (let i = 0; i < 30; i++) {
    particleArray.push({
      id: `particle-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    })
  }

  particles.value = particleArray
}

onMounted(() => {
  generateNodes()
  generateParticles()
})
</script>

<style scoped>
.animated-network-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

/* Gradiente base animado */
.gradient-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* Static background - no animation */
  background: #0f172a;
}

/* Removed distracting gradient animation */

/* SVG Network Grid */
.network-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.08; /* Very low opacity - subtle background */
}

.node {
  fill: #06b6d4;
  opacity: 0.3;
}

.connection-line {
  stroke: #06b6d4;
  stroke-width: 1;
  stroke-opacity: 0.1;
}

.pulse {
  fill: #06b6d4;
  opacity: 0.4;
}

/* Partículas flotantes - removed for better readability */
.particles {
  display: none; /* Hide distracting particles */
}

/* Modo oscuro - fondo profesional */
body.body--dark .gradient-background {
  background: #0f172a; /* Professional deep slate blue */
}
</style>
