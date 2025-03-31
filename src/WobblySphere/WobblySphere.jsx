import { useRef } from 'react'
import * as THREE from 'three'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { useFrame } from '@react-three/fiber'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

import { useControls } from 'leva'

const uniforms = {
    uTime: new THREE.Uniform(0),
    uPositionFrequency: new THREE.Uniform(0.5),
    uTimeFrequency: new THREE.Uniform(0.4),
    uStrength: new THREE.Uniform(0.3),

    uWarpedPositionFrequency: new THREE.Uniform(0.38),
    uWarpedTimeFrequency: new THREE.Uniform(0.12),
    uWarpedStrength: new THREE.Uniform(1.7),

    uColorA: new THREE.Uniform(new THREE.Color('#0000ff')),
    uColorB: new THREE.Uniform(new THREE.Color('#ff0000'))
}

const material = new CustomShaderMaterial({
    // CSM
    baseMaterial: THREE.MeshPhysicalMaterial,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,

    // Mesh Physical Material
    metalness: 0,
    roughness: 0,
    color: '#ffffff',
    transmission: 0,
    ior: 1.5,
    thickness: 1.5,
    transparent: true,
    wireframe: true
})

const depthMaterial = new CustomShaderMaterial({
    // CSM
    baseMaterial: THREE.MeshDepthMaterial,
    vertexShader: vertexShader,
    uniforms: uniforms,

    // Mesh Physical Material
    depthPacking: THREE.RGBADepthPacking
})

let geometry = new THREE.IcosahedronGeometry(4, 50)
geometry = mergeVertices(geometry)
geometry.computeTangents()

export default function WobblySphere() {

    const { positionFrequency, timeFrequency, strength, warpedPositionFrequency, warpedTimeFrequency, warpedStrength } = useControls('Wobble', {
        positionFrequency: {
            value: 0.5,
            min: 0,
            max: 2,
            step: 0.001,
        },
        timeFrequency: {
            value: 0.4,
            min: 0,
            max: 2,
            step: 0.001,
        },
        strength: {
            value: 0.1,
            min: 0,
            max: 2,
            step: 0.001,
        },
        warpedPositionFrequency: {
            value: 1.85,
            min: 0,
            max: 2,
            step: 0.001,
        },
        warpedTimeFrequency: {
            value: 0.5,
            min: 0,
            max: 2,
            step: 0.001,
        },
        warpedStrength: {
            value: 2.0,
            min: 0,
            max: 2,
            step: 0.001,
        }

    })

    const { colorA, colorB } = useControls("Wobble", {
        colorA: "#00a348",
        colorB: "#00cfff"
    })

    uniforms.uPositionFrequency.value = positionFrequency
    uniforms.uTimeFrequency.value = timeFrequency
    uniforms.uStrength.value = strength

    uniforms.uWarpedPositionFrequency.value = warpedPositionFrequency
    uniforms.uWarpedTimeFrequency.value = warpedPositionFrequency
    uniforms.uWarpedStrength.value = warpedStrength

    uniforms.uColorA.value.set(colorA)
    uniforms.uColorB.value.set(colorB)


    const mesh = useRef()

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()

        uniforms.uTime.value = time * 0.05
        mesh.current.rotation.y += delta * 0.02

    })

    return <>
        <mesh ref={mesh} geometry={geometry} material={material} customDepthMaterial={depthMaterial} castShadow />
    </>
}