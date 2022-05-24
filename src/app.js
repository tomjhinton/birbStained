import './style.scss'
import * as THREE from 'three'
// import * as dat from 'lil-gui'
import gsap from 'gsap'
import * as Tone from 'tone'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

import fragmentShader1 from './shaders/fragment1.glsl'
import fragmentShader2 from './shaders/fragment2.glsl'
import fragmentShader3 from './shaders/fragment3.glsl'
import fragmentShader4 from './shaders/fragment4.glsl'
import fragmentShader5 from './shaders/fragment5.glsl'


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'



import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


import Slayer from './slayer.json'

const now = Tone.now()
const currentMidi = Slayer
const synths = []
let notPlaying = true
const freeverb = new Tone.Freeverb().toDestination()
freeverb.dampening = 500
const vol = new Tone.Volume(-22).toDestination()
document.querySelector('#titular').addEventListener('click', (e) => {

  if(churchMaterial.map === churchTexture){
    churchMaterial.map = churchTexture2
    document.body.style.backgroundColor = "red";
    document.querySelector('#devil').style.visibility = 'visible'
  } else if (churchMaterial.map === churchTexture2){
    churchMaterial.map = churchTexture
    document.body.style.backgroundColor = "white";
    document.querySelector('#devil').style.visibility = 'hidden'
  }

  if (notPlaying && currentMidi) {
    notPlaying = false
    const now = Tone.now() + 0.5
    currentMidi.tracks.forEach((track) => {
      //create a synth for each track
      const synth = new Tone.PolySynth(Tone.FMSynth, {
        envelope: {
          attack: 0.02,
          decay: 0.1,
          sustain: 0.3,
          release: 1
        }
      }).toDestination()
      console.log(synth)
      synth.connect(freeverb)
      synth.connect(vol)
      synths.push(synth)
      //schedule all of the events
      track.notes.forEach((note) => {
        synth.triggerAttackRelease(
          note.name,
          note.duration,
          note.time + now,
          note.velocity
        )
      })
    })
  } else {
    //dispose the synth and make a new one
    while (synths.length) {
      const synth = synths.shift()
      synth.disconnect()
    }
    notPlaying = true
  }
})



const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()


const loadingBarElement = document.querySelector('.loading-bar')
const loadingBarText = document.querySelector('.loading-bar-text')
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () =>{
    window.setTimeout(() =>{
      gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 5, value: 0, delay: 2 })

      loadingBarElement.classList.add('ended')
      loadingBarElement.style.transform = ''

      loadingBarText.classList.add('fade-out')

    }, 500)
  },

  // Progress
  (itemUrl, itemsLoaded, itemsTotal) =>{
    const progressRatio = itemsLoaded / itemsTotal
    loadingBarElement.style.transform = `scaleX(${progressRatio})`

  }
)

const gtlfLoader = new GLTFLoader(loadingManager)

