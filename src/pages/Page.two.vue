<template>
  <div>
    <!-- Scroll Progress Bar -->
    <div id="scroll-progress"></div>

    <!-- NAVBAR -->
    <header class="navbar">
      <logo-doraemon />
      <div class="logo">UESAN</div>
    </header>

    <!-- PRIMER CONTENEDOR -->
    <section class="hero">
      <div class="yellow-box">
        <img :src="primerGif" alt="Mi animación" class="yellow-box__gif" />
        <!-- Va a Page_one.vue -->
        <router-link to="/page-one" class="btn-listen">Convertir</router-link>
      </div>
      <div class="hero-right">
        <h1>CONVERTIR IPV4 A IPV6</h1>
        <p>
          Esta herramienta transforma direcciones IPv4 tradicionales en su
          representación IPv6 equivalente, aplicando el formato IPv4-mapped,
          preservando compatibilidad, expandiendo espacio de red y facilitando
          la adopción del protocolo de próxima generación.
        </p>
        <a
          href="https://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html"
          class="btn-spotify"
          target="_blank"
          rel="noopener"
        >
          Conocer más
        </a>
      </div>
    </section>

    <!-- Wave Separator with neon animation -->
    <div class="wave">
      <svg viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path
          class="wave-path"
          d="M0,30 C300,100 900,0 1200,30 L1200,100 L0,100 Z"
        />
      </svg>
    </div>

    <!-- SEGUNDO CONTENEDOR -->
    <section class="hero-second">
      <div class="hero-right">
        <h1>GENERADOR DE SUBREDES</h1>
        <p>
          Genera automáticamente subredes óptimas: calcula máscara, rango de
          hosts, direcciones broadcast y wildcard, mostrando asignación
          eficiente de bloques para planificar redes internas IPv4 e IPv6.
        </p>
        <a
          href="https://study-ccna.com/subnetting-explained/"
          class="btn-spotify"
          target="_blank"
          rel="noopener"
        >
          Conocer más
        </a>
      </div>
      <div class="yellow-box">
        <img :src="segundoGif" alt="Mi animación" class="yellow-box__gif" />
        <!-- Va a Page_two.vue -->
        <router-link to="/page-two" class="btn-listen">Generar</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import primerGif from '../assets/primer.gif'
import segundoGif from '../assets/segundo.gif'
import LogoDoraemon from 'components/LogoDoraemon.vue'

export default {
  name: 'PrincipalPage',
  components: { LogoDoraemon },
  data () {
    return { primerGif, segundoGif }
  },
  mounted () {
    const prog = document.getElementById('scroll-progress')
    window.addEventListener('scroll', () => {
      const doc = document.documentElement
      const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100
      prog.style.width = pct + '%'
    })

    const hero = this.$el.querySelector('.hero')
    const maxOffset = 50
    window.addEventListener('scroll', () => {
      window.requestAnimationFrame(() => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop
        if (scrollY === 0) {
          hero.style.opacity = '1'
          hero.style.transform = 'translateY(0)'
          return
        }
        const rect = hero.getBoundingClientRect()
        const winH = window.innerHeight
        let prog = (winH - rect.top) / (winH + rect.height)
        prog = Math.min(Math.max(prog, 0), 1)
        hero.style.opacity = 1 - prog
        hero.style.transform = `translateY(${prog * maxOffset}px)`
      })
    })

    const heroSecond = this.$el.querySelector('.hero-second')
    const maxOffsetSecond = 50
    const heightSecond = heroSecond.getBoundingClientRect().height
    const onScrollSecond = () => {
      const rect = heroSecond.getBoundingClientRect()
      const winH = window.innerHeight
      const visibleHeight = Math.min(rect.bottom, winH) - Math.max(rect.top, 0)
      const ratio = Math.min(Math.max(visibleHeight / heightSecond, 0), 1)
      heroSecond.style.opacity = ratio
      heroSecond.style.transform = `translateY(${(1 - ratio) * maxOffsetSecond}px)`
    }
    window.addEventListener('scroll', () => window.requestAnimationFrame(onScrollSecond))
    onScrollSecond()

    this.$el.querySelectorAll('.yellow-box').forEach((box) => {
      box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const maxDeg = 15
        const dx = (x - cx) / cx
        const dy = (y - cy) / cy
        box.style.transform = `rotateX(${dy * maxDeg}deg) rotateY(${-dx * maxDeg}deg)`
      })
      box.addEventListener('mouseleave', () => {
        box.style.transform = 'rotateX(0deg) rotateY(0deg)'
      })
    })
  }
}
</script>

