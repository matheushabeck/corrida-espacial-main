// FORÇA O SCROLL SUAVE - Implementação robusta que funciona em qualquer situação

function forceScrollTo(targetElement, duration = 1500) {
  console.log("Iniciando scroll suave forçado...")

  if (!targetElement) {
    console.error("Elemento não encontrado!")
    return
  }

  const startPosition = window.pageYOffset || document.documentElement.scrollTop
  const targetPosition = targetElement.offsetTop - 50 // 50px de margem do topo
  const distance = targetPosition - startPosition
  let startTime = null

  console.log(`Posição inicial: ${startPosition}, Posição alvo: ${targetPosition}, Distância: ${distance}`)

  function smoothStep(start, end, point) {
    if (point <= 0) return start
    if (point >= 1) return end
    return start + (end - start) * point * point * (3.0 - 2.0 * point)
  }

  function animationStep(currentTime) {
    if (startTime === null) {
      startTime = currentTime
    }

    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)

    const currentPosition = smoothStep(startPosition, targetPosition, progress)

    // Força o scroll usando múltiplos métodos
    window.scrollTo(0, currentPosition)
    document.documentElement.scrollTop = currentPosition
    document.body.scrollTop = currentPosition

    if (progress < 1) {
      requestAnimationFrame(animationStep)
    } else {
      console.log("Scroll suave concluído!")
    }
  }

  requestAnimationFrame(animationStep)
}

function scrollToVideo() {
  console.log('Botão "Começar Jornada" clicado - Scroll um pouco para baixo')

  // Previne qualquer comportamento padrão
  event.preventDefault()
  event.stopPropagation()

  // Scroll de apenas meio viewport (metade da tela) para baixo
  const scrollAmount = window.innerHeight * 1 // 50% da altura da tela
  const currentPosition = window.pageYOffset || document.documentElement.scrollTop
  const targetPosition = currentPosition + scrollAmount

  // Cria um elemento virtual para usar a função de scroll suave
  const virtualTarget = {
    offsetTop: targetPosition,
  }

  // Usa a função de scroll suave existente
  forceScrollTo(virtualTarget, 1200) // Duração um pouco menor para ser mais rápido
}

function scrollToTimeline() {
  console.log('Botão "Ver Linha do Tempo" clicado')

  // Previne qualquer comportamento padrão
  event.preventDefault()
  event.stopPropagation()

  const timelineSection = document.querySelector(".container-linha-tempo")

  if (!timelineSection) {
    console.error("Seção timeline não encontrada!")
    return
  }

  // Força o scroll customizado
  forceScrollTo(timelineSection, 1500)
}

function expandirEvento(elemento) {
  elemento.classList.toggle("expandido")
  const botao = elemento.querySelector(".botao-expandir")
  if (elemento.classList.contains("expandido")) {
    botao.textContent = "Ver menos detalhes"
  } else {
    botao.textContent = "Ver mais detalhes"
  }
}

// Animação de entrada dos eventos
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.style.animationPlayState = "running"
    }
  })
})

document.querySelectorAll(".evento-linha-tempo").forEach((evento) => {
  observador.observe(evento)
})

// Animações da capa
document.addEventListener("DOMContentLoaded", () => {
  console.log("Página carregada - Inicializando animações...")

  // Remove qualquer configuração que possa interferir no scroll
  document.documentElement.style.scrollBehavior = "auto"
  document.body.style.scrollBehavior = "auto"

  // Animação das estrelas
  createStars()

  // Animação dos elementos flutuantes
  animateFloatingElements()

  console.log("Scroll suave customizado ativado!")
})

function createStars() {
  const starsContainer = document.querySelector(".estrelas")
  if (!starsContainer) return

  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div")
    star.className = "estrela"
    star.style.left = Math.random() * 100 + "%"
    star.style.top = Math.random() * 100 + "%"
    star.style.animationDelay = Math.random() * 3 + "s"
    starsContainer.appendChild(star)
  }
}

function animateFloatingElements() {
  const astronauta = document.querySelector(".astronauta-flutuando")
  const satelite = document.querySelector(".satelite-orbita")
  const foguete = document.querySelector(".foguete-lancamento")

  if (!astronauta || !satelite || !foguete) return

  setInterval(() => {
    astronauta.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 20}px)`
    satelite.style.transform = `rotate(${Date.now() * 0.05}deg) translateX(50px)`
    foguete.style.transform = `translateY(${Math.cos(Date.now() * 0.002) * 15}px)`
  }, 50)
}

// Debug: Adiciona logs para verificar se os elementos existem
window.addEventListener("load", () => {
  console.log("=== DEBUG INFO ===")
  console.log("Seção de vídeo encontrada:", !!document.querySelector(".secao-video"))
  console.log("Seção timeline encontrada:", !!document.querySelector(".container-linha-tempo"))
  console.log("Botões encontrados:", document.querySelectorAll("button").length)
  console.log("==================")
})
