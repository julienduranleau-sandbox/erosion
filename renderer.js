class Renderer {

  constructor(container, size, detail) {
    this.camera = null
    this.scene = null
    this.renderer = null
    this.mesh = null
    this.lights = null
    this.container = null
    this.size = null
    this.detail = null

    this.init(container, size, detail)
  }

  init(container, size, detail) {
    this.container = container
    this.size = size
    this.detail = detail

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000)
    this.camera.position.y = 200
    this.camera.position.z = 100
    this.rotateAroundWorldAxis(this.camera, new THREE.Vector3(1,0,0), -45 * Math.PI / 180)

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xbfd1e5)

    this.lights = this.addLights()
    this.mesh = this.addMesh()

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.size.width, this.size.height)

    this.container.appendChild(this.renderer.domElement)
  }

  addLights() {
    const lights = []
    lights[0] = new THREE.PointLight(0xffffff, 1, 0)
    lights[1] = new THREE.PointLight(0xffffff, 1, 0)
    lights[2] = new THREE.PointLight(0xffffff, 1, 0)

    lights[0].position.set(0, 200, 0)
    lights[1].position.set(100, 200, 100)
    lights[2].position.set(-100, -200, -100)

    for (let i = lights.length - 1; i >= 0; i--) {
      this.scene.add(lights[i])
    }

    return lights
  }

  addMesh() {
    const geometry = new THREE.PlaneBufferGeometry(100, 100, this.detail.x - 1, this.detail.y - 1)
    geometry.rotateX(-Math.PI / 2)

    const meshMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, emissive: 0x444444, side: THREE.DoubleSide, flatShading: true })
    const mesh = new THREE.Mesh(geometry, meshMaterial)

    this.scene.add(mesh)

    return mesh
  }

  applyHeightData(data) {
    var vertices = this.mesh.geometry.attributes.position.array;

    for (var i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {
      vertices[j + 1] = data[i]
    }

    this.mesh.geometry.attributes.position.needsUpdate = true
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  animate() {
    requestAnimationFrame(this.animate)
    this.render()
  }

  rotateAroundWorldAxis(object, axis, radians) {
    const rotWorldMatrix = new THREE.Matrix4()
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians)
    rotWorldMatrix.multiply(object.matrix) // pre-multiply
    object.matrix = rotWorldMatrix
    object.rotation.setFromRotationMatrix(object.matrix)
  }
}