<style>
/* IMPORTAR FUENTE ORBITRON */
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap");

/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Variables */
:root {
  --bg: #0d0e17;
  --primary: #e31b6d;
  --text-light: #ffffff;
  --text-dark: #c0c0c0;
  --yellow-box: #1a1708;
  --title-hover: #ffce00;
  --text-hover: #1db954;
  --neon: #00eaff;
}

/* Gradient animated background */
body {
  background: linear-gradient(120deg, #0d0e17, #1a1c29, #0d0e17);
  background-size: 400% 400%;
  animation: hueShift 15s ease infinite;
  color: var(--text-light);
  font-family: sans-serif;
  padding-top: 60px;
}
@keyframes hueShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Scroll Progress Bar neon */
#scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 4px;
  background: var(--neon);
  box-shadow: 0 0 8px var(--neon), 0 0 16px var(--neon);
  z-index: 2000;
  transition: width 0.1s ease-out;
}

/* Wave Separator with neon border animation */
.wave {
  width: 100%;
  overflow: hidden;
  line-height: 0;
  margin-top: -4rem;
  margin-bottom: -1px;
}
.wave svg {
  display: block;
  width: 100%;
  height: 60px;
}
.wave-path {
  fill: var(--bg);
  stroke: var(--neon);
  stroke-width: 2;
  filter: drop-shadow(0 0 6px var(--neon)) drop-shadow(0 0 12px var(--neon));
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: neonFlow 3s linear infinite;
}
@keyframes neonFlow {
  to {
    stroke-dashoffset: 0;
  }
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--bg);
  z-index: 1000;
  height: 70px;
  line-height: 70px;
}
.navbar .logo {
  margin-left: 0.75rem;
  font-size: 1.25rem;
  font-weight: bold;
}

/* Hero containers */
.hero {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 3rem 1rem;
  gap: 3rem;
  min-height: 100vh;
  perspective: 1000px;
}
.hero-second {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem;
  gap: 3rem;
  opacity: 0;
  transform: translateY(50px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  perspective: 1000px;
}

/* Yellow boxes */
.yellow-box {
  position: relative;
  overflow: hidden;
  width: 450px;
  height: 550px;
  background-color: var(--yellow-box);
  border-radius: 8px;
  transform-style: preserve-3d;
  transition: transform 0.2s ease-out;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
.yellow-box__gif {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.btn-listen {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.6);
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}

/* Texto */
.hero-right {
  max-width: 500px;
  display: flex;
  flex-direction: column;
}

/* Encabezados TECH con gradiente animado */
.hero-right h1 {
  font-family: "Orbitron", sans-serif;
  font-size: 3rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, #00eaff, #ff0099, #00eaff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 5s ease infinite;
  transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}
.hero-right h1:hover {
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  color: var(--title-hover);
}
@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Párrafo y botones */
.hero-right p {
  font-size: 1.25rem;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
  transition: color 0.3s ease;
}
.hero-right p:hover {
  color: var(--text-hover);
}

.btn-spotify {
  margin-top: auto;
  display: inline-block;
  text-align: center;
  background-color: var(--primary);
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}

/* Neón y reflejo en botones */
.btn-listen,
.btn-spotify {
  color: var(--neon);
  padding: 10px 30px;
  font-size: 1.35rem;
}
.btn-listen:hover,
.btn-spotify:hover {
  background-color: var(--neon);
  color: #050801;
  box-shadow: 0 0 5px var(--neon), 0 0 25px var(--neon), 0 0 50px var(--neon),
    0 0 300px var(--neon);
  -webkit-box-reflect: above 1px linear-gradient(transparent, #0005);
}

/* Ocultar scrollbar nativo (derecho) sin afectar #scroll-progress */
html {
  scrollbar-width: none;
}
html::-webkit-scrollbar {
  width: 0;
  background: transparent;
}
</style>
