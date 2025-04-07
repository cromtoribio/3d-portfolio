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

const planetUniforms = {
    uTime: new THREE.Uniform(0),
    uPositionFrequency: new THREE.Uniform(0.36),
    uTimeFrequency: new THREE.Uniform(0.46),
    uStrength: new THREE.Uniform(0.26),

    uWarpedPositionFrequency: new THREE.Uniform(0.48),
    uWarpedTimeFrequency: new THREE.Uniform(0.37),
    uWarpedStrength: new THREE.Uniform(0.4),

    uColorA: new THREE.Uniform(new THREE.Color('#000000')),
    uColorB: new THREE.Uniform(new THREE.Color('#25c43a'))
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

const planetMaterial = new CustomShaderMaterial({
    // CSM
    baseMaterial: THREE.MeshPhysicalMaterial,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: planetUniforms,

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

let geometry = new THREE.IcosahedronGeometry(4.5, 64)
geometry = mergeVertices(geometry)
geometry.computeTangents()

export default function WobblySphere() {

    const { positionFrequency, timeFrequency, strength, warpedPositionFrequency, warpedTimeFrequency, warpedStrength } = useControls('Wobble', {
        positionFrequency: {
            value: 0.44,
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
            value: 0.75,
            min: 0,
            max: 2,
            step: 0.001,
        },
        warpedPositionFrequency: {
            value: 0.55,
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
            value: 1.1,
            min: 0,
            max: 2,
            step: 0.001,
        }
    })

    const { colorA, colorB } = useControls("Wobble", {
        colorA: "#ffffff",
        colorB: "#00c6ff"
    })

    uniforms.uPositionFrequency.value = positionFrequency
    uniforms.uTimeFrequency.value = timeFrequency
    uniforms.uStrength.value = strength

    uniforms.uWarpedPositionFrequency.value = warpedPositionFrequency
    uniforms.uWarpedTimeFrequency.value = warpedPositionFrequency
    uniforms.uWarpedStrength.value = warpedStrength

    uniforms.uColorA.value.set(colorA)
    uniforms.uColorB.value.set(colorB)

    const { planetColorA, planetColorB } = useControls("Wobble Planet", {
        planetColorA: "#fff8c7",
        planetColorB: "#ffffff"
    })

    planetUniforms.uColorA.value.set(planetColorA)
    planetUniforms.uColorB.value.set(planetColorB)

    const mesh = useRef()
    const smallMesh = useRef()
    const medMesh = useRef()

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime()

        uniforms.uTime.value = time * 0.2
        mesh.current.rotation.y += delta * 0.05
        smallMesh.current.rotation.y += delta * 0.5
        // medMesh.current.rotation.y += delta * 0.8

        const smallAngle = time * 0.3
        smallMesh.current.position.x = Math.sin(smallAngle) * 5
        smallMesh.current.position.z = Math.cos(smallAngle) * 5
        smallMesh.current.position.y = Math.sin(smallAngle) * 5

        const medAngle = time * 0.25
        medMesh.current.position.x = Math.sin(medAngle) * 5
        medMesh.current.position.z = Math.cos(medAngle) * 5
        medMesh.current.position.y = Math.sin(medAngle) * 3
    })

    return <>
        <mesh
            ref={mesh}
            position={[0, -0.75, 0]}
            geometry={geometry}
            material={material}
            customDepthMaterial={depthMaterial}
        />

        <mesh
            scale={0.07}
            ref={smallMesh}
            geometry={geometry}
            material={planetMaterial}
            customDepthMaterial={depthMaterial}
        />

        <mesh
            scale={0.03}
            ref={medMesh}
            geometry={geometry}
            material={planetMaterial}
            customDepthMaterial={depthMaterial}
        />

        {/* <mesh
            scale={0.08}
            position={[- 4.5, 4.5, 0]}
            ref={medMesh}
            geometry={geometry}
            material={planetMaterial}
            customDepthMaterial={depthMaterial}
            wireframe
        /> */}
    </>
}