const textureLoader = new THREE.TextureLoader(loadingManager)

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
  depthWrite: false,
  uniforms:
    {
      uAlpha: { value: 1 }
    },
  transparent: true,
  vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
  fragmentShader: `
  uniform float uAlpha;
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})

const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

console.log(overlay)


//Models

const churchTexture = textureLoader.load('bakedC5.jpg')

churchTexture.flipY = false
churchTexture.encoding = THREE.sRGBEncoding


const churchTexture2 = textureLoader.load('bakedC3.jpg')

churchTexture2.flipY = false
churchTexture2.encoding = THREE.sRGBEncoding






const churchMaterial = new THREE.MeshBasicMaterial({ map: churchTexture,
  side: THREE.FrontSide})




  const shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    depthWrite: true,
    clipShadows: true,
    wireframe: false,
    side: THREE.DoubleSide,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(10, 5)
      },
      uTime: {
        value: 0
      },
      uValueA: {
        value: .5
      },
      uValueB: {
        value: .5
      },
      uValueC: {
        value: .5
      },
      uValueD: {
        value: 9
      }
    }
  })

  const shaderMaterial1 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader1,
    transparent: true,
    depthWrite: true,
    clipShadows: true,
    wireframe: false,
    side: THREE.DoubleSide,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(10, 5)
      },
      uTime: {
        value: 0
      },
      uValueA: {
        value: .5
      },
      uValueB: {
        value: .5
      },
      uValueC: {
        value: .5
      },
      uValueD: {
        value: 9
      }
    }
  })

  const shaderMaterial2 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader2,
    transparent: true,
    depthWrite: true,
    clipShadows: true,
    wireframe: false,
    side: THREE.DoubleSide,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(10, 5)
      },
      uTime: {
        value: 0
      },
      uValueA: {
        value: .5
      },
      uValueB: {
        value: .5
      },
      uValueC: {
        value: .5
      },
      uValueD: {
        value: 9
      }
    }
  })

  const shaderMaterial3 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader3,
    transparent: true,
    depthWrite: true,
    clipShadows: true,
    wireframe: false,
    side: THREE.DoubleSide,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(10, 5)
      },
      uTime: {
        value: 0
      },
      uValueA: {
        value: .5
      },
      uValueB: {
        value: .5
      },
      uValueC: {
        value: .5
      },
      uValueD: {
        value: 9
      }
    }
  })

  const shaderMaterial4 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader4,
    transparent: true,
    depthWrite: true,
    clipShadows: true,
    wireframe: false,
    side: THREE.DoubleSide,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(10, 5)
      },
      uTime: {
        value: 0
      },
      uValueA: {
        value: .5
      },
      uValueB: {
        value: .5
      },
      uValueC: {
        value: .5
      },
      uValueD: {
        value: 9
      }
    }
  })

  const shaderMaterial5 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader5,
    transparent: true,
    depthWrite: true,
    clipShadows: true,
    wireframe: false,
    side: THREE.DoubleSide,
    uniforms: {
      uFrequency: {
        value: new THREE.Vector2(10, 5)
      },
      uTime: {
        value: 0
      },
      uValueA: {
        value: .5
      },
      uValueB: {
        value: .5
      },
      uValueC: {
        value: .5
      },
      uValueD: {
        value: 9
      }
    }
  })



let sceneGroup, church, windowS, windowS1, windowS2, windowS3, windowS4, windowS5, windowsArr

let coverArr = []
gtlfLoader.load(
  'church3.glb',
  (gltf) => {
    gltf.scene.scale.set(0.5,0.5,0.5)
    sceneGroup = gltf.scene
    sceneGroup.needsUpdate = true
    sceneGroup.position.y -= 1
    sceneGroup.position.z -= .5
    scene.add(sceneGroup)
    console.log(sceneGroup)


    church = gltf.scene.children.find((child) => {
      return child.name === 'church'
    })

    windowS = gltf.scene.children.find((child) => {
      return child.name === 'window'
    })

    windowS1 = gltf.scene.children.find((child) => {
      return child.name === 'window001'
    })

    windowS2 = gltf.scene.children.find((child) => {
      return child.name === 'window002'
    })

    windowS3 = gltf.scene.children.find((child) => {
      return child.name === 'window003'
    })

    windowS4 = gltf.scene.children.find((child) => {
      return child.name === 'window004'
    })

    windowS5 = gltf.scene.children.find((child) => {
      return child.name === 'window005'
    })

    // frame = gltf.scene.children.find((child) => {
    //   return child.name === 'frame'
    // })
    //
    // frame.material = new THREE.MeshBasicMaterial({color: 'silver'})




    church.material = churchMaterial

    windowS.material = shaderMaterial

    windowS1.material = shaderMaterial1

    windowS2.material = shaderMaterial2

    windowS3.material = shaderMaterial3

    windowS4.material = shaderMaterial4

    windowS5.material = shaderMaterial5


    windowsArr = [windowS, windowS1, windowS2, windowS3, windowS4, windowS5]


  }
)



//Lights
const directionalLight = new THREE.DirectionalLight('#ffffff')
directionalLight.position.set(1,1,0)
scene.add(directionalLight)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

 // group

 const cameraGroup = new THREE.Group()
 scene.add(cameraGroup)
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI / 2 - 0.1
//controls.enableZoom = false;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Cursor

const cursor = {}

cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
  cursor.x =event.clientX / sizes.width -.5
  cursor.y =event.clientY / sizes.height -.5



})

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

renderer.domElement.addEventListener( 'pointerdown', onClick, false )


function onClick() {
  event.preventDefault()

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1
  raycaster.setFromCamera( mouse, camera )

  var intersects = raycaster.intersectObjects( windowsArr, true )

  if ( intersects.length > 0 ) {


    intersects[0].object.material.uniforms.uValueA.value = Math.random() +.1
    intersects[0].object.material.uniforms.uValueB.value = Math.random() + .1
    intersects[0].object.material.uniforms.uValueC.value = Math.random() + .1
    intersects[0].object.material.uniforms.uValueD.value = Math.floor((Math.random() * 20))
  }


}

const color = 0xFF0000;
  const density = 0.01;
  scene.fog = new THREE.FogExp2(color, density, .1);

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime  = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    controls.update()

    shaderMaterial.uniforms.uTime.value = elapsedTime
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
