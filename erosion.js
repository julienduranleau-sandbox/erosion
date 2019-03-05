const size = { width: 600, height: 600 }
const detail = { x: 256, y: 256 }

const heightData = generateHeight(detail.x, detail.y)

const renderer = new Renderer(document.body, size, detail)
renderer.applyHeightData(heightData)

renderer.applyHeightData(heightData)
renderer.render()

erode(heightData)

setTimeout(() => {
  renderer.applyHeightData(heightData)
  renderer.render()
}, 1000)

function generateHeight(width, height) {
  const noiseSpread = 0.008
  const amplitude = 175
  const data = new Float32Array(width * height)

  for (let i = 0, len = width * height; i < len; i++) {
    const x = i % width
    const y = Math.floor(i / width)

    data[i] = map(noise(x * noiseSpread, y * noiseSpread), 0, 1, 0, amplitude)
  }

  return data;
}

function erode(data) {
  const d = new Droplet(50, 50, heightData)
  d.simulate()
}

class Droplet {
  constructor(x, y, heightData) {
    this.x = x
    this.y = y
    this.heightData = heightData
    this.vx = 0
    this.vy = 0
    this.carry = 0
    this.water = 1
  }

  simulate() {
    while (this.water > 0) {
      this.water -= 0.02 // evaporation
    }
  }
}